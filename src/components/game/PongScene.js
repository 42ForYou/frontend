import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useGame } from "../../context/GameContext";

/*
- 오른손 좌표계 사용 (y축이 위로 향하고, z축은 화면 밖으로 나옴)
- 필드의 중심 (0, 0, 0)
- 필드의 크기: x_min, x_max, y_min, y_max
- 패들의 길이: len_paddle
- 공의 초기 위치: x_init_ball, y_init_ball
- 패들의 초기 위치: y_init_paddle
- 공의 속도: v_ball
*/
// todo: 헷갈리므로 전체를 group으로 묶어서 위가 z축이 되도록 회전시키기
const PongScene = () => {
  const { ballTrajectory, trajectoryVersion, subgameConfig } = useGame();
  const mountRef = useRef(null);
  const ballRef = useRef();
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
    const eventElapsedTime = Date.now() / 1000 - ballTrajectory.t_event;
    const segmentElapsedTime = eventElapsedTime - segment.t_start;

    // 세그먼트 내에서의 위치 비율 계산
    let progress = segmentElapsedTime / segment.duration;

    if (progress > 1) {
      progress = 1;
      currentSegmentIndexRef.current = (currentSegmentIndex + 1) % ballTrajectory.segments.length;
    }

    const newX = segment.x_s + (segment.x_e - segment.x_s) * progress;
    const newY = segment.y_s + (segment.y_e - segment.y_s) * progress;

    ball.position.set(newX, newY, ball.position.z);
  };

  // 장면, 루트 그룹, 렌더러, 카메라 생성
  // todo: 카메라의 좌표를 필드의 크기에 따라 설정
  useEffect(() => {
    if (!subgameConfig) return;

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
    newCamera.position.set(0, 300, 500);
    newCamera.up.set(0, 0, 1); // 카메라의 업벡터를 z축으로 설정
    newCamera.lookAt(new THREE.Vector3(0, 0, 0));
    setCamera(newCamera);
    newRoot.add(newCamera);

    const newRenderer = new THREE.WebGLRenderer({ antialias: true });
    newRenderer.setClearColor(0xbbffff);
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
      mountRef.current.removeChild(newRenderer.domElement);
    };
  }, [subgameConfig]);

  // 오브젝트 추가 (필드, 라이트, 패들, 공)
  useEffect(() => {
    if (root && renderer && camera && subgameConfig) {
      const { x_max, x_min, y_max, y_min, x_init_ball, y_init_ball, y_init_paddle, len_paddle } = subgameConfig;

      // 라이트
      const light = new THREE.PointLight(0xffffff, 1, 100);
      light.position.set(0, 0, 0);
      root.add(light);

      // 필드
      const fieldWidth = x_max - x_min;
      const fieldHeight = y_max - y_min;
      const fieldDepth = 10;
      const fieldMargin = 100; // 필드의 가장자리에 있는 여유 공간 (프론트엔드에서만 존재)
      const fieldGeometry = new THREE.BoxGeometry(fieldWidth, fieldHeight, fieldDepth);
      const marginedFieldGeometry = new THREE.BoxGeometry(
        fieldWidth + 2 * fieldMargin,
        fieldHeight + 2 * fieldMargin,
        fieldDepth
      );
      const fieldMaterial = new THREE.MeshPhysicalMaterial({
        transmission: 1,
        thickness: 5,
        color: 0x00ff00,
      });
      const marginedFieldMaterial = new THREE.MeshPhysicalMaterial({
        transmission: 1,
        thickness: 5,
        color: 0xffff00,
      });
      const field = new THREE.Mesh(fieldGeometry, fieldMaterial);
      const marginedField = new THREE.Mesh(marginedFieldGeometry, marginedFieldMaterial);
      field.position.set(0, 0, -fieldDepth / 2); // 필드의 바닥이 z=0이 되도록 설정
      marginedField.position.set(0, 0, -fieldDepth); // 필드의 바닥이 z=0이 되도록 설정
      root.add(field);
      root.add(marginedField);

      // 패들
      const paddleWidth = fieldMargin / 3;
      const paddleHeight = len_paddle;
      const paddleDepth = 10;
      const paddleGeometry = new THREE.BoxGeometry(paddleWidth, paddleHeight, paddleDepth);
      const paddleMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      const paddleA = new THREE.Mesh(paddleGeometry, paddleMaterial);
      const paddleB = new THREE.Mesh(paddleGeometry, paddleMaterial);
      paddleA.position.set(x_min - paddleWidth / 2, y_init_paddle, paddleDepth / 2);
      paddleB.position.set(x_max + paddleWidth / 2, y_init_paddle, paddleDepth / 2);
      root.add(paddleA);
      root.add(paddleB);

      // 공
      const ballRadius = 15;
      const ballGeometry = new THREE.SphereGeometry(ballRadius, 32, 32);
      const ballMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
      const ball = new THREE.Mesh(ballGeometry, ballMaterial);
      ball.position.set(x_init_ball, y_init_ball, ballRadius);
      root.add(ball);
      ballRef.current = ball;
    }
  }, [root, renderer, camera, subgameConfig]);

  // 애니메이션
  useEffect(() => {
    if (scene && renderer && camera && ballRef.current && ballTrajectory.current) {
      const animate = () => {
        updateBallPosition(ballTrajectory.current);
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    }
  }, [trajectoryVersion, scene, renderer, camera]);

  useEffect(() => {
    currentSegmentIndexRef.current = 0;
  }, [trajectoryVersion]);

  return <div ref={mountRef} className="flex-grow-1" style={{ width: "100%", height: "100%", overflow: "hidden" }} />;
};

export default PongScene;
