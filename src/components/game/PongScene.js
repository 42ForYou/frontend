import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useGame } from "../../context/GameContext";

const PongScene = () => {
  const { trackBall, trackPaddle } = useGame();
  const mountRef = useRef(null);
  const sceneRef = useRef(null); // Three.js 씬을 저장하기 위한 ref
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);

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

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("resize", onResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    if (!trackBall) return;
    const ball = sceneRef.current.getObjectByName("ball");
    if (ball && trackBall && trackBall.segments.length > 0) {
      let segment = trackBall.segments[currentSegmentIndex];
      const segmentTime = trackBall.t_end - trackBall.t_event;
      const elapsedTime = (Date.now() / 1000 - trackBall.t_event) % segmentTime;
      let progress = elapsedTime / segmentTime;
      if (progress > 1) {
        progress = 1;
        setCurrentSegmentIndex((prevIndex) => (prevIndex + 1) % trackBall.segments.length);
        segment = trackBall.segments[currentSegmentIndex];
      }
      const x = segment.x_s + (segment.x_e - segment.x_s) * progress;
      const y = segment.y_s + (segment.y_e - segment.y_s) * progress;
      ball.position.set(x, 0.15, y);
    }
  }, [trackBall, currentSegmentIndex]);

  useEffect(() => {
    if (!trackPaddle) return;
    const paddleName = trackPaddle.player === "A" ? "paddle_a" : "paddle_b";
    const paddle = sceneRef.current.getObjectByName(paddleName);
    if (paddle && trackPaddle) {
      const targetY = trackPaddle.y;
      const currentY = paddle.position.y;
      paddle.position.y += (targetY - currentY) * 0.1;
    }
  }, [trackPaddle]);

  return <div ref={mountRef} className="flex-grow-1" style={{ width: "100%", height: "100%", overflow: "hidden" }} />;
};

export default PongScene;
