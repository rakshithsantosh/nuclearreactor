import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import ReactorModel from './ReactorModel';
import Hotspots from './Hotspots';
import FlowParticles from './FlowParticles';
import { SUPPLY_DATA } from '../data/supplyData';

function SceneContent({ 
  selectedId, onSelect, onHover, view, flowAnimation, explodeView, activeLayers 
}) {
  const { gl, camera, scene } = useThree();
  const controlsRef = useRef();

  // Enable clipping for cross-section
  useEffect(() => {
    gl.localClippingEnabled = true;
  }, [gl]);

  const clippingPlane = useMemo(() => {
    return view === 'cross' 
      ? new THREE.Plane(new THREE.Vector3(0, 0, 1), 0) 
      : new THREE.Plane(new THREE.Vector3(0, 0, 1), 1000);
  }, [view]);

  // Handle Explode Animation logic (GSAP)
  useEffect(() => {
    // In a real app, we'd find the meshes and tween their positions.
    // For this prototype, the "exploded" state is passed down to components.
  }, [explodeView]);

  return (
    <>
      <color attach="background" args={['#0d1117']} />
      <fog attach="fog" args={['#0d1117', 20, 100]} />
      
      <Environment preset="city" />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#58a6ff" />
      <spotLight position={[-10, 20, 10]} angle={0.2} penumbra={1} intensity={2} castShadow />

      <ReactorModel 
        selectedId={selectedId} 
        onSelect={onSelect}
        explode={explodeView}
        clippingPlane={clippingPlane}
        activeLayers={activeLayers}
      />

      <Hotspots 
        selectedId={selectedId} 
        onSelect={onSelect} 
        onHover={onHover}
        activeLayers={activeLayers}
      />

      {flowAnimation && (
        <FlowParticles activeLayers={activeLayers} />
      )}

      <OrbitControls 
        ref={controlsRef}
        enableDamping
        dampingFactor={0.05}
        autoRotate={!selectedId}
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.8}
        minDistance={5}
        maxDistance={50}
      />
      
      <ContactShadows 
        position={[0, -2, 0]} 
        opacity={0.4} 
        scale={40} 
        blur={2} 
        far={4.5} 
      />
    </>
  );
}

export default function ReactorScene(props) {
  return (
    <div className="w-full h-full cursor-crosshair">
      <Canvas 
        shadows 
        camera={{ position: [-15, 12, 20], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <SceneContent {...props} />
      </Canvas>
    </div>
  );
}
