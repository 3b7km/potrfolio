import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { PerspectiveCamera, Environment } from "@react-three/drei";

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
      dpr={[1.5, 2]}
      performance={{ min: 0.5 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ touchAction: "auto", pointerEvents: "none" }}
    >
      <Suspense fallback={null}>
        <PerspectiveCamera position={cameraPosition} makeDefault />

        {/* Self-hosted studio HDR for metalness reflections.
            Loaded from /public/hdri/ instead of raw.githubusercontent.com
            for faster CDN delivery via Vercel. */}
        <Environment files="/hdri/studio_small_03_1k.hdr" />

        {children}
      </Suspense>
    </Canvas>
  );
}
