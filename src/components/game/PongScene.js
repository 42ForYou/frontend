import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useGame } from "../../context/GameContext";

const PongScene = () => {
  const { trackBall, trackPaddle } = useGame();
  const mountRef = useRef(null);
  const sceneRef = useRef(null); // Three.js 씬을 저장하기 위한 ref
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    sceneRef.current = new THREE.Scene();
    const scene = sceneRef.current;
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 3, 2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0xbbffff);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const onResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", onResize, false);

    const planeGeometry = new THREE.BoxGeometry(5, 3, 0.2);
    const planeMaterial = new THREE.MeshPhysicalMaterial({
      transmission: 1,
      thickness: 5,
      // roughness: 0,
      // envMap: 3,
      // envMapIntensity: 3,
      // clearcoat: 1,
      // clearcoatRoughness: 0.1,
      color: 0x00ff00,
    });

    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);

    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 0, 10);
    scene.add(light);

    const paddleGeometry = new THREE.BoxGeometry(0.3, 0.1, 0.5);
    const paddleMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

    const paddleA = new THREE.Mesh(paddleGeometry, paddleMaterial);
    paddleA.position.set(-2, 0.15, 0);
    paddleA.name = "paddle_a";
    scene.add(paddleA);

    const paddleB = new THREE.Mesh(paddleGeometry, paddleMaterial);
    paddleB.position.set(2, 0.15, 0);
    paddleB.name = "paddle_b";
    scene.add(paddleB);

    const ballGeometry = new THREE.SphereGeometry(0.15, 32, 32);
    const ballMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const ball = new THREE.Mesh(ballGeometry, ballMaterial);
    ball.position.set(0, 0.15, 0);
    ball.name = "ball";
    scene.add(ball);

    const loader = new THREE.TextureLoader();
    loader.load(`${process.env.ASSETS_URL}/images/navbar2.png`, (texture) => {
      scene.background = texture;
    });

    let lastTime = 0;
    const animate = (time) => {
      requestAnimationFrame(animate);
      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;

      // 여기에 애니메이션 관련 업데이트 로직 추가
      updateBallPosition(deltaTime);
      updatePaddlePosition();

      renderer.render(scene, camera);
    };

    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", onResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  // 공의 위치를 업데이트하는 함수
  const updateBallPosition = (deltaTime) => {
    if (!trackBall || trackBall.segments.length === 0) return;

    const ball = sceneRef.current.getObjectByName("ball");
    const segment = trackBall.segments[currentSegmentIndex];

    const progress = deltaTime * segment.dx;
    const x = ball.position.x + progress;
    const y = segment.y_s + segment.dy * (Date.now() / 1000 - trackBall.t_event);

    // 공의 위치를 업데이트
    ball.position.set(x, 0.15, y);

    // 공이 세그먼트의 끝에 도달했는지 확인
    if ((segment.dx > 0 && x >= segment.x_e) || (segment.dx < 0 && x <= segment.x_e)) {
      setCurrentSegmentIndex((prevIndex) => (prevIndex + 1) % trackBall.segments.length);
      setCurrentTime(0); // 시간 초기화
    } else {
      setCurrentTime(currentTime + deltaTime);
    }
  };

  // 패들의 위치를 업데이트하는 함수
  const updatePaddlePosition = () => {
    if (trackPaddle) {
      const paddle = sceneRef.current.getObjectByName(trackPaddle.player === "A" ? "paddle_a" : "paddle_b");
      const targetY = trackPaddle.y;
      paddle.position.y += (targetY - paddle.position.y) * 0.05; // 보간 속도 조절
    }
  };

  return <div ref={mountRef} className="flex-grow-1" style={{ width: "100%", height: "100%", overflow: "hidden" }} />;
};

export default PongScene;
