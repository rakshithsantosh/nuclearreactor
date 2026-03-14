export const componentData = {
  core: {
    id: 'core',
    navLabel: 'Reactor Core',
    title: 'Reactor Core',
    description:
      'Fuel assemblies sustain controlled fission. Heat released in the core transfers into the primary coolant loop.',
    companies: ['Westinghouse', 'Framatome', 'BWX Technologies'],
  },
  controlRods: {
    id: 'controlRods',
    navLabel: 'Control Rods',
    title: 'Control Rod Drive',
    description:
      'Control rods absorb neutrons to regulate reactivity. Inserting them deeper reduces power and supports reactor shutdown.',
    companies: ['Framatome', 'Mitsubishi Heavy Industries', 'Rolls-Royce SMR'],
  },
  steamGenerator: {
    id: 'steamGenerator',
    navLabel: 'Steam Generator',
    title: 'Steam Generator',
    description:
      'Primary coolant transfers heat across thousands of tubes, producing steam in the isolated secondary loop.',
    companies: ['Babcock & Wilcox', 'Doosan Enerbility', 'Ansaldo Nucleare'],
  },
  turbine: {
    id: 'turbine',
    navLabel: 'Turbine',
    title: 'Steam Turbine',
    description:
      'High-pressure steam expands through blade stages, spinning the rotor and converting thermal energy into shaft power.',
    companies: ['GE Vernova', 'Siemens Energy', 'Mitsubishi Power'],
  },
  generator: {
    id: 'generator',
    navLabel: 'Generator',
    title: 'Electric Generator',
    description:
      'The turbine shaft drives an electromagnetic generator, producing grid-ready electrical output.',
    companies: ['GE Vernova', 'Siemens Energy', 'Hitachi Energy'],
  },
  condenser: {
    id: 'condenser',
    navLabel: 'Condenser',
    title: 'Surface Condenser',
    description:
      'Exhaust steam is condensed back into liquid water so feedwater can be pumped back to the steam generator.',
    companies: ['SPX Technologies', 'Kelvion', 'Alfa Laval'],
  },
  coolingTower: {
    id: 'coolingTower',
    navLabel: 'Cooling Tower',
    title: 'Cooling Tower',
    description:
      'Warm condenser water rejects heat through evaporative cooling and returns to the condenser as cooled water.',
    companies: ['Hamon', 'SPIG', 'Baltimore Aircoil'],
  },
  coolantLoop: {
    id: 'coolantLoop',
    navLabel: 'Coolant Loop',
    title: 'Primary + Secondary + Cooling Loops',
    description:
      'Three coupled loops move heat and water: primary coolant, secondary steam cycle, and condenser cooling water.',
    companies: ['KSB', 'Flowserve', 'Sulzer'],
  },
};

export const componentOrder = [
  'core',
  'controlRods',
  'steamGenerator',
  'turbine',
  'generator',
  'condenser',
  'coolingTower',
];

export const walkthroughStops = [
  { id: 'overview', label: '1. Overview', target: null },
  { id: 'coreZoom', label: '2. Core Zoom', target: 'core' },
  { id: 'coolantFocus', label: '3. Coolant Loop', target: 'coolantLoop' },
  { id: 'turbineHall', label: '4. Turbine Hall', target: 'turbine' },
  { id: 'towerView', label: '5. Cooling Tower', target: 'coolingTower' },
];

export const cameraPresets = {
  overview: {
    position: [7, 16, 34],
    target: [3, 4.2, 0],
  },
  core: {
    position: [-8.6, 6.2, 8.3],
    target: [-12.2, 3.4, 0],
  },
  controlRods: {
    position: [-12, 11.7, 7.2],
    target: [-12, 6.8, 0],
  },
  steamGenerator: {
    position: [-1.4, 6.4, 9],
    target: [-4.8, 3.2, 0],
  },
  turbine: {
    position: [7.3, 7.2, 8.5],
    target: [2.2, 4.9, 0],
  },
  generator: {
    position: [11.2, 7.1, 8.3],
    target: [6.8, 4.9, 0],
  },
  condenser: {
    position: [7.6, 4.3, 9.4],
    target: [2.4, 1.9, 0],
  },
  coolingTower: {
    position: [20.2, 8.5, 12.8],
    target: [13.8, 6.2, 0],
  },
  coolantLoop: {
    position: [1.6, 7.8, 15.5],
    target: [-1.5, 3.8, 0],
  },
  coreZoom: {
    position: [-9.2, 6, 6.4],
    target: [-12.2, 3.5, 0],
  },
  coolantFocus: {
    position: [1.2, 9.4, 16.2],
    target: [-1.4, 3.4, 0],
  },
  turbineHall: {
    position: [10.8, 6.7, 11.2],
    target: [4.4, 4, 0],
  },
  towerView: {
    position: [21.4, 8.2, 9],
    target: [14.3, 5.8, 0],
  },
};
