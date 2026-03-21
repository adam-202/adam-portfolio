import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Add type definitions for Three.js elements in JSX to fix TypeScript errors
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      torusGeometry: any;
      torusKnotGeometry: any;
      meshStandardMaterial: any;
      cylinderGeometry: any;
      coneGeometry: any;
      boxGeometry: any;
      ambientLight: any;
      pointLight: any;
      spotLight: any;
      sphereGeometry: any;
    }
  }
}

// Also augment React.JSX for newer TypeScript/React versions to ensure compatibility
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      torusGeometry: any;
      torusKnotGeometry: any;
      meshStandardMaterial: any;
      cylinderGeometry: any;
      coneGeometry: any;
      boxGeometry: any;
      ambientLight: any;
      pointLight: any;
      spotLight: any;
      sphereGeometry: any;
    }
  }
}

const Impeller: React.FC<{ wireframe: boolean }> = ({ wireframe }) => {
  const blades = useMemo(() => {
    const bladeCount = 14;
    return new Array(bladeCount).fill(0).map((_, i) => {
      const angle = (i / bladeCount) * Math.PI * 2;
      return (
        <group key={i} rotation={[0, 0, angle]}>
          {/* Angled blade for distinct fan look */}
          <mesh position={[0, 0.42, 0.05]} rotation={[0.5, 0.1, 0]}>
            <boxGeometry args={[0.03, 0.85, 0.18]} />
            <meshStandardMaterial 
              color="#ffffff" 
              wireframe={wireframe}
              metalness={0.8} 
              roughness={0.1} 
              emissive={wireframe ? "#ffffff" : "#e2e8f0"}
              emissiveIntensity={wireframe ? 0.8 : 0.2}
            />
          </mesh>
        </group>
      );
    });
  }, [wireframe]);

  return (
    <group>
      {blades}
      {/* Aerodynamic Nose Cone */}
      <mesh position={[0, 0, 0.15]} rotation={[Math.PI/2, 0, 0]}>
        <coneGeometry args={[0.18, 0.5, 32]} />
        <meshStandardMaterial 
          color="#ffffff" 
          wireframe={wireframe}
          metalness={0.9} 
          roughness={0.1}
          emissive={wireframe ? "#ffffff" : "#e2e8f0"}
          emissiveIntensity={wireframe ? 0.8 : 0.2}
        />
      </mesh>
    </group>
  );
};

// Reusable Bolt Ring Component for realism
const BoltRing: React.FC<{ count: number; radius: number; position: [number, number, number]; rotation?: [number, number, number]; color: string; wireframe: boolean }> = ({ count, radius, position, rotation = [0, 0, 0], color, wireframe }) => {
  const bolts = useMemo(() => {
    return new Array(count).fill(0).map((_, i) => {
      const angle = (i / count) * Math.PI * 2;
      return (
        <mesh key={i} position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]} rotation={[Math.PI/2, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.15, 6]} />
          <meshStandardMaterial color={color} wireframe={wireframe} metalness={0.8} roughness={0.3} />
        </mesh>
      );
    });
  }, [count, radius, color, wireframe]);
  return <group position={position} rotation={rotation}>{bolts}</group>;
};

