import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function SteamGenerator({ position, isActive, isHovered, onSelect, onHover, simulationRunning }) {
  const shellRef = useRef(null);

  const tubePositions = useMemo(() => {
    const tubes = [];
    const ringCount = 2;
    for (let ring = 1; ring <= ringCount; ring += 1) {
      const radius = ring * 0.45;
      const count = ring === 1 ? 8 : 14;
      for (let index = 0; index < count; index += 1) {
        const angle = (index / count) * Math.PI * 2;
        tubes.push([Math.cos(angle) * radius, Math.sin(angle) * radius]);
      }
    }
    tubes.push([0, 0]);
    return tubes;
  }, []);

  useFrame((state) => {
    if (!shellRef.current) {
      return;
    }

    const pulse = 0.08 * Math.sin(state.clock.getElapsedTime() * 3.3);
    const runScale = simulationRunning ? 1 : 0.6;
    shellRef.current.emissiveIntensity = (isActive ? 0.24 : isHovered ? 0.12 : 0.03) * runScale + pulse;
  });

  return (
    <group
      position={position}
      onClick={(event) => {
        event.stopPropagation();
        onSelect('steamGenerator');
      }}
      onPointerEnter={(event) => {
        event.stopPropagation();
        onHover('steamGenerator');
      }}
      onPointerLeave={(event) => {
        event.stopPropagation();
        onHover(null);
      }}
    >
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[1.75, 1.75, 6.8, 50]} />
        <meshStandardMaterial
          ref={shellRef}
          color={isActive || isHovered ? '#9ca3af' : '#64748b'}
          metalness={0.84}
          roughness={0.31}
          emissive="#f59e0b"
        />
      </mesh>

      <mesh position={[0, 3.55, 0]} castShadow>
        <cylinderGeometry args={[1.15, 1.52, 0.88, 46]} />
        <meshStandardMaterial color="#4b5563" metalness={0.74} roughness={0.42} />
      </mesh>

      <mesh position={[0, -3.55, 0]} castShadow>
        <cylinderGeometry args={[1.52, 1.15, 0.88, 46]} />
        <meshStandardMaterial color="#4b5563" metalness={0.74} roughness={0.42} />
      </mesh>

      {tubePositions.map(([x, z], index) => (
        <mesh key={`sg-tube-${index}`} position={[x, 0, z]}>
          <cylinderGeometry args={[0.055, 0.055, 5.8, 10]} />
          <meshStandardMaterial
            color="#93c5fd"
            emissive="#60a5fa"
            emissiveIntensity={isActive ? 0.84 : 0.52}
            metalness={0.2}
            roughness={0.31}
          />
        </mesh>
      ))}

      <mesh position={[-1.95, 1.2, 0.8]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <cylinderGeometry args={[0.17, 0.17, 1.4, 20]} />
        <meshStandardMaterial color="#3b82f6" emissive="#60a5fa" emissiveIntensity={0.5} />
      </mesh>

      <mesh position={[0.25, 3.15, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 1.8, 20]} />
        <meshStandardMaterial color="#f8fafc" emissive="#e5e7eb" emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
}
