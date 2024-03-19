import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useGame } from "../../context/GameContext";

const PongScene = () => {
  const { tournamentConfig, ballTrajectory, paddleATrajectory, paddleBTrajectory, ballTrajectoryVersion } = useGame();
  const mountRef = useRef(null);
  const ballRef = useRef();
  const paddleARef = useRef();
  const paddleBRef = useRef();
  const [scene, setScene] = useState(null);
  const [root, setRoot] = useState(null);
  const [camera, setCamera] = useState(null);
  const [renderer, setRenderer] = useState(null);
  const currentSegmentIndexRef = useRef(0);

  const updateBallPosition = (ballTrajectory) => {
    if (!ballTrajectory || ballTrajectory.segments.length === 0) return;

    const ball = ballRef.current;
    const currentSegmentIndex = currentSegmentIndexRef.current;
    if (currentSegmentIndex >= ballTrajectory.segments.length) return;
    const segment = ballTrajectory.segments[currentSegmentIndex];

    const currentTime = Date.now() / 1000;
    const eventElapsedTime = currentTime - ballTrajectory.t_event;
    const segmentElapsedTime = eventElapsedTime - segment.t_start;

    // 세그먼트 내에서의 위치 비율 계산
    let progress = segmentElapsedTime / segment.duration;

    if (progress > 1) {
      progress = 1;
      currentSegmentIndexRef.current = currentSegmentIndex + 1;
    }

    const newX = segment.x_s + (segment.x_e - segment.x_s) * progress;
    const newY = segment.y_s + (segment.y_e - segment.y_s) * progress;
    ball.position.set(newX, newY, ball.position.z);
  };

  const updatePaddlePosition = (paddleTrajectory, paddleRef) => {
    if (!paddleTrajectory || !paddleRef.current) return;

    const paddle = paddleRef.current;

    const elapsedTime = Date.now() / 1000 - paddleTrajectory.t_event;
    let newY = paddleTrajectory.y + paddleTrajectory.dy * elapsedTime;

    if (paddleTrajectory.dy > 0) {
      newY = Math.min(newY, tournamentConfig.y_max - tournamentConfig.len_paddle / 2);
    } else {
      newY = Math.max(newY, tournamentConfig.y_min + tournamentConfig.len_paddle / 2);
    }

    if (paddle.position.y !== newY) {
      paddle.position.set(paddle.position.x, newY, paddle.position.z);
    }
  };

  // 장면, 루트 그룹, 렌더러, 카메라 생성
  // todo: 카메라의 좌표를 필드의 크기에 따라 설정
  useEffect(() => {
    if (!tournamentConfig) return;

    // 장면 생성
    const newScene = new THREE.Scene();
    const newRoot = new THREE.Group();
    setScene(newScene);

    // 루트 그룹 생성
    setRoot(newRoot);
    newRoot.rotation.x = -Math.PI / 2; // z축이 위를, y축이 안쪽을 향하도록 회전
    newScene.add(newRoot);

    // 카메라 생성
    const newCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    newCamera.position.set(0, -200, 500);
    newCamera.up.set(0, 0, 1); // 카메라의 업벡터를 z축으로 설정
    newCamera.lookAt(new THREE.Vector3(0, 0, 0));
    setCamera(newCamera);
    newRoot.add(newCamera);

    const newRenderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    newRenderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(newRenderer.domElement);
    setRenderer(newRenderer);

    const onResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      newRenderer.setSize(width, height);
      newCamera.aspect = width / height;
      newCamera.updateProjectionMatrix();
    };

    window.addEventListener("resize", onResize, false);

    return () => {
      window.removeEventListener("resize", onResize);
      // todo: 임시해결
      if (mountRef.current && mountRef.current.contains(newRenderer.domElement)) {
        mountRef.current.removeChild(newRenderer.domElement);
      }
    };
  }, [tournamentConfig]);

  useEffect(() => {
    if (root && renderer && camera && tournamentConfig) {
      const { x_max, x_min, y_max, y_min, x_init_ball, y_init_ball, y_init_paddle, len_paddle } = tournamentConfig;

      // 라이트
      const ambientLight = new THREE.AmbientLight(0x404040); // 약한 환경광
      const pointLight = new THREE.PointLight(0xff0000, 1, 1000); // 밝은 점광원
      pointLight.position.set(10, 10, 10);
      root.add(ambientLight);
      root.add(pointLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      // directionalLight.position.set(0, 0, 0);
      scene.add(directionalLight);

      const pointLightHelper = new THREE.PointLightHelper(pointLight);
      scene.add(pointLightHelper);

      // 프론트 임의 변수값
      const fieldMargin = 100; // 필드의 가장자리에 있는 여유 공간 (프론트엔드에서만 존재)
      const paddleWidth = fieldMargin / 3;
      const ballRadius = 20;

      // 필드
      // field: 필드의 가장자리에 여유 공간을 두지 않은 버전 (디버깅용)
      // marginedField: 필드의 가장자리에 여유 공간을 둔 버전
      const fieldWidth = x_max - x_min;
      const fieldHeight = y_max - y_min;
      const fieldDepth = 100;
      // const fieldGeometry = new THREE.BoxGeometry(fieldWidth, fieldHeight, fieldDepth);
      // const fieldMaterial = new THREE.MeshPhongMaterial({
      //   color: 0x00ff00,
      //   emissive: 0x072534,
      //   specular: 0x555555,
      //   shininess: 30,
      // });
      // const field = new THREE.Mesh(fieldGeometry, fieldMaterial);
      // field.position.set(0, 0, -fieldDepth); // 필드의 바닥이 z=0이 되도록 설정
      // root.add(field);
      const marginedFieldGeometry = new THREE.BoxGeometry(
        fieldWidth + (fieldMargin + paddleWidth) * 2,
        fieldHeight + ballRadius * 4,
        fieldDepth
      );
      const marginedFieldMaterial = new THREE.MeshPhongMaterial({
        color: 0x00ffff,
        emissive: 0x072534,
        specular: 0x555555,
        shininess: 30,
      });
      const marginedField = new THREE.Mesh(marginedFieldGeometry, marginedFieldMaterial);
      marginedField.position.set(0, 0, -fieldDepth); // 필드의 바닥이 z=0이 되도록 설정
      root.add(marginedField);

      // 패들
      const paddleHeight = len_paddle;
      const paddleDepth = 20;
      const paddleGeometry = new THREE.BoxGeometry(paddleWidth, paddleHeight, paddleDepth);
      const paddleMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        emissive: 0x777777,
        specular: 0x555555,
        shininess: 30,
      });
      const paddleA = new THREE.Mesh(paddleGeometry, paddleMaterial);
      const paddleB = new THREE.Mesh(paddleGeometry, paddleMaterial);
      paddleA.position.set(x_min - paddleWidth / 2 - ballRadius, y_init_paddle, paddleDepth / 2);
      paddleB.position.set(x_max + paddleWidth / 2 + ballRadius, y_init_paddle, paddleDepth / 2);
      root.add(paddleA);
      root.add(paddleB);
      paddleARef.current = paddleA;
      paddleBRef.current = paddleB;

      // 공
      const ballGeometry = new THREE.SphereGeometry(ballRadius, 32, 32);
      const ballMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        emissive: 0x072534,
        specular: 0x555555,
        shininess: 30,
      });
      const ball = new THREE.Mesh(ballGeometry, ballMaterial);
      ball.position.set(x_init_ball, y_init_ball, ballRadius);
      root.add(ball);
      ballRef.current = ball;
    }
  }, [root, renderer, camera, tournamentConfig]);

  // 애니메이션
  useEffect(() => {
    // for test
    // if (scene && renderer && camera && ballRef.current && ballTrajectory.current) {
    if (scene && renderer && camera) {
      const animate = () => {
        updateBallPosition(ballTrajectory.current);
        updatePaddlePosition(paddleATrajectory.current, paddleARef);
        updatePaddlePosition(paddleBTrajectory.current, paddleBRef);
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    }
  }, [ballTrajectoryVersion, scene, renderer, camera]);

  useEffect(() => {
    currentSegmentIndexRef.current = 0;
  }, [ballTrajectoryVersion]);

  return <div ref={mountRef} style={{ width: "100%", height: "100%", overflow: "hidden" }} />;
};

export default PongScene;
