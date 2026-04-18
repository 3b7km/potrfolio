import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { PerspectiveCamera } from "@react-three/drei";

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
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return null;
  }

  return (
    <Canvas className={className}>
      <Suspense fallback={null}>
        <PerspectiveCamera position={cameraPosition} makeDefault />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#0066FF" />
        {children}
      </Suspense>
    </Canvas>
  );
}
