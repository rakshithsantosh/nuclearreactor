import ReactorCore from './ReactorCore';
import ControlRods from './ControlRods';
import SteamGenerator from './SteamGenerator';
import Turbine from './Turbine';
import GeneratorUnit from './GeneratorUnit';
import Condenser from './Condenser';
import CoolingTower from './CoolingTower';
import CoolantLoop from './CoolantLoop';
import Containment from './Containment';

export default function ReactorModel({
  selectedId,
  hoveredId,
  onSelect,
  onHover,
  exploded,
  simulationRunning,
  flowSpeed,
}) {
  const explode = exploded ? 1 : 0;

  const layout = {
    reactor: [-12 - 0.8 * explode, 3, 0],
    steamGenerator: [-5 + 1.6 * explode, 3 + 0.35 * explode, 0],
    turbine: [2.3 + 2.2 * explode, 4.9 + 0.3 * explode, 0],
    generator: [6.8 + 3.4 * explode, 4.9 + 0.3 * explode, 0],
    condenser: [2.3 + 1.6 * explode, 1.5 - 0.2 * explode, 0],
    coolingTower: [13.6 + 3.6 * explode, 0, 0],
    containment: [-8.3 + 0.7 * explode, 7.3 + 0.5 * explode, 0],
  };

  return (
    <group>
      <Containment position={layout.containment} />

      <ReactorCore
        position={layout.reactor}
        isActive={selectedId === 'core'}
        isHovered={hoveredId === 'core'}
        onSelect={onSelect}
        onHover={onHover}
        simulationRunning={simulationRunning}
        flowSpeed={flowSpeed}
      />

      <ControlRods
        position={layout.reactor}
        isActive={selectedId === 'controlRods'}
        isHovered={hoveredId === 'controlRods'}
        onSelect={onSelect}
        onHover={onHover}
      />

      <SteamGenerator
        position={layout.steamGenerator}
        isActive={selectedId === 'steamGenerator'}
        isHovered={hoveredId === 'steamGenerator'}
        onSelect={onSelect}
        onHover={onHover}
        simulationRunning={simulationRunning}
      />

      <Turbine
        position={layout.turbine}
        isActive={selectedId === 'turbine'}
        isHovered={hoveredId === 'turbine'}
        onSelect={onSelect}
        onHover={onHover}
        simulationRunning={simulationRunning}
        steamPower={flowSpeed}
      />

      <GeneratorUnit
        position={layout.generator}
        isActive={selectedId === 'generator'}
        isHovered={hoveredId === 'generator'}
        onSelect={onSelect}
        onHover={onHover}
        simulationRunning={simulationRunning}
        powerLevel={flowSpeed}
      />

      <Condenser
        position={layout.condenser}
        isActive={selectedId === 'condenser'}
        isHovered={hoveredId === 'condenser'}
        onSelect={onSelect}
        onHover={onHover}
        simulationRunning={simulationRunning}
        flowSpeed={flowSpeed}
      />

      <CoolingTower
        position={layout.coolingTower}
        isActive={selectedId === 'coolingTower'}
        isHovered={hoveredId === 'coolingTower'}
        onSelect={onSelect}
        onHover={onHover}
        simulationRunning={simulationRunning}
        flowSpeed={flowSpeed}
      />

      <CoolantLoop
        layout={layout}
        isActive={selectedId === 'coolantLoop'}
        isHovered={hoveredId === 'coolantLoop'}
        onSelect={onSelect}
        onHover={onHover}
        simulationRunning={simulationRunning}
        flowSpeed={flowSpeed}
      />
    </group>
  );
}
