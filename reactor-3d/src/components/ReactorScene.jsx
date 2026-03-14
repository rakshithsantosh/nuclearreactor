import { useEffect, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import ReactorModel from './ReactorModel';
import { cameraPresets } from '../data/reactorData';

function CameraController({ focusId, controlsRef }) {
  const { camera } = useThree();

  useEffect(() => {
    const preset = cameraPresets[focusId] ?? cameraPresets.overview;
    const [x, y, z] = preset.position;
    const [tx, ty, tz] = preset.target;

    const cameraTween = gsap.to(camera.position, {
      x,
      y,
      z,
      duration: 1.45,
      ease: 'power2.inOut',
      onUpdate: () => {
        camera.updateProjectionMatrix();
      },
    });

    let targetTween;
    if (controlsRef.current) {
      targetTween = gsap.to(controlsRef.current.target, {
        x: tx,
        y: ty,
        z: tz,
        duration: 1.45,
        ease: 'power2.inOut',
        onUpdate: () => {
          controlsRef.current?.update();
        },
      });
    }

    return () => {
      cameraTween.kill();
      targetTween?.kill();
    };
  }, [camera, controlsRef, focusId]);

  return null;
}

export default function ReactorScene({ selectedId, focusId, onSelect, exploded, simulationRunning, flowSpeed }) {
  const controlsRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    document.body.style.cursor = hoveredId ? 'pointer' : 'default';
    return () => {
      document.body.style.cursor = 'default';
    };
  }, [hoveredId]);

  return (
    <div className="h-full w-full">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: cameraPresets.overview.position, fov: 42, near: 0.1, far: 220 }}
      >
        <color attach="background" args={['#0b0f14']} />
        <fog attach="fog" args={['#0b0f14', 26, 88]} />

        <ambientLight intensity={0.45} />
        <directionalLight
          castShadow
          intensity={1.2}
          position={[18, 24, 16]}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-left={-40}
          shadow-camera-right={40}
          shadow-camera-top={40}
          shadow-camera-bottom={-40}
        />
        <pointLight position={[-12, 4.8, 0]} color="#60a5fa" intensity={2.1} distance={22} />
        <pointLight position={[7, 5.2, 0]} color="#f97316" intensity={selectedId === 'generator' ? 2.2 : 1.4} distance={20} />

        <ReactorModel
          selectedId={selectedId}
          hoveredId={hoveredId}
          onSelect={onSelect}
          onHover={setHoveredId}
          exploded={exploded}
          simulationRunning={simulationRunning}
          flowSpeed={flowSpeed}
        />

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[5, -0.02, 0]} receiveShadow>
          <planeGeometry args={[90, 56]} />
          <meshStandardMaterial color="#111827" metalness={0.06} roughness={0.95} />
        </mesh>
        <gridHelper args={[90, 90, '#233142', '#17212b']} position={[5, 0.01, 0]} />
        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.08}
          minDistance={7}
          maxDistance={54}
          maxPolarAngle={Math.PI / 2.05}
        />

        <CameraController focusId={focusId} controlsRef={controlsRef} />
      </Canvas>
    </div>
  );
}



