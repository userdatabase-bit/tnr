import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Center, ContactShadows } from '@react-three/drei';
import { ArrowRight } from 'lucide-react';
import * as THREE from 'three';
import { gsap } from '../hooks/useScrollAnimation';
import { useParallax, useParallaxDrift } from '../hooks/useScrollAnimation';

// ── FIXED INDUSTRIAL 3D MODEL COMPONENT ─────────────────────────────────────
function SafeBoxModel({ activeScale }: { activeScale: number }) {
  const [loadError, setLoadError] = useState(false);
  let modelResult: any = null;

  try {
    modelResult = useGLTF('/models/wooden_box.glb');
  } catch (error) {
    if (!loadError) setLoadError(true);
  }

  const groupRef = useRef<THREE.Group>(null);

  const processedScene = useMemo(() => {
    if (!modelResult || !modelResult.scene || loadError) return null;
    try {
      const clone = modelResult.scene.clone();
      clone.traverse((child: any) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.material) {
            const mat = child.material as THREE.MeshStandardMaterial;
            mat.color = new THREE.Color('#ffffff');
            mat.roughness = 0.75;
            mat.metalness = 0.1;
          }
        }
      });
      return clone;
    } catch (e) {
      setLoadError(true);
      return null;
    }
  }, [modelResult, loadError]);

  useFrame((state) => {
    if (groupRef.current) {
      // Rotation happens directly on the inner centered model anchor
      groupRef.current.rotation.y += 0.003;
      const time = state.clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(time * 1.1) * 0.04;
    }
  });

  // Balanced target multiplier scale for the new model
  const finalScale = 0.035 * activeScale;

  if (loadError || !processedScene) {
    return (
      <group ref={groupRef} scale={[finalScale * 35, finalScale * 35, finalScale * 35]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial color="#b37d4e" roughness={0.85} metalness={0.05} />
        </mesh>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.53, 0.18, 1.53]} />
          <meshStandardMaterial color="#2d221a" roughness={0.6} metalness={0.7} />
        </mesh>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.53, 1.53, 0.18]} />
          <meshStandardMaterial color="#2d221a" roughness={0.6} metalness={0.7} />
        </mesh>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.18, 1.53, 1.53]} />
          <meshStandardMaterial color="#2d221a" roughness={0.6} metalness={0.7} />
        </mesh>
        <mesh>
          <boxGeometry args={[1.51, 1.51, 1.51]} />
          <meshStandardMaterial color="#1f150f" wireframe />
        </mesh>
      </group>
    );
  }

  return (
    <group ref={groupRef}>
      {/* Center component calculates model boundaries and drops the anchor dead-center */}
      <Center>
        <primitive object={processedScene} scale={[finalScale, finalScale, finalScale]} />
      </Center>
    </group>
  );
}

const woodenSizes = [
  { id: 'small',  label: 'S',  name: 'Small',       scale: 0.75, labelText: '140mm Cube Equivalent' },
  { id: 'medium', label: 'M',  name: 'Medium',      scale: 1.0,  labelText: '200mm Cube Equivalent' },
  { id: 'large',  label: 'L',  name: 'Large',       scale: 1.25, labelText: '250mm Cube Equivalent' },
  { id: 'xlarge', label: 'XL', name: 'Extra Large', scale: 1.5,  labelText: '300mm Cube Equivalent' },
];

const products = [
  { id: 'WB001', desc: 'Transport up to 1 tonne', icon: '📦' },
  { id: 'WB002', desc: 'Clip Box — Easy assembly', icon: '🔧' },
  { id: 'WB003', desc: 'Watertight with lid', icon: '💧' },
];

