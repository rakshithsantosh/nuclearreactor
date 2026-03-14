import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Turbine({
  position,
  isActive,
  isHovered,
  onSelect,
  onHover,
  simulationRunning,
  steamPower,
}) {
  const rotorRef = useRef(null);
  const speedRef = useRef(0.7);

  const bladeAngles = useMemo(
    () => Array.from({ length: 12 }, (_, index) => (index / 12) * Math.PI * 2),
    [],
  );

  useFrame((_, delta) => {
    if (!rotorRef.current) {
      return;
    }

    const targetSpeed = simulationRunning ? 1.1 + steamPower * 3.6 : 0.15;
    speedRef.current += (targetSpeed - speedRef.current) * Math.min(1, delta * 2.4);
    rotorRef.current.rotation.x += delta * speedRef.current;
  });

  return (
    <group
      position={position}
      onClick={(event) => {
        event.stopPropagation();
        onSelect('turbine');
      }}
      onPointerEnter={(event) => {
        event.stopPropagation();
        onHover('turbine');
      }}
      onPointerLeave={(event) => {
        event.stopPropagation();
        onHover(null);
      }}
    >
      <mesh castShadow receiveShadow rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[1.75, 1.75, 4.8, 56]} />
        <meshStandardMaterial
          color={isActive || isHovered ? '#a3a3a3' : '#737373'}
          metalness={0.86}
          roughness={0.28}
          emissive="#f59e0b"
          emissiveIntensity={isActive ? 0.2 : 0}
        />
      </mesh>

      <group ref={rotorRef}>
        <mesh castShadow receiveShadow rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.28, 0.28, 4.6, 22]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.88} roughness={0.21} />
        </mesh>

        {bladeAngles.map((angle, index) => (
          <mesh
            key={`blade-${index}`}
            position={[0, Math.cos(angle) * 0.84, Math.sin(angle) * 0.84]}
            rotation={[0, 0, -Math.PI / 2 + angle]}
            castShadow
          >
            <coneGeometry args={[0.17, 1.18, 10]} />
            <meshStandardMaterial
              color={isActive ? '#fbbf24' : '#d1d5db'}
              emissive={isActive ? '#f59e0b' : '#000000'}
              emissiveIntensity={isActive ? 0.16 : 0}
              metalness={0.65}
              roughness={0.34}
            />
          </mesh>
        ))}
      </group>

      <pointLight
        position={[0.6, 0, 0]}
        color="#fef3c7"
        intensity={isActive ? 1.5 : 0.65}
        distance={6}
      />
    </group>
  );
}
