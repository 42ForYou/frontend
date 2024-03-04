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
const PongScene = () => {
  const { ballTrajectory, trajectoryVersion, subgameConfig } = useGame();
  const mountRef = useRef(null);
  const ballRef = useRef();
  const [scene, setScene] = useState(null);
  const [camera, setCamera] = useState(null);
  const [renderer, setRenderer] = useState(null);
  const lastTimeRef = useRef(0);
  const currentSegmentIndexRef = useRef(0);

  const updateBallPosition = (ballTrajectory) => {
    // console.log("ballTrajectory: ", ballTrajectory);
    // console.log("version: ", trajectoryVersion);

    if (trajectoryVersion > 3) return;
    if (!ballTrajectory || ballTrajectory.segments.length === 0) return;

    const ball = ballRef.current;
    const currentSegmentIndex = currentSegmentIndexRef.current;
    const segment = ballTrajectory.segments[currentSegmentIndex];

    const elapsedTime = Date.now() / 1000 - ballTrajectory.t_event;
    const segmentTime = elapsedTime - (segment.t_start || 0);

    const x = segment.x_s + segment.dx * segmentTime;
    const y = segment.y_s + segment.dy * segmentTime;

    ball.position.set(x, 0.3, y);
    // console.log("ball.position: ", ball.position);

    // 공이 세그먼트의 끝에 도달했는지 확인하고, 필요한 경우 인덱스 업데이트
    if ((segment.dx > 0 && x >= segment.x_e) || (segment.dx < 0 && x <= segment.x_e)) {
      currentSegmentIndexRef.current = (currentSegmentIndex + 1) % ballTrajectory.segments.length;
    }
  };

  // 렌더러, 카메라, 씬 생성
  // todo: 카메라의 좌표를 필드의 크기에 따라 설정
  useEffect(() => {
    const newScene = new THREE.Scene();
    setScene(newScene);

    const newCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    newCamera.position.set(0, 400, 500);
    newCamera.up.set(0, 1, 0);
    newCamera.lookAt(new THREE.Vector3(0, 0, 0));
    setCamera(newCamera);

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
  }, []);

  // 오브젝트 추가
  useEffect(() => {
    if (scene && renderer && camera && subgameConfig) {
      const fieldWidth = subgameConfig.x_max - subgameConfig.x_min;
      const fieldHeight = subgameConfig.y_max - subgameConfig.y_min;
      const fieldGeometry = new THREE.BoxGeometry(fieldWidth, 0.2, fieldHeight);
      const fieldMaterial = new THREE.MeshPhysicalMaterial({
        transmission: 1,
        thickness: 5,
        color: 0x00ff00,
      });

      const field = new THREE.Mesh(fieldGeometry, fieldMaterial);
      field.position.set(0, 0, 0);
      scene.add(field);

      const light = new THREE.PointLight(0xffffff, 1, 100);
      light.position.set(0, 0, 10);
      scene.add(light);

      const paddleGeometry = new THREE.BoxGeometry(subgameConfig.len_paddle, 0.1, 0.5);
      const paddleMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      const paddleA = new THREE.Mesh(paddleGeometry, paddleMaterial);
      paddleA.position.set(-2, subgameConfig.y_init_paddle, 0);
      scene.add(paddleA);
      const paddleB = new THREE.Mesh(paddleGeometry, paddleMaterial);
      paddleB.position.set(2, subgameConfig.y_init_paddle, 0);
      scene.add(paddleB);

      const ballGeometry = new THREE.SphereGeometry(0.15, 32, 32);
      const ballMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
      const ball = new THREE.Mesh(ballGeometry, ballMaterial);
      ball.position.set(subgameConfig.x_init_ball, 0.15, subgameConfig.y_init_ball);
      scene.add(ball);
      ballRef.current = ball;
    }
  }, [scene, renderer, camera, subgameConfig]);

  // 애니메이션
  useEffect(() => {
    if (scene && renderer && camera && ballRef.current && ballTrajectory.current) {
      const animate = (time) => {
        if (!lastTimeRef.current) {
          lastTimeRef.current = time;
        }

        const deltaTime = (time - lastTimeRef.current) / 1000; // 시간 차이 계산
        lastTimeRef.current = time; // 현재 시간을 lastTime으로 업데이트

        // updateBallPosition(deltaTime, ballTrajectory.current);
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    }
  }, [trajectoryVersion, scene, renderer, camera]);

  return <div ref={mountRef} className="flex-grow-1" style={{ width: "100%", height: "100%", overflow: "hidden" }} />;
};

export default PongScene;
