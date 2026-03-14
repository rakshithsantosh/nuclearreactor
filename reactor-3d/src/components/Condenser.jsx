import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import FlowParticles from './FlowParticles';

export default function Condenser({ position, isActive, isHovered, onSelect, onHover, simulationRunning, flowSpeed }) {
  const vaporRef = useRef(null);

  const steamCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-1.1, 1.5, 0.4),
        new THREE.Vector3(-0.4, 0.9, 0.15),
        new THREE.Vector3(0.25, 0.35, 0),
      ]),
    [],
  );

  const condensateCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.2, 0.2, -0.1),
        new THREE.Vector3(0.65, -0.4, -0.35),
        new THREE.Vector3(1.2, -1.2, -0.6),
      ]),
    [],
  );

  useFrame((state) => {
    if (!vaporRef.current) {
      return;
    }

    const shimmer = 0.03 * Math.sin(state.clock.getElapsedTime() * 2.8);
    vaporRef.current.opacity = (isActive ? 0.28 : 0.2) + shimmer;
  });

  return (
    <group
      position={position}
      onClick={(event) => {
        event.stopPropagation();
        onSelect('condenser');
      }}
      onPointerEnter={(event) => {
        event.stopPropagation();
        onHover('condenser');
      }}
      onPointerLeave={(event) => {
        event.stopPropagation();
        onHover(null);
      }}
    >
      <mesh castShadow receiveShadow>
        <boxGeometry args={[4.3, 2.2, 2.8]} />
        <meshStandardMaterial
          color={isActive || isHovered ? '#94a3b8' : '#64748b'}
          metalness={0.74}
          roughness={0.36}
          emissive="#f59e0b"
          emissiveIntensity={isActive ? 0.18 : 0}
        />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.65, 1.35, 2]} />
        <meshStandardMaterial ref={vaporRef} color="#dbeafe" emissive="#93c5fd" emissiveIntensity={0.22} transparent opacity={0.22} />
      </mesh>

      {[-1.4, -0.7, 0, 0.7, 1.4].map((x) => (
        <mesh key={`tube-${x}`} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.07, 0.07, 2.1, 10]} />
          <meshStandardMaterial color="#93c5fd" emissive="#60a5fa" emissiveIntensity={0.35} />
        </mesh>
      ))}

      <FlowParticles
        curve={steamCurve}
        color="#f8fafc"
        count={14}
        size={0.06}
        speed={0.22 * flowSpeed}
        running={simulationRunning}
        opacity={0.85}
      />

      <FlowParticles
        curve={condensateCurve}
        color="#60a5fa"
        count={14}
        size={0.06}
        speed={0.18 * flowSpeed}
        running={simulationRunning}
        opacity={0.9}
      />
    </group>
  );
}
