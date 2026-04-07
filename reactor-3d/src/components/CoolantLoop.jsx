import React, { useMemo } from 'react';
import * as THREE from 'three';

export default function CoolantLoop({ position, selected, clippingPlane }) {
  const curve = useMemo(() => {
    // Create a figure-8 path for the primary loop
    const points = [];
    for (let i = 0; i <= 20; i++) {
        const t = (i / 20) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.sin(t) * 4, Math.cos(t * 2) * 2, Math.sin(t * 2) * 2));
    }
    return new THREE.CatmullRomCurve3(points);
  }, []);

  return (
    <group position={position}>
      {/* Primary Loop Piping */}
      <mesh castShadow receiveShadow>
        <tubeGeometry args={[curve, 64, 0.25, 12, true]} />
        <meshStandardMaterial 
          color={selected ? '#e67e22' : '#30363d'} 
          metalness={0.8} 
          roughness={0.2}
          clippingPlanes={clippingPlane ? [clippingPlane] : []}
          emissive={selected ? '#e67e22' : '#000000'}
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Pumps Visualization (simplified) */}
      <mesh position={[4, 2, 0]} castShadow>
          <cylinderGeometry args={[0.6, 0.6, 1.2, 16]} />
          <meshStandardMaterial color="#21262d" metalness={0.9} />
      </mesh>
      <mesh position={[-4, 2, 0]} castShadow>
          <cylinderGeometry args={[0.6, 0.6, 1.2, 16]} />
          <meshStandardMaterial color="#21262d" metalness={0.9} />
      </mesh>
    </group>
  );
}
