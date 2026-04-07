import React from 'react';
import * as THREE from 'three';

export default function ControlRods({ position, selected, clippingPlane }) {
  const rodGrid = [];
  const spacing = 1.0;
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
        rodGrid.push([x * spacing, y * spacing]);
    }
  }

  return (
    <group position={position}>
      {/* Fuelling Machine Nozzles / Control Drive Mechanism Housing */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[4, 1.5, 4]} />
        <meshStandardMaterial 
          color="#21262d" 
          metalness={0.9} 
          roughness={0.1}
          clippingPlanes={clippingPlane ? [clippingPlane] : []}
          emissive={selected ? '#8e44ad' : '#000000'}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Control Rod Drives */}
      {rodGrid.map((pos, i) => (
        <group key={i} position={[pos[0], -1, pos[1]]}>
           <mesh castShadow>
                <cylinderGeometry args={[0.15, 0.15, 4, 16]} />
                <meshStandardMaterial 
                    color="#8e44ad" 
                    emissive="#8e44ad"
                    emissiveIntensity={selected ? 1.5 : 0.8}
                    clippingPlanes={clippingPlane ? [clippingPlane] : []}
                />
            </mesh>
            <mesh position={[0, 2.2, 0]}>
                <cylinderGeometry args={[0.3, 0.3, 0.8, 16]} />
                <meshStandardMaterial color="#30363d" metalness={1} clippingPlanes={clippingPlane ? [clippingPlane] : []} />
            </mesh>
        </group>
      ))}
    </group>
  );
}