const TurbochargerOnly: React.FC<{ wireframe: boolean }> = ({ wireframe }) => {
  const impellerRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (impellerRef.current) {
      // Slower, clearer rotation to avoid strobing
      impellerRef.current.rotation.z -= delta * 12; 
    }
  });

  // Brighter Materials for better visibility
  const coldMaterial = {
    color: wireframe ? "#38bdf8" : "#2563eb", // Vibrant Blue
    emissive: wireframe ? "#38bdf8" : "#1e3a8a", // Blue glow
    emissiveIntensity: wireframe ? 1 : 0.4,
    wireframe: wireframe,
    metalness: 0.6, 
    roughness: 0.2,
    side: THREE.DoubleSide
  };

  const hotMaterial = {
    color: wireframe ? "#f87171" : "#ef4444", // Vibrant Red
    emissive: wireframe ? "#f87171" : "#7f1d1d", // Red glow
    emissiveIntensity: wireframe ? 1 : 0.4,
    wireframe: wireframe,
    metalness: 0.6,
    roughness: 0.3
  };

  const centerMaterial = {
    color: "#94a3b8", // Light Slate
    metalness: 0.7,
    roughness: 0.4,
    wireframe: wireframe
  };

  const metalDetailMaterial = {
    color: "#cbd5e1",
    metalness: 0.9,
    roughness: 0.2,
    wireframe: wireframe
  };

  return (
    // Orientation: Intake facing towards camera
    <group rotation={[0.2, -Math.PI / 1.4, 0]}>
      
      {/* Scale up slightly for presence */}
      <group position={[0, 0, 0]} scale={[1.4, 1.4, 1.4]}>
        
        {/* --- COMPRESSOR (Cold Side / Blue) --- */}
        <group rotation={[0, Math.PI/2, 0]}>
          {/* Main Volute */}
          <mesh rotation={[0, 0, 0.5]}>
            <torusGeometry args={[1.2, 0.55, 16, 50, 4.8]} />
            <meshStandardMaterial {...coldMaterial} />
          </mesh>
          
          {/* Backplate */}
          <mesh position={[0, 0, -0.3]} rotation={[0, 0, 0]}>
            <cylinderGeometry args={[1.0, 1.0, 0.1, 32]} />
            <meshStandardMaterial {...coldMaterial} />
          </mesh>

          {/* Bolt Ring connecting Compressor to Center */}
          <BoltRing count={8} radius={0.8} position={[0, 0, -0.4]} rotation={[0, 0, 0]} color="#cbd5e1" wireframe={wireframe} />

          {/* Discharge Pipe */}
          <mesh position={[1.2, 1.2, 0]} rotation={[0, 0, Math.PI/4]}>
            <cylinderGeometry args={[0.4, 0.4, 1.5, 16]} />
            <meshStandardMaterial {...coldMaterial} />
          </mesh>
          {/* Discharge Flange Detail */}
          <mesh position={[1.8, 1.8, 0]} rotation={[0, 0, Math.PI/4]}>
            <boxGeometry args={[1.0, 0.1, 1.0]} />
            <meshStandardMaterial {...coldMaterial} />
          </mesh>
          
          {/* Intake Inlet Housing (Open) */}
          <mesh rotation={[Math.PI/2, 0, 0]}>
             <cylinderGeometry args={[1.0, 0.9, 1.2, 32, 1, true]} />
             <meshStandardMaterial {...coldMaterial} />
          </mesh>

          {/* Intake Lip Ring */}
          <mesh position={[0, 0, 0.6]} rotation={[Math.PI/2, 0, 0]}>
             <torusGeometry args={[1.0, 0.08, 16, 32]} />
             <meshStandardMaterial {...coldMaterial} />
          </mesh>
        </group>

        {/* --- IMPELLER (White Fan) --- */}
        <group position={[0, 0, 0]} rotation={[0, Math.PI/2, 0]}>
          <group ref={impellerRef}>
            <Impeller wireframe={wireframe} />
          </group>
        </group>

        {/* --- CHRA (Center Housing & Hub) --- */}
        <group position={[0.8, 0, 0]} rotation={[0, 0, Math.PI/2]}>
          {/* Main Cylinder */}
          <mesh>
             <cylinderGeometry args={[0.35, 0.35, 1.6, 16]} />
             <meshStandardMaterial {...centerMaterial} />
          </mesh>
          {/* Center Hub Reinforcements */}
          <mesh position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.45, 0.45, 0.2, 16]} />
            <meshStandardMaterial {...centerMaterial} />
          </mesh>
           <mesh position={[0, -0.4, 0]}>
            <cylinderGeometry args={[0.45, 0.45, 0.2, 16]} />
            <meshStandardMaterial {...centerMaterial} />
          </mesh>
        </group>

        {/* --- Oil & Coolant Lines (Realism) --- */}
        <group position={[0.8, 0, 0]}>
           {/* Oil Feed (Top) */}
           <mesh position={[0, 0.45, 0]}>
              <boxGeometry args={[0.3, 0.3, 0.3]} />
              <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.2} wireframe={wireframe} />
           </mesh>
           <mesh position={[0, 0.7, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 0.5, 8]} />
              <meshStandardMaterial color="#e2e8f0" metalness={0.8} wireframe={wireframe} />
           </mesh>
           
           {/* Oil Drain (Bottom) */}
           <mesh position={[0, -0.5, 0]}>
              <cylinderGeometry args={[0.12, 0.12, 0.6, 8]} />
              <meshStandardMaterial color="#64748b" metalness={0.5} wireframe={wireframe} />
           </mesh>
        </group>

        {/* --- WASTEGATE ACTUATOR (Realism) --- */}
        <group position={[0.6, 1.3, -0.8]} rotation={[0, 0, 0.2]}>
          {/* Canister */}
          <mesh>
            <cylinderGeometry args={[0.25, 0.25, 0.5, 16]} />
            <meshStandardMaterial {...metalDetailMaterial} color="#94a3b8" />
          </mesh>
          {/* Actuator Rod connecting to Turbine */}
          <mesh position={[0.6, 0, 0]} rotation={[0, 0, -Math.PI/2]}>
             <cylinderGeometry args={[0.04, 0.04, 1.2, 8]} />
             <meshStandardMaterial {...metalDetailMaterial} />
          </mesh>
          {/* Bracket */}
          <mesh position={[-0.2, -0.3, 0]} rotation={[0, 0, 0.5]}>
             <boxGeometry args={[0.1, 0.6, 0.2]} />
             <meshStandardMaterial {...centerMaterial} />
          </mesh>
        </group>

        {/* --- TURBINE (Hot Side / Red) --- */}
        <group position={[1.9, 0, 0]} rotation={[0, Math.PI/2, 0]}>
           {/* Bolt Ring connecting Turbine to Center */}
           <BoltRing count={8} radius={0.7} position={[0, 0, 0.4]} rotation={[0, 0, 0]} color="#7f1d1d" wireframe={wireframe} />

           {/* Main Housing */}
           <mesh rotation={[0, 0, 2]}>
             <torusGeometry args={[1.1, 0.6, 16, 40, 4.8]} />
             <meshStandardMaterial {...hotMaterial} /> 
           </mesh>
           
           {/* Exhaust Inlet Flange (Square) */}
           <mesh position={[-0.8, -1.2, 0]} rotation={[0, 0, 0.5]}>
             <boxGeometry args={[1.2, 0.2, 1.2]} />
             <meshStandardMaterial {...hotMaterial} />
           </mesh>

           {/* Exhaust Outlet Pipe */}
           <mesh position={[0.9, 0.9, 0]} rotation={[0, 0, Math.PI/4]}>
             <cylinderGeometry args={[0.45, 0.45, 1.2, 16]} />
             <meshStandardMaterial {...hotMaterial} />
           </mesh>
        </group>

      </group>

    </group>
  );
};

