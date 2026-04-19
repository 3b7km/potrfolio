import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text3D, Center, Float } from "@react-three/drei";
import * as THREE from "three";

export default function Hero3DText() {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Responsive scaling — proportional to viewport
  const scale = isMobile
    ? Math.min(1.8, viewport.width / 40)
    : Math.min(2, viewport.width / 50);

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle parallax mapped to mouse movement
      const x = (state.pointer.x * viewport.width) / 15;
      const y = (state.pointer.y * viewport.height) / 15;
      
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.1, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.1, 0.05);

      // Scroll effect - push it up as user scrolls down
      const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
      const scrollY = window.scrollY;
      const progress = scrollMax > 0 ? scrollY / scrollMax : 0;
      
      // Translate the text upwards as user scrolls down
      groupRef.current.position.y = THREE.MathUtils.lerp(0, progress * 50, 0.1);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 4]}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
        <Center>
          <Text3D
            font="https://unpkg.com/three@0.77.0/examples/fonts/helvetiker_bold.typeface.json"
            scale={isMobile ? scale * 2 : scale * 2.5}
            curveSegments={isMobile ? 12 : 24}
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
