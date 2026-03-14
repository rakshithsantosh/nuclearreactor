import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function ReactorCore({ position, isActive, isHovered, onSelect, onHover, simulationRunning, flowSpeed }) {
  const glowRef = useRef(null);
  const shellRef = useRef(null);

  const fuelGrid = useMemo(() => {
    const rods = [];
    const spacing = 0.37;
    for (let row = -4; row <= 4; row += 1) {
      for (let col = -4; col <= 4; col += 1) {
        if (Math.hypot(row, col) <= 4.25) {
          rods.push([row * spacing, col * spacing]);
        }
      }
    }
    return rods;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const pulse = 0.18 * Math.sin(t * 4.2) + 0.06 * Math.sin(t * 8.4);
    const runScale = simulationRunning ? 1 : 0.45;
    const activeScale = isActive ? 1.15 : isHovered ? 1 : 0.86;

    if (glowRef.current) {
      glowRef.current.emissiveIntensity = (1.0 + pulse + flowSpeed * 0.25) * runScale * activeScale;
    }

    if (shellRef.current) {
      shellRef.current.emissiveIntensity = isActive ? 0.28 : isHovered ? 0.14 : 0.03;
    }
  });

  return (
    <group
      position={position}
      onClick={(event) => {
        event.stopPropagation();
        onSelect('core');
      }}
      onPointerEnter={(event) => {
        event.stopPropagation();
        onHover('core');
      }}
      onPointerLeave={(event) => {
        event.stopPropagation();
        onHover(null);
      }}
    >
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[2.2, 2.2, 7.2, 54]} />
        <meshStandardMaterial
          ref={shellRef}
          color={isActive || isHovered ? '#9ca3af' : '#6b7280'}
          metalness={0.86}
          roughness={0.31}
          emissive="#f59e0b"
        />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.72, 1.72, 5.8, 42]} />
        <meshStandardMaterial
          ref={glowRef}
          color="#1e3a8a"
          emissive="#38bdf8"
          emissiveIntensity={1}
          transparent
          opacity={0.82}
          metalness={0.12}
          roughness={0.2}
        />
      </mesh>

      <mesh position={[0, 3.66, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.26, 48]} />
        <meshStandardMaterial color="#a8b0bd" metalness={0.9} roughness={0.28} />
      </mesh>

      <mesh position={[0, -3.66, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[2.2, 48]} />
        <meshStandardMaterial color="#4b5563" metalness={0.68} roughness={0.42} />
      </mesh>

      {fuelGrid.map(([x, z], index) => (
        <mesh key={`fuel-${index}`} position={[x, -0.1, z]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 5.05, 12]} />
          <meshStandardMaterial
            color="#7dd3fc"
            emissive="#38bdf8"
            emissiveIntensity={isActive ? 1.2 : isHovered ? 1.0 : 0.85}
            roughness={0.22}
            metalness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}
