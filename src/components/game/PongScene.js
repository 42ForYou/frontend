import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const PongScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 3, 3);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000); // 배경색 설정
    mountRef.current.appendChild(renderer.domElement);

    // 렌더러 크기 설정 및 resize 이벤트 리스너 추가 함수
    const onResize = () => {
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    onResize();

    // 게임 판 생성
    const planeGeometry = new THREE.BoxGeometry(5, 3, 0.2);
    const planeMaterial = new THREE.MeshPhysicalMaterial({
      transmission: 1,
      thickness: 5,
      roughness: 0,
      envMap: 3,
      envMapIntensity: 3,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    });

    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2; // X축을 기준으로 회전하여 수평 배치
    scene.add(plane);

    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 0, 10);
    scene.add(light);

    // 패들 생성
    const paddleGeometry = new THREE.BoxGeometry(0.3, 0.1, 0.5);
    const paddleMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    // 플레이어 패들
    const playerPaddle = new THREE.Mesh(paddleGeometry, paddleMaterial);
    playerPaddle.position.set(-2, 0.15, 0);
    scene.add(playerPaddle);

    // 컴퓨터 패들
    const computerPaddle = new THREE.Mesh(paddleGeometry, paddleMaterial);
    computerPaddle.position.set(2, 0.15, 0);
    scene.add(computerPaddle);

    // 공 생성
    const ballGeometry = new THREE.SphereGeometry(0.15, 32, 32);
    const ballMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const ball = new THREE.Mesh(ballGeometry, ballMaterial);
    ball.position.set(0, 0.15, 0);
    scene.add(ball);

    const loader = new THREE.TextureLoader();
    loader.load(`${process.env.ASSETS_URL}/stars-background.png`, (texture) => {
      scene.background = texture;
    });

    const animate = () => {
      requestAnimationFrame(animate);
      // 여기에 애니메이션 업데이트 로직 추가
      renderer.render(scene, camera);
    };

    animate();

    // 컴포넌트 언마운트 시 리소스 정리
    return () => {
      mountRef.current.removeChild(renderer.domElement); // DOM에서 렌더러 제거
      // 필요한 경우 추가 리소스 정리 작업 수행
    };
  }, []);

  return <div ref={mountRef} className="flex-grow-1" style={{ width: "100%", height: "100%", overflow: "hidden" }} />;
};

export default PongScene;
