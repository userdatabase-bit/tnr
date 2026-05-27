import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Center, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function PalletModel() {
  const { scene } = useGLTF('/models/wooden_pallet.glb');
  const groupRef = useRef<THREE.Group>(null);

  // This isolates the model completely so the GSAP scroll animation cannot break it apart
  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        // Re-aligns any loose boards back to center
        if (child.position.length() > 3) {
          child.position.set(0, 0, 0);
        }
      }
    });
    return clone;
  }, [scene]);

  useFrame((state) => {
    if (groupRef.current) {
      // Slow rotation loop
      groupRef.current.rotation.y += 0.005;

      // Gentle floating loop
      const time = state.clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(time * 1.5) * 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} scale={[1.8, 1.8, 1.8]} />
    </group>
  );
}

export const WoodenPallet3D: React.FC<{ size?: number }> = () => {
  return (
    <div className="w-full h-[350px] sm:h-[450px] md:h-[500px] cursor-grab active:cursor-grabbing relative z-10 select-none">
      <Canvas
        camera={{ position: [2.5, 2, 3], fov: 42 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.2;
        }}
      >
        <ambientLight intensity={0.75} />
        <directionalLight position={[8, 12, 6]} intensity={1.4} castShadow />
        <directionalLight position={[-6, 4, -4]} intensity={0.4} />
        <pointLight position={[0, -2, 2]} intensity={0.5} />

        <Center>
          <PalletModel />
        </Center>

        <ContactShadows 
          position={[0, -0.85, 0]} 
          opacity={0.35} 
          scale={4.5} 
          blur={2.2} 
          far={2.5} 
        />

        <OrbitControls 
          enableZoom={false}
          maxPolarAngle={Math.PI / 2.1} 
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
};

useGLTF.preload('/models/wooden_pallet.glb');
export default WoodenPallet3D;