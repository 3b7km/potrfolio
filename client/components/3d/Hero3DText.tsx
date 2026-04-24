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

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle parallax mapped to mouse movement
      const x = (state.pointer.x * viewport.width) / 15;
      const y = (state.pointer.y * viewport.height) / 15;
      
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.1, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.1, 0.05);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 4]}>
      <Float speed={2.5} rotationIntensity={0.15} floatIntensity={0.8}>
        <Center>
          <Text3D
            font="https://unpkg.com/three@0.77.0/examples/fonts/helvetiker_bold.typeface.json"
            scale={isMobile ? scale * 1.6 : scale * 1.5}
            curveSegments={isMobile ? 24 : 24}
            bevelEnabled
            bevelSize={isMobile ? 0.02 : 0.04}
            bevelThickness={isMobile ? 0.05 : 0.1}
            height={isMobile ? 0.3 : 0.5}
            lineHeight={0.9}
            letterSpacing={-0.05}
          >
            {`YOUSSEF\nABDELHAKAM`}
            <meshStandardMaterial
              color="#1e3b60"
              roughness={0.15}
              metalness={0.9}
              envMapIntensity={isMobile ? 1.5 : 2.5}
              transparent
              opacity={scrollOpacity}
            />
          </Text3D>
        </Center>
      </Float>

      {/* Local lighting to make the text pop */}
      <spotLight position={[5, 5, 5]} intensity={2} color="#ffffff" penumbra={1} castShadow />
      <spotLight position={[-5, -5, 5]} intensity={1} color="#aaaaaa" />
    </group>
  );
}
