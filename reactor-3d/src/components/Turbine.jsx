import React from 'react';
import * as THREE from 'three';

export default function Turbine({ position, selected, clippingPlane }) {
  return (
    <group position={position}>
      {/* High Pressure Stage */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.8, 1.2, 3, 24]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial 
          color="#21262d" 
          metalness={0.9} 
          roughness={0.1}
          clippingPlanes={clippingPlane ? [clippingPlane] : []}
          emissive={selected ? '#27ae60' : '#000000'}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Low Pressure Stages x2 */}
      <mesh position={[4, 0, 0]} castShadow>
        <cylinderGeometry args={[1.5, 2.2, 4, 32]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial 
          color="#30363d" 
          metalness={0.8} 
          roughness={0.2}
          clippingPlanes={clippingPlane ? [clippingPlane] : []}
          emissive={selected ? '#27ae60' : '#000000'}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Generator Unit */}
      <mesh position={[8, 0, 0]} castShadow>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial 
          color="#161b22" 
          metalness={0.5} 
          roughness={0.5}
          clippingPlanes={clippingPlane ? [clippingPlane] : []}
        />
      </mesh>

      {/* Shaft */}
      <mesh position={[4, 0, 0]} rotation={[0,0,Math.PI/2]}>
          <cylinderGeometry args={[0.2, 0.2, 12, 12]} />
          <meshStandardMaterial color="#444" metalness={1} roughness={0} />
      </mesh>
    </group>
  );
}
