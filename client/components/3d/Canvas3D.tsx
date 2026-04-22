import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { PerspectiveCamera, Environment, Preload } from "@react-three/drei";

interface Canvas3DProps {
  children: React.ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
}

export default function Canvas3D({
  children,
  className = "",
  cameraPosition = [0, 0, 4],
}: Canvas3DProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <Canvas 
      className={`${className} canvas-touch-passthrough`}
      dpr={isMobile ? 1 : [1, 2]} 
      performance={{ min: 0.5 }}
      gl={{ antialias: !isMobile, alpha: true }}
      style={{ touchAction: 'auto', pointerEvents: 'none' }}
    >
      <Suspense fallback={null}>
        <PerspectiveCamera position={cameraPosition} makeDefault />
        <ambientLight intensity={0.2} />
        {/* Stark cool tone rim lights for metallic pop */}
        <spotLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" penumbra={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#e5e5e5" />
        
        {/* Studio environment for realistic metalness reflections */}
        <Environment preset="studio" />
        
        <Preload all />
        {children}
      </Suspense>
    </Canvas>
  );
}
