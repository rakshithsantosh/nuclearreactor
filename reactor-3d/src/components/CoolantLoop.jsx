import { useMemo } from 'react';
import * as THREE from 'three';
import FlowParticles from './FlowParticles';

function PipeSegment({ curve, color, emissive, radius, glow }) {
  return (
    <mesh>
      <tubeGeometry args={[curve, 80, radius, 14, false]} />
      <meshStandardMaterial color={color} metalness={0.34} roughness={0.25} emissive={emissive} emissiveIntensity={glow} />
    </mesh>
  );
}

export default function CoolantLoop({
  layout,
  isActive,
  isHovered,
  onSelect,
  onHover,
  simulationRunning,
  flowSpeed,
}) {
  const curves = useMemo(() => {
    const [rx, ry, rz] = layout.reactor;
    const [sx, sy, sz] = layout.steamGenerator;
    const [tx, ty, tz] = layout.turbine;
    const [cx, cy, cz] = layout.condenser;
    const [kx, ky, kz] = layout.coolingTower;

    const primaryHot = new THREE.CatmullRomCurve3([
      new THREE.Vector3(rx + 2.25, ry + 2.2, rz + 0.8),
      new THREE.Vector3(rx + 3.5, ry + 3.4, rz + 1.8),
      new THREE.Vector3(sx - 2.2, sy + 3.4, sz + 1.6),
      new THREE.Vector3(sx - 1.6, sy + 1.8, sz + 0.9),
    ]);

    const primaryReturn = new THREE.CatmullRomCurve3([
      new THREE.Vector3(sx - 1.55, sy - 1.2, sz - 0.9),
      new THREE.Vector3(sx - 2.5, sy - 1.9, sz - 1.7),
      new THREE.Vector3(rx + 3.2, ry - 1.4, rz - 1.7),
      new THREE.Vector3(rx + 1.95, ry - 0.7, rz - 0.95),
    ]);

    const steamToTurbine = new THREE.CatmullRomCurve3([
      new THREE.Vector3(sx + 0.7, sy + 3.2, sz + 0.1),
      new THREE.Vector3(sx + 2.6, sy + 4.7, sz + 0.2),
      new THREE.Vector3(tx - 2.8, ty + 2.4, tz + 0.2),
      new THREE.Vector3(tx - 1.4, ty + 1.2, tz + 0.15),
    ]);

    const exhaustToCondenser = new THREE.CatmullRomCurve3([
      new THREE.Vector3(tx + 1.6, ty + 0.8, tz + 0.45),
      new THREE.Vector3(tx + 2.3, ty - 0.8, tz + 0.6),
      new THREE.Vector3(cx + 1.3, cy + 2.1, cz + 0.6),
      new THREE.Vector3(cx + 0.6, cy + 1.2, cz + 0.55),
    ]);

    const feedwaterReturn = new THREE.CatmullRomCurve3([
      new THREE.Vector3(cx - 1.2, cy + 0.2, cz - 0.65),
      new THREE.Vector3(cx - 2.7, cy + 0.7, cz - 0.85),
      new THREE.Vector3(sx - 1.8, sy - 1.3, sz - 0.85),
      new THREE.Vector3(sx - 0.8, sy - 1.9, sz - 0.8),
    ]);

    const coolingWarm = new THREE.CatmullRomCurve3([
      new THREE.Vector3(cx + 1.8, cy + 0.3, cz + 1.1),
      new THREE.Vector3(cx + 4.5, cy + 0.95, cz + 1.45),
      new THREE.Vector3(kx - 3.8, ky + 1.5, kz + 1.6),
      new THREE.Vector3(kx - 1.55, ky + 1.1, kz + 1.25),
    ]);

    const coolingCool = new THREE.CatmullRomCurve3([
      new THREE.Vector3(kx - 1.55, ky + 0.35, kz - 1.2),
      new THREE.Vector3(kx - 4.4, ky + 0.2, kz - 1.5),
      new THREE.Vector3(cx + 3.7, cy - 0.2, cz - 1.45),
      new THREE.Vector3(cx + 1.8, cy, cz - 1.05),
    ]);

    return {
      primaryHot,
      primaryReturn,
      steamToTurbine,
      exhaustToCondenser,
      feedwaterReturn,
      coolingWarm,
      coolingCool,
    };
  }, [layout]);

  const glow = isActive ? 0.85 : isHovered ? 0.55 : 0.26;

  return (
    <group
      onClick={(event) => {
        event.stopPropagation();
        onSelect('coolantLoop');
      }}
      onPointerEnter={(event) => {
        event.stopPropagation();
        onHover('coolantLoop');
      }}
      onPointerLeave={(event) => {
        event.stopPropagation();
        onHover(null);
      }}
    >
      <PipeSegment curve={curves.primaryHot} color="#dc2626" emissive="#ef4444" radius={0.18} glow={glow} />
      <PipeSegment curve={curves.primaryReturn} color="#b91c1c" emissive="#ef4444" radius={0.17} glow={glow * 0.9} />

      <PipeSegment curve={curves.steamToTurbine} color="#f8fafc" emissive="#e2e8f0" radius={0.16} glow={glow * 0.85} />
      <PipeSegment curve={curves.exhaustToCondenser} color="#f8fafc" emissive="#e2e8f0" radius={0.14} glow={glow * 0.82} />
      <PipeSegment curve={curves.feedwaterReturn} color="#e2e8f0" emissive="#cbd5e1" radius={0.13} glow={glow * 0.72} />

      <PipeSegment curve={curves.coolingWarm} color="#2563eb" emissive="#3b82f6" radius={0.17} glow={glow * 0.95} />
      <PipeSegment curve={curves.coolingCool} color="#1d4ed8" emissive="#3b82f6" radius={0.16} glow={glow * 0.85} />

      <FlowParticles
        curve={curves.primaryHot}
        color="#fb7185"
        count={18}
        size={0.07}
        speed={0.24 * flowSpeed}
        running={simulationRunning}
      />
      <FlowParticles
        curve={curves.primaryReturn}
        color="#f87171"
        count={14}
        size={0.065}
        speed={0.21 * flowSpeed}
        running={simulationRunning}
      />

      <FlowParticles
        curve={curves.steamToTurbine}
        color="#ffffff"
        count={18}
        size={0.07}
        speed={0.25 * flowSpeed}
        running={simulationRunning}
      />
      <FlowParticles
        curve={curves.exhaustToCondenser}
        color="#ffffff"
        count={13}
        size={0.065}
        speed={0.2 * flowSpeed}
        running={simulationRunning}
        opacity={0.82}
      />
      <FlowParticles
        curve={curves.feedwaterReturn}
        color="#60a5fa"
        count={13}
        size={0.06}
        speed={0.17 * flowSpeed}
        running={simulationRunning}
      />

      <FlowParticles
        curve={curves.coolingWarm}
        color="#60a5fa"
        count={16}
        size={0.07}
        speed={0.22 * flowSpeed}
        running={simulationRunning}
      />
      <FlowParticles
        curve={curves.coolingCool}
        color="#93c5fd"
        count={16}
        size={0.065}
        speed={0.2 * flowSpeed}
        running={simulationRunning}
      />
    </group>
  );
}
