import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import FlowParticles from './FlowParticles';

export default function GeneratorUnit({
  position,
  isActive,
  isHovered,
  onSelect,
  onHover,
  simulationRunning,
  powerLevel,
}) {
  const rotorRef = useRef(null);

  const arcCurves = useMemo(
    () => [
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(2.5, 0.5, -0.2),
        new THREE.Vector3(4.2, 1.8, -0.5),
        new THREE.Vector3(6.8, 2.5, -0.6),
      ]),
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(2.6, 0.7, 0),
        new THREE.Vector3(4.6, 2.1, 0.4),
        new THREE.Vector3(7.2, 2.9, 0.4),
      ]),
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(2.45, 0.45, 0.2),
        new THREE.Vector3(4.1, 1.7, 0.8),
        new THREE.Vector3(6.9, 2.35, 0.9),
      ]),
    ],
    [],
  );

  useFrame((_, delta) => {
    if (rotorRef.current) {
      const speed = simulationRunning ? 1.2 + powerLevel * 2.2 : 0.12;
      rotorRef.current.rotation.x += delta * speed;
    }
  });

  return (
    <group
      position={position}
      onClick={(event) => {
        event.stopPropagation();
        onSelect('generator');
      }}
      onPointerEnter={(event) => {
        event.stopPropagation();
        onHover('generator');
      }}
      onPointerLeave={(event) => {
        event.stopPropagation();
        onHover(null);
      }}
    >
      <mesh castShadow receiveShadow rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[1.25, 1.25, 3.9, 42]} />
        <meshStandardMaterial
          color={isActive || isHovered ? '#a3a3a3' : '#737373'}
          metalness={0.84}
          roughness={0.3}
          emissive="#f59e0b"
          emissiveIntensity={isActive ? 0.26 : 0}
        />
      </mesh>

      <group ref={rotorRef}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.28, 0.28, 3.8, 22]} />
          <meshStandardMaterial color="#e5e7eb" metalness={0.88} roughness={0.2} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.75, 0.1, 14, 42]} />
          <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.75} roughness={0.25} />
        </mesh>
      </group>

      <mesh position={[2.2, 0.9, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 2.6, 2]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.72} roughness={0.35} />
      </mesh>

      {[4.7, 6.3, 8.1].map((x, index) => (
        <group key={`pole-${x}`} position={[x, 0.6, index === 1 ? 0.4 : -0.4]} raycast={() => null}>
          <mesh castShadow>
            <cylinderGeometry args={[0.08, 0.08, 3.2, 8]} />
            <meshStandardMaterial color="#cbd5e1" />
          </mesh>
          <mesh position={[0, 1.4, 0]}>
            <boxGeometry args={[0.9, 0.06, 0.06]} />
            <meshStandardMaterial color="#94a3b8" />
          </mesh>
        </group>
      ))}

      {arcCurves.map((curve, index) => (
        <group key={`arc-${index}`}>
          <mesh raycast={() => null}>
            <tubeGeometry args={[curve, 44, 0.04, 8, false]} />
            <meshStandardMaterial color="#fb923c" emissive="#f97316" emissiveIntensity={0.35} />
          </mesh>
          <FlowParticles
            curve={curve}
            color="#fdba74"
            count={10}
            size={0.06}
            speed={(0.24 + index * 0.05) * powerLevel}
            running={simulationRunning}
            opacity={0.95}
          />
        </group>
      ))}

      <pointLight
        position={[0.9, 0.2, 0]}
        color="#f97316"
        intensity={isActive ? 2.4 : 1.2}
        distance={8}
      />
    </group>
  );
}