export default function WoodenBoxes() {
  const [activeSize, setActiveSize] = useState<string>('medium');
  const sectionRef = useRef<HTMLDivElement>(null);
  const glowRef = useParallax(0.15);
  const driftRef = useParallaxDrift(-0.15, 0.1);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.wooden-text',
        { y: 80, opacity: 0 },
        {
          y: -40,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            end: 'center center',
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="wooden" ref={sectionRef} className="relative py-24 md:py-40 bg-offwhite overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #1B2A5E 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />
      <div ref={driftRef} className="absolute top-20 right-10 w-32 h-32 border-2 border-orange/10 rounded-full hidden lg:block" />
      <div ref={glowRef} className="absolute -bottom-20 -left-20 w-64 h-64 bg-orange/[0.04] rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="relative">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6">
              {woodenSizes.map((bs) => (
                <button
                  key={bs.id}
                  onClick={() => setActiveSize(bs.id)}
                  className={`relative flex flex-col items-center gap-0.5 sm:gap-1 px-2.5 sm:px-4 py-2 sm:py-3 rounded-xl font-heading font-bold text-sm transition-all duration-300 cursor-pointer select-none ${
                    activeSize === bs.id
                      ? 'bg-navy text-white shadow-lg shadow-navy/20 scale-105'
                      : 'bg-offwhite text-navy/60 border border-navy/10 hover:border-orange/30 hover:text-navy hover:bg-white'
                  }`}
                >
                  <span className="text-base sm:text-lg leading-none">{bs.label}</span>
                  <span className="text-[9px] sm:text-[10px] font-medium tracking-wide normal-case hidden sm:inline">{bs.name}</span>
                  {activeSize === bs.id && (
                    <motion.div
                      layoutId="woodenSizeIndicator"
                      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-orange rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeSize}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="text-center mb-6"
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-kraft/10 border border-kraft/20 rounded-full">
                  <span className="font-heading font-bold text-navy text-xs">{woodenSizes.find(b => b.id === activeSize)?.name}</span>
                  <span className="w-px h-3 bg-navy/20" />
                  <span className="font-body text-grey-dark text-xs">{woodenSizes.find(b => b.id === activeSize)?.labelText}</span>
                </span>
              </motion.div>
            </AnimatePresence>

            <div className="relative w-full h-[350px] sm:h-[450px] md:h-[500px] cursor-grab active:cursor-grabbing z-10 select-none flex items-center justify-center">
              {/* Camera pulled back significantly further to match large models */}
              <Canvas
                camera={{ position: [7, 6, 8], fov: 45 }}
                gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
                onCreated={({ gl }) => {
                  gl.toneMapping = THREE.ACESFilmicToneMapping;
                  gl.toneMappingExposure = 1.2;
                }}
              >
                <ambientLight intensity={0.8} />
                <directionalLight position={[10, 12, 8]} intensity={1.5} castShadow />
                <directionalLight position={[-8, 5, -6]} intensity={0.3} />

                <SafeBoxModel activeScale={woodenSizes.find(s => s.id === activeSize)?.scale ?? 1.0} />

                <ContactShadows 
                  position={[0, -1.1, 0]} 
                  opacity={0.3} 
                  scale={5.0 * (woodenSizes.find(s => s.id === activeSize)?.scale ?? 1.0)} 
                  blur={2.0} 
                  far={3.0} 
                />

                <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2.1} minPolarAngle={Math.PI / 4} />
              </Canvas>

              <div className="absolute w-80 h-80 sm:w-96 sm:h-96 bg-orange/5 rounded-full blur-3xl -z-10" />
              <div className="absolute w-48 h-48 bg-navy/5 rounded-full blur-2xl top-10 -left-10 -z-10" />
            </div>
          </div>

          <div className="wooden-text">
            <span className="inline-block px-4 py-1.5 bg-orange/10 text-orange font-heading font-bold text-xs tracking-[0.2em] rounded-full mb-6">
              WOODEN PACKAGING
            </span>

            <h2 className="font-heading font-black text-navy text-4xl sm:text-5xl lg:text-6xl leading-tight mb-8">
              Reusable <span className="text-orange">Industrial</span> Strength
            </h2>

            <div className="space-y-4 mb-8">
              {products.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/60 border border-navy/5 hover:border-orange/20 hover:shadow-lg transition-all group"
                >
                  <span className="text-2xl mt-0.5">{product.icon}</span>
                  <div>
                    <span className="font-heading font-bold text-navy text-sm">{product.id}</span>
                    <p className="font-body text-grey-dark text-sm mt-0.5">{product.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <a href="#contact" className="inline-flex items-center gap-2 text-orange font-heading font-semibold text-sm hover:gap-3 transition-all group">
              Explore Wooden Solutions
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

try {
  useGLTF.preload('/models/wooden_box.glb');
} catch (e) {}