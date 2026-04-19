import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text3D, Center, Float } from "@react-three/drei";
import * as THREE from "three";

export default function Hero3DText() {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  // Responsive scaling based on viewport width
  // Setting a smaller floor so it fits screen comfortably
  const scale = Math.min(2, viewport.width / 50);

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
      
      // Translate the text upwards. At 10% scroll, we move it completely out of view.
      groupRef.current.position.y = THREE.MathUtils.lerp(viewport.height * 0.1, viewport.height * 0.1 + (progress * 50), 0.1);
    }
  });

  return (
    <group ref={groupRef} position={[0, viewport.height * 0.1, 4]}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
        <Center>
          <Text3D
            font="https://unpkg.com/three@0.77.0/examples/fonts/helvetiker_bold.typeface.json"
            scale={scale * 2.5}
            curveSegments={24}
            bevelEnabled
            bevelSize={0.04}
            bevelThickness={0.1}
            height={0.5}
            lineHeight={0.9}
            letterSpacing={-0.05}
          >
            {`YOUSSEF\nABDELHAKAM`}
            <meshStandardMaterial
              color="#0A1128"
              roughness={0.1}
              metalness={0.8}
              envMapIntensity={2}
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
