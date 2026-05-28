import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Center, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function BoxModel({ activeScale }: { activeScale: number }) {
  const { scene } = useGLTF('/models/corrugated_box.glb'); 
  const groupRef = useRef<THREE.Group>(null);

  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        
        // FIX: Extract and repair the embedded texture map
        if (child.material) {
          const mat = child.material as THREE.MeshStandardMaterial;
          
          // Force Three.js to read the hidden color map texture accurately
          if (mat.map) {
            mat.map.colorSpace = THREE.SRGBColorSpace; // Makes colors vibrant instead of dull/gray
            mat.map.needsUpdate = true;
          }

          // Reset ambient overrides so the box updates with real lighting calculations
          mat.color = new THREE.Color('#ffffff'); // Set base tint to white so the cardboard texture shows perfectly
          mat.roughness = 0.85;                  // Clean, matte paper texture finish
          mat.metalness = 0.0;                   // Ensure no metallic reflection
          mat.needsUpdate = true;
        }
      }
    });
    return clone;
  }, [scene]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.004;
      const time = state.clock.elapsedTime;
      groupRef.current.position.y = Math.sin(time * 1.3) * 0.08;
    }
  });

  const finalScale = 3.5 * activeScale;

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} scale={[finalScale, finalScale, finalScale]} />
    </group>
  );
}

export const CorrugatedBox3D: React.FC<{ activeScale: number }> = ({ activeScale }) => {
  return (
    <div className="w-full h-[350px] sm:h-[450px] md:h-[500px] cursor-grab active:cursor-grabbing relative z-10 select-none">
      <Canvas
        camera={{ position: [4, 3, 5], fov: 45 }}
        gl={{ 
          antialias: true, 
          alpha: true, 
          powerPreference: "high-performance" 
        }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.5; // Slightly boosted exposure to brighten the cardboard textures
        }}
      >
        {/* Natural daylight style lighting setup */}
        <ambientLight intensity={1.0} /> 
        <directionalLight position={[10, 15, 8]} intensity={1.8} castShadow />
        <directionalLight position={[-8, 6, -6]} intensity={0.6} />
        <pointLight position={[0, -2, 3]} intensity={0.5} />

        <Center>
          <BoxModel activeScale={activeScale} />
        </Center>

        <ContactShadows 
          position={[0, -1.0, 0]} 
          opacity={0.35} 
          scale={5 * activeScale} 
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

useGLTF.preload('/models/corrugated_box.glb');
export default CorrugatedBox3D;