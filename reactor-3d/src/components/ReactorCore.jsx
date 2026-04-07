import React, { useMemo } from 'react';
import * as THREE from 'three';

export default function ReactorCore({ position, selected, clippingPlane }) {
  const fuelGrid = useMemo(() => {
    const channels = [];
    const spacing = 0.35;
    for (let x = -6; x <= 6; x++) {
      for (let y = -6; y <= 6; y++) {
        const radius = Math.sqrt(x*x + y*y);
        if (radius <= 6) {
          let color = '#1a3a5c'; // Outer - cool
          if (radius <= 2) color = '#c0392b'; // Center - hot (swapped to red for clarity)
          else if (radius <= 4) color = '#e67e22'; // Middle - warm
          
          channels.push({ pos: [x * spacing, y * spacing, 0], color });
        }
      }
    }
    return channels;
  }, []);

  return (
    <group position={position}>
      {/* Outer Shell (Calandria) */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[2.5, 2.5, 6, 32]} />
        <meshStandardMaterial 
          color="#21262d" 
          metalness={0.9} 
          roughness={0.1}
          clippingPlanes={clippingPlane ? [clippingPlane] : []}
          emissive={selected ? '#58a6ff' : '#000000'}
          emissiveIntensity={selected ? 0.3 : 0}
        />
      </mesh>

      {/* Fuel Channels */}
      <group rotation={[Math.PI / 2, 0, 0]}>
        {fuelGrid.map((channel, i) => (
          <mesh key={i} position={channel.pos}>
            <cylinderGeometry args={[0.08, 0.08, 6.2, 8]} />
            <meshStandardMaterial 
              color={channel.color} 
              emissive={channel.color}
              emissiveIntensity={selected ? 1.2 : 0.8}
              clippingPlanes={clippingPlane ? [clippingPlane] : []}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
