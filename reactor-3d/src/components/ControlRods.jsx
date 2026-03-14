import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';

export default function ControlRods({ position, isActive, isHovered, onSelect, onHover }) {
  const carrierRef = useRef(null);
  const [inserted, setInserted] = useState(false);

  const rodGrid = useMemo(() => {
    const rods = [];
    const spacing = 0.6;
    for (let row = -2; row <= 2; row += 1) {
      for (let col = -2; col <= 2; col += 1) {
        if (Math.hypot(row, col) <= 2.3) {
          rods.push([row * spacing, col * spacing]);
        }
      }
    }
    return rods;
  }, []);

  useEffect(() => {
    if (!carrierRef.current) {
      return;
    }

    const tween = gsap.to(carrierRef.current.position, {
      y: inserted ? -1.35 : 1,
      duration: 1.1,
      ease: 'power2.inOut',
    });

    return () => {
      tween.kill();
    };
  }, [inserted]);

  return (
    <group
      position={position}
      onClick={(event) => {
        event.stopPropagation();
        setInserted((state) => !state);
        onSelect('controlRods');
      }}
      onPointerEnter={(event) => {
        event.stopPropagation();
        onHover('controlRods');
      }}
      onPointerLeave={(event) => {
        event.stopPropagation();
        onHover(null);
      }}
    >
      <mesh position={[0, 4.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.1, 0.45, 3.1]} />
        <meshStandardMaterial
          color={isActive || isHovered ? '#64748b' : '#475569'}
          metalness={0.78}
          roughness={0.32}
          emissive="#f59e0b"
          emissiveIntensity={isActive ? 0.24 : isHovered ? 0.12 : 0}
        />
      </mesh>

      <group ref={carrierRef} position={[0, 1, 0]}>
        {rodGrid.map(([x, z], index) => (
          <mesh key={`control-${index}`} position={[x, 1.9, z]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 4.4, 12]} />
            <meshStandardMaterial color="#111827" metalness={0.72} roughness={0.45} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
