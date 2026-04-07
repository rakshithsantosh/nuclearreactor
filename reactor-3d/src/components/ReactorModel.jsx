import React, { useMemo } from 'react';
import ReactorCore from './ReactorCore';
import SteamGenerator from './SteamGenerator';
import Turbine from './Turbine';
import CoolantLoop from './CoolantLoop';
import ControlRods from './ControlRods';
import * as THREE from 'three';

export default function ReactorModel({ 
  selectedId, onSelect, explode, clippingPlane, activeLayers 
}) {
  const explodeFactor = explode ? 1 : 0;

  const layout = useMemo(() => ({
    core: [0, 0, 0],
    primary: [-4 - 2 * explodeFactor, 0, 0],
    steam: [4 + 2 * explodeFactor, 0, 0],
    turbine: [12 + 6 * explodeFactor, 0, 0],
    fuel_ic: [0, 6 + 3 * explodeFactor, 0],
  }), [explodeFactor]);

  return (
    <group>
      {activeLayers.includes('core') && (
        <ReactorCore 
          position={layout.core} 
          selected={selectedId === 'core'} 
          clippingPlane={clippingPlane}
        />
      )}
      
      {activeLayers.includes('primary') && (
        <CoolantLoop 
          position={layout.primary} 
          selected={selectedId === 'primary'} 
          clippingPlane={clippingPlane}
        />
      )}

      {activeLayers.includes('steam') && (
        <SteamGenerator 
          position={layout.steam} 
          selected={selectedId === 'steam'} 
          clippingPlane={clippingPlane}
        />
      )}

      {activeLayers.includes('turbine') && (
        <Turbine 
          position={layout.turbine} 
          selected={selectedId === 'turbine'} 
          clippingPlane={clippingPlane}
        />
      )}

      {activeLayers.includes('fuel_ic') && (
        <ControlRods 
          position={layout.fuel_ic} 
          selected={selectedId === 'fuel_ic'} 
          clippingPlane={clippingPlane}
        />
      )}
    </group>
  );
}
