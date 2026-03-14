export default function Containment({ position }) {
  return (
    <group position={position}>
      <mesh raycast={() => null} position={[0, -3.2, 0]} scale={[1.1, 0.88, 1.15]}>
        <sphereGeometry args={[9.4, 46, 28, 0, Math.PI * 2, 0, Math.PI / 1.75]} />
        <meshStandardMaterial
          color="#67e8f9"
          transparent
          opacity={0.12}
          roughness={0.2}
          metalness={0.08}
          emissive="#67e8f9"
          emissiveIntensity={0.08}
        />
      </mesh>

      <mesh raycast={() => null} position={[0, -3.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[10.4, 0.2, 12, 120]} />
        <meshStandardMaterial color="#64748b" metalness={0.62} roughness={0.36} />
      </mesh>
    </group>
  );
}
