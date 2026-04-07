import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Ring } from '@react-three/drei';
import * as THREE from 'three';
import { SUPPLY_DATA } from '../data/supplyData';

const HOTSPOT_POSITIONS = {
  core: [0, 0, 0],
  primary: [-4, 0, 0],
  steam: [4, 0, 0],
  turbine: [8, 4, 0],
  fuel_ic: [0, 5, 0],
};

function HotspotItem({ id, position, active, onSelect, onHover, visible }) {
  const [hovered, setHovered] = useState(false);
  const ringRef = useRef();
  const data = SUPPLY_DATA[id];

  useFrame((state) => {
    if (ringRef.current) {
      const t = state.clock.getElapsedTime();
      const s = 1 + Math.sin(t * 3) * 0.1;
      ringRef.current.scale.set(s, s, s);
      if (ringRef.current.material) {
        ringRef.current.material.opacity = 0.5 + Math.sin(t * 3) * 0.2;
      }
    }
  });

  if (!visible) return null;

  return (
    <group position={position}>
      {/* Invisible Clickable Mesh */}
      <mesh 
        onClick={(e) => { e.stopPropagation(); onSelect(id); }}
        onPointerOver={() => { setHovered(true); onHover(id); }}
        onPointerOut={() => { setHovered(false); onHover(null); }}
      >
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Pulsing Ring */}
      {(hovered || active) && (
        <group rotation={[Math.PI / 2, 0, 0]}>
          <Ring 
            ref={ringRef}
            args={[1.1, 1.2, 32]} 
          >
            <meshBasicMaterial 
              color={data.color} 
              transparent 
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </Ring>
        </group>
      )}

      {/* Floating HTML Label */}
      {(hovered || active) && (
        <Html distanceFactor={10}>
          <div className="pointer-events-none whitespace-nowrap">
            <div className="px-2 py-1 bg-[#161b22] border border-[#21262d] rounded-sm shadow-xl">
              <span className="mono text-[10px] uppercase font-bold" style={{ color: data.color }}>
                {data.label}
              </span>
            </div>
            <div className="w-[1px] h-4 bg-[#21262d] mx-auto" />
          </div>
        </Html>
      )}
    </group>
  );
}

export default function Hotspots({ selectedId, onSelect, onHover, activeLayers }) {
  return (
    <group>
      {Object.entries(HOTSPOT_POSITIONS).map(([id, pos]) => (
        <HotspotItem 
          key={id}
          id={id}
          position={pos}
          active={selectedId === id}
          onSelect={onSelect}
          onHover={onHover}
          visible={activeLayers.includes(id)}
        />
      ))}
    </group>
  );
}
