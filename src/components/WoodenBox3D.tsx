import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Center, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function BoxModel({ activeScale }: { activeScale: number }) {
  const { scene } = useGLTF('/models/wooden_box.glb'); 
  const groupRef = useRef<THREE.Group>(null);

  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        
        if (child.material) {
          const mat = child.material as THREE.MeshStandardMaterial;
          if (mat.map) {
            mat.map.colorSpace = THREE.SRGBColorSpace;
            mat.map.needsUpdate = true;
          }
          mat.color = new THREE.Color('#ffffff');
          mat.roughness = 0.75;
          mat.metalness = 0.1;
          mat.needsUpdate = true;
        }
      }
    });
    return clone;
  }, [scene]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
      const time = state.clock.elapsedTime;
      groupRef.current.position.y = Math.sin(time * 1.1) * 0.06;
    }
  });

  const finalScale = 1.6 * activeScale;

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} scale={[finalScale, finalScale, finalScale]} />
    </group>
  );
}

export const WoodenBox3D: React.FC<{ activeScale: number }> = ({ activeScale }) => {
  return (
    <div className="w-full h-[350px] sm:h-[450px] md:h-[500px] cursor-grab active:cursor-grabbing relative z-10 select-none">
      <Canvas
        camera={{ position: [3.5, 3, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.3;
        }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[10, 15, 8]} intensity={1.6} castShadow />
        <directionalLight position={[-8, 6, -6]} intensity={0.4} />
        <pointLight position={[0, -2, 3]} intensity={0.5} />

        <Center>
          <BoxModel activeScale={activeScale} />
        </Center>

        <ContactShadows 
          position={[0, -0.9, 0]} 
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

useGLTF.preload('/models/wooden_box.glb');
export default WoodenBox3D;