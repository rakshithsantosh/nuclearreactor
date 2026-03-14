# Reactor 3D Plant Simulator

Production-style interactive 3D engineering visualization of a simplified nuclear power plant flow path:

`Reactor Vessel -> Steam Generator -> Turbine -> Electric Generator -> Condenser -> Cooling Tower`

All geometry is procedural (Three.js primitives only). No external 3D assets are used.

## Stack

- Vite + React
- Three.js + React Three Fiber
- @react-three/drei
- GSAP
- TailwindCSS

## Features

- Interactive major systems with click-to-focus camera and contextual info panel
- Guided camera walkthrough (overview, core zoom, coolant loop focus, turbine hall, cooling tower view)
- Three animated flow loops:
  - Primary loop (red): reactor coolant
  - Secondary loop (white): steam cycle
  - Cooling loop (blue): cooling tower water
- Particle flow through TubeGeometry pipe paths
- Reactor core emissive pulse animation + control rod insertion animation
- Turbine rotation with speed response to simulation flow
- Generator electrical pulse arcs toward transmission lines
- Condenser with steam-to-water visual transition
- Hyperboloid cooling tower (LatheGeometry) with falling droplets + rising mist
- Hover highlights, exploded view toggle, flow speed control, pause/resume simulation

## Run Locally

```bash
npm install
npm run dev
```

Open the local Vite URL (typically `http://localhost:5173`).

## Core Files

- `src/App.jsx`
- `src/components/ReactorScene.jsx`
- `src/components/ReactorModel.jsx`
- `src/components/ReactorCore.jsx`
- `src/components/ControlRods.jsx`
- `src/components/CoolantLoop.jsx`
- `src/components/SteamGenerator.jsx`
- `src/components/Turbine.jsx`
- `src/components/GeneratorUnit.jsx`
- `src/components/Condenser.jsx`
- `src/components/CoolingTower.jsx`
- `src/components/FlowParticles.jsx`
- `src/components/InfoPanel.jsx`
- `src/data/reactorData.js`