const Hero3D: React.FC = () => {
  // Set DEFAULT to TRUE as requested
  const [wireframe, setWireframe] = useState(true);

  return (
    <div className="relative w-full h-[450px] lg:h-[600px] border-y border-cyan-900/50 bg-midnight/50 overflow-hidden">
      {/* Controls Overlay */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <button
          onClick={() => setWireframe(!wireframe)}
          className={`px-4 py-1 text-sm font-mono tracking-wider border transition-all duration-300 ${
            wireframe 
              ? 'border-blueprint text-blueprint bg-blueprint/10 shadow-glow' 
              : 'border-slate-700 text-slate-400 hover:border-blueprint hover:text-blueprint'
          } clip-angle`}
        >
          {wireframe ? 'WIREFRAME: ON' : 'WIREFRAME: OFF'}
        </button>
      </div>

      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 7]} />
        
        {/* Ambient Light - Increased for visibility */}
        <ambientLight intensity={1.5} />
        
        {/* Lighting Setup for Metallic Shine */}
        <pointLight position={[10, 10, 10]} intensity={3.0} color="#ffffff" />
        <pointLight position={[-8, 6, 8]} intensity={2.5} color="#60a5fa" /> {/* Cool fill */}
        <pointLight position={[8, -6, -8]} intensity={2.5} color="#f87171" /> {/* Warm rim */}
        
        {/* Spotlight Highlight for Impeller */}
        <spotLight 
          position={[-2, 2, 8]} 
          angle={0.4} 
          penumbra={0.5} 
          intensity={5} 
          color="#ffffff" 
        />
        
        <TurbochargerOnly wireframe={wireframe} />
        
        <OrbitControls enableZoom={false} autoRotate={true} autoRotateSpeed={1.5} />
      </Canvas>
      
      {/* Decorative Grid Lines */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blueprint to-transparent opacity-50" />
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-blueprint/20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-blueprint/20 pointer-events-none" />
    </div>
  );
};

export default Hero3D;