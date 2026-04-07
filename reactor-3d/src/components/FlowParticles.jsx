import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function FlowParticles({ activeLayers }) {
  const pointsRef = useRef();
  const particleCount = 1000;

  // Create random positions along a figure-8 path for the primary loop
  const [positions, phases] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const phs = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
        phs[i] = Math.random() * Math.PI * 2;
        // Logic for pathing will go here, simplified for now
    }
    return [pos, phs];
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
        const time = state.clock.getElapsedTime();
        const positions = pointsRef.current.geometry.attributes.position.array;
        
        for (let i = 0; i < particleCount; i++) {
            const phase = phases[i] + time * 1.5;
            // Figure-8 pattern simplified:
            const angle = phase;
            const x = Math.sin(angle) * 6 - 8; // Offset to loop
            const y = Math.cos(angle * 2) * 2;
            const z = Math.sin(angle * 2) * 2;

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  if (!activeLayers.includes('primary')) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.08} 
        color="#e67e22" 
        transparent 
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
