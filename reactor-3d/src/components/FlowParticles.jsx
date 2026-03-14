import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function FlowParticles({
  curve,
  color,
  count = 20,
  size = 0.09,
  speed = 0.25,
  running = true,
  opacity = 1,
}) {
  const meshRef = useRef(null);
  const phaseRef = useRef(0);
  const tempObject = useMemo(() => new THREE.Object3D(), []);
  const offsets = useMemo(() => Array.from({ length: count }, (_, index) => index / count), [count]);

  useFrame((_, delta) => {
    if (!meshRef.current) {
      return;
    }

    if (running) {
      phaseRef.current = (phaseRef.current + delta * speed) % 1;
    }

    offsets.forEach((offset, index) => {
      const point = curve.getPointAt((phaseRef.current + offset) % 1);
      tempObject.position.copy(point);
      tempObject.scale.setScalar(1);
      tempObject.updateMatrix();
      meshRef.current.setMatrixAt(index, tempObject.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]} frustumCulled={false}>
      <sphereGeometry args={[size, 10, 10]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.6}
        transparent
        opacity={opacity}
        metalness={0.08}
        roughness={0.2}
      />
    </instancedMesh>
  );
}

