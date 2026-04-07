import React from 'react';
import * as THREE from 'three';

export default function SteamGenerator({ position, selected, clippingPlane }) {
  return (
    <group position={position}>
      {/* SG Casing */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[1.2, 1.2, 8, 32]} />
        <meshStandardMaterial 
          color="#30363d" 
          metalness={0.8} 
          roughness={0.2} 
          clippingPlanes={clippingPlane ? [clippingPlane] : []}
          emissive={selected ? '#2980b9' : '#000000'}
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Steam Drum Top */}
      <mesh position={[0, 4, 0]} castShadow>
        <sphereGeometry args={[1.5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial 
          color="#21262d" 
          metalness={0.9} 
          roughness={0.1}
          clippingPlanes={clippingPlane ? [clippingPlane] : []}
        />
      </mesh>

      {/* Internal Tube Bundle Visualization (simplified) */}
      <group position={[0, -1, 0]}>
        {[...Array(6)].map((_, i) => (
          <mesh 
            key={i} 
            position={[Math.cos(i * Math.PI / 3) * 0.6, 0, Math.sin(i * Math.PI / 3) * 0.6]}
          >
            <cylinderGeometry args={[0.04, 0.04, 5.5, 8]} />
            <meshStandardMaterial 
              color="#58a6ff" 
              emissive="#58a6ff"
              emissiveIntensity={0.8}
              clippingPlanes={clippingPlane ? [clippingPlane] : []}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
