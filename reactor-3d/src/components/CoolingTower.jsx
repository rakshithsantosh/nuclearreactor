import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FallingDroplets({ running, flowSpeed }) {
  const meshRef = useRef(null);
  const tempObject = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(
    () =>
      Array.from({ length: 84 }, () => ({
        angle: Math.random() * Math.PI * 2,
        radius: 0.25 + Math.random() * 1.2,
        phase: Math.random(),
        speed: 0.4 + Math.random() * 0.8,
      })),
    [],
  );
  const elapsedRef = useRef(0);

  useFrame((_, delta) => {
    if (!meshRef.current) {
      return;
    }

    if (running) {
      elapsedRef.current += delta * flowSpeed;
    }

    particles.forEach((particle, index) => {
      const yNorm = (particle.phase + elapsedRef.current * particle.speed * 0.26) % 1;
      const y = 10.8 - yNorm * 9.3;
      const swirl = elapsedRef.current * 0.45;
      const radius = particle.radius * (0.75 + y / 20);

      tempObject.position.set(
        Math.cos(particle.angle + swirl) * radius,
        y,
        Math.sin(particle.angle + swirl) * radius,
      );
      tempObject.scale.setScalar(1);
      tempObject.updateMatrix();
      meshRef.current.setMatrixAt(index, tempObject.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, particles.length]} raycast={() => null}>
      <sphereGeometry args={[0.045, 8, 8]} />
      <meshStandardMaterial color="#93c5fd" emissive="#60a5fa" emissiveIntensity={0.6} transparent opacity={0.8} />
    </instancedMesh>
  );
}

function RisingMist({ running, flowSpeed }) {
  const meshRef = useRef(null);
  const tempObject = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(
    () =>
      Array.from({ length: 58 }, () => ({
        angle: Math.random() * Math.PI * 2,
        radius: 0.2 + Math.random() * 2.2,
        phase: Math.random(),
        drift: 0.2 + Math.random() * 0.35,
      })),
    [],
  );
  const elapsedRef = useRef(0);

  useFrame((_, delta) => {
    if (!meshRef.current) {
      return;
    }

    if (running) {
      elapsedRef.current += delta * flowSpeed;
    }

    particles.forEach((particle, index) => {
      const yNorm = (particle.phase + elapsedRef.current * particle.drift * 0.11) % 1;
      const y = 10.8 + yNorm * 4.2;
      const drift = elapsedRef.current * 0.2;
      const radius = particle.radius + yNorm * 0.35;

      tempObject.position.set(
        Math.cos(particle.angle + drift) * radius,
        y,
        Math.sin(particle.angle + drift) * radius,
      );
      const scale = 0.65 + yNorm * 0.75;
      tempObject.scale.setScalar(scale);
      tempObject.updateMatrix();
      meshRef.current.setMatrixAt(index, tempObject.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, particles.length]} raycast={() => null}>
      <sphereGeometry args={[0.12, 10, 10]} />
      <meshStandardMaterial color="#dbeafe" emissive="#cbd5e1" emissiveIntensity={0.18} transparent opacity={0.2} />
    </instancedMesh>
  );
}

export default function CoolingTower({ position, isActive, isHovered, onSelect, onHover, simulationRunning, flowSpeed }) {
  const profile = useMemo(
    () => [
      new THREE.Vector2(3.5, 0),
      new THREE.Vector2(2.6, 2.2),
      new THREE.Vector2(2.05, 5),
      new THREE.Vector2(2.05, 7),
      new THREE.Vector2(2.45, 9.6),
      new THREE.Vector2(3.25, 12),
    ],
    [],
  );

  return (
    <group
      position={position}
      onClick={(event) => {
        event.stopPropagation();
        onSelect('coolingTower');
      }}
      onPointerEnter={(event) => {
        event.stopPropagation();
        onHover('coolingTower');
      }}
      onPointerLeave={(event) => {
        event.stopPropagation();
        onHover(null);
      }}
    >
      <mesh castShadow receiveShadow>
        <latheGeometry args={[profile, 52]} />
        <meshStandardMaterial
          color={isActive || isHovered ? '#cbd5e1' : '#9ca3af'}
          metalness={0.28}
          roughness={0.55}
          transparent
          opacity={0.92}
          emissive="#e2e8f0"
          emissiveIntensity={isActive ? 0.12 : 0.04}
        />
      </mesh>

      <mesh position={[0, -0.35, 0]} receiveShadow>
        <cylinderGeometry args={[3.9, 4.3, 0.7, 46]} />
        <meshStandardMaterial color="#334155" metalness={0.45} roughness={0.55} />
      </mesh>

      <mesh position={[0, -0.02, 0]} receiveShadow>
        <cylinderGeometry args={[2.8, 2.8, 0.2, 42]} />
        <meshStandardMaterial color="#1d4ed8" emissive="#2563eb" emissiveIntensity={0.48} />
      </mesh>

      <FallingDroplets running={simulationRunning} flowSpeed={flowSpeed} />
      <RisingMist running={simulationRunning} flowSpeed={flowSpeed} />

      {[0, 1, 2, 3, 4, 5].map((index) => {
        const angle = (index / 6) * Math.PI * 2;
        return (
          <mesh
            key={`spray-${index}`}
            position={[Math.cos(angle) * 1.4, 0.5, Math.sin(angle) * 1.4]}
            rotation={[Math.PI / 2, 0, angle]}
          >
            <coneGeometry args={[0.09, 0.42, 10]} />
            <meshStandardMaterial color="#bfdbfe" emissive="#93c5fd" emissiveIntensity={0.4} />
          </mesh>
        );
      })}
    </group>
  );
}
