import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text3D, Center, Float } from "@react-three/drei";
import * as THREE from "three";

export default function Hero3DText() {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const [isMobile, setIsMobile] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(1);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Track scroll to hide name
  useEffect(() => {
    const handleScroll = () => {
      // Fade out after 300px scroll
      const scrollDistance = Math.max(0, window.scrollY - 300);
      const maxDistance = 400; // Fully hidden at 700px
      const opacity = Math.max(0, 1 - scrollDistance / maxDistance);
      setScrollOpacity(opacity);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Responsive scaling — proportional to viewport
  const scale = isMobile
    ? Math.min(1.8, viewport.width / 35)
    : Math.min(1.3, viewport.width / 65);

  const textScale = isMobile ? scale * 1.6 : scale * 1.5;
  const yOffset = textScale * 0.55;

  useFrame((state) => {
    if (groupRef.current) {
      if (!isMobile) {
        // Subtle parallax mapped to mouse movement
        const x = (state.pointer.x * viewport.width) / 15;
        const y = (state.pointer.y * viewport.height) / 15;

        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          x * 0.1,
          0.05,
        );
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
          groupRef.current.rotation.x,
          -y * 0.1,
          0.05,
        );
      } else {
        // Force reset rotation on mobile to keep it perfectly centered
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          0,
          0.1,
        );
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
          groupRef.current.rotation.x,
          0,
          0.1,
        );
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 4]}>
      <Float speed={2.5} rotationIntensity={0.15} floatIntensity={0.8}>
        <group>
          <group position={[0, yOffset, 0]}>
            <Text3D
              font="https://unpkg.com/three@0.77.0/examples/fonts/helvetiker_bold.typeface.json"
              scale={textScale}
              curveSegments={isMobile ? 8 : 24}
              bevelEnabled
              bevelSegments={isMobile ? 2 : 5}
              bevelSize={isMobile ? 0.02 : 0.04}
              bevelThickness={isMobile ? 0.05 : 0.1}
              height={isMobile ? 0.3 : 0.5}
              letterSpacing={-0.05}
              onUpdate={(self) => self.geometry.center()}
            >
              YOUSSEF
              <meshStandardMaterial
                color="#1e3b60"
                roughness={0.15}
                metalness={0.9}
                envMapIntensity={isMobile ? 1.5 : 2.5}
                transparent
                opacity={scrollOpacity}
              />
            </Text3D>
          </group>
          <group position={[0, -yOffset, 0]}>
            <Text3D
              font="https://unpkg.com/three@0.77.0/examples/fonts/helvetiker_bold.typeface.json"
              scale={textScale}
              curveSegments={isMobile ? 8 : 24}
              bevelEnabled
              bevelSegments={isMobile ? 2 : 5}
              bevelSize={isMobile ? 0.02 : 0.04}
              bevelThickness={isMobile ? 0.05 : 0.1}
              height={isMobile ? 0.3 : 0.5}
              letterSpacing={-0.05}
              onUpdate={(self) => self.geometry.center()}
            >
              ABDELHAKAM
              <meshStandardMaterial
                color="#1e3b60"
                roughness={0.15}
                metalness={0.9}
                envMapIntensity={isMobile ? 1.5 : 2.5}
                transparent
                opacity={scrollOpacity}
              />
            </Text3D>
          </group>
        </group>
      </Float>

      {/* Local lighting to make the text pop */}
      <spotLight
        position={[5, 5, 5]}
        intensity={2}
        color="#ffffff"
        penumbra={1}
        castShadow
      />
      <spotLight position={[-5, -5, 5]} intensity={1} color="#aaaaaa" />
    </group>
  );
}
