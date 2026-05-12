import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function HeroGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY.current = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.0003;
      meshRef.current.rotation.y += 0.0005;
      meshRef.current.position.x = mouseX.current * 2;
      meshRef.current.position.y = mouseY.current * 2;
    }
  });

  return (
    <mesh ref={meshRef} scale={2}>
      <icosahedronGeometry args={[1, 4]} />
      <meshStandardMaterial
        color="#0a0a1a"
        wireframe={false}
        metalness={0.3}
        roughness={0.8}
      />
    </mesh>
  );
}
