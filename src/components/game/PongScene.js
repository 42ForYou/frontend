import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useGame } from "../../context/GameContext";

/*
데이터 예시

const config = {
  delay_rank_end: 5,
  delay_rank_start: 5,
  delay_subgame_start: 3,
  len_paddle: 50,
  match_point: 3,
  player_a_init_point: 0,
  player_b_init_point: 0,
  time_limit: 30,
  v_ball: 200,
  v_paddle: 100,
  x_init_ball: 0,
  x_max: 400,
  x_min: -400,
  y_init_ball: 0,
  y_init_paddle: 100,
  y_max: 300,
  y_min: -300
};



*/

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
  const [camera, setCamera] = useState(null);
  const [renderer, setRenderer] = useState(null);
  const currentSegmentIndexRef = useRef(0);

  const updateBallPosition = (ballTrajectory) => {
    if (!ballTrajectory || ballTrajectory.segments.length === 0) return;

    const ball = ballRef.current;
    let currentSegmentIndex = currentSegmentIndexRef.current;

    if (currentSegmentIndex >= ballTrajectory.segments.length) {
      // 모든 세그먼트를 처리했으면 더 이상 업데이트하지 않음
      return;
    }

    let segment = ballTrajectory.segments[currentSegmentIndex];
    const eventElapsedTime = Date.now() / 1000 - ballTrajectory.t_event; // 이벤트 발생 후 경과시간
    let segmentElapsedTime = eventElapsedTime - segment.t_start; // 해당 세그먼트 내에서 경과한 시간

    // 세그먼트 지속 시간을 초과한 경우 다음 세그먼트로 이동
    while (segmentElapsedTime > segment.duration && currentSegmentIndex < ballTrajectory.segments.length) {
      segmentElapsedTime -= segment.duration;
      currentSegmentIndex++;

      // 모든 세그먼트를 처리한 경우 루프 종료
      if (currentSegmentIndex >= ballTrajectory.segments.length) {
        break;
      }

      segment = ballTrajectory.segments[currentSegmentIndex];
      // 다음 세그먼트의 시작 시간을 빼는 것은 불필요함
    }

    currentSegmentIndexRef.current = currentSegmentIndex;

    if (currentSegmentIndex < ballTrajectory.segments.length) {
      const newX = segment.x_s + segment.dx * segmentElapsedTime;
      const newY = segment.y_s + segment.dy * segmentElapsedTime;
      ball.position.set(newX, ball.position.y, newY);
      console.log(newX, newY);
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
      const fieldDepth = 10;
      const fieldGeometry = new THREE.BoxGeometry(fieldWidth, fieldDepth, fieldHeight);
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

      const ballRadius = 30;
      const ballGeometry = new THREE.SphereGeometry(ballRadius, 32, 32);
      const ballMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
      const ball = new THREE.Mesh(ballGeometry, ballMaterial);
      ball.position.set(subgameConfig.x_init_ball, ballRadius, subgameConfig.y_init_ball);
      scene.add(ball);
      ballRef.current = ball;
    }
  }, [scene, renderer, camera, subgameConfig]);

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

  return <div ref={mountRef} className="flex-grow-1" style={{ width: "100%", height: "100%", overflow: "hidden" }} />;
};

export default PongScene;
