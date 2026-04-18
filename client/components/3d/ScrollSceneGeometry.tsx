import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";

export default function ScrollSceneGeometry() {
  const groupRef = useRef<THREE.Group>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const orbitRef = useRef<THREE.Group>(null);
  
  // Smooth scroll lerping
  const targetScroll = useRef(0);
  const currentScroll = useRef(0);
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  // Set up particle geometry once
  const particlesCount = 200;
  const positions = new Float32Array(particlesCount * 3);
  for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 15;
  }

  useFrame((state) => {
    // Mouse movement influence
    mouseX.current = THREE.MathUtils.lerp(mouseX.current, (state.pointer.x * Math.PI) / 10, 0.05);
    mouseY.current = THREE.MathUtils.lerp(mouseY.current, (state.pointer.y * Math.PI) / 10, 0.05);

    const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
    const scrollY = window.scrollY;
    // progress from 0 to 1
    const progress = scrollMax > 0 ? scrollY / scrollMax : 0;
    
    targetScroll.current = progress;
    currentScroll.current = THREE.MathUtils.lerp(currentScroll.current, targetScroll.current, 0.08);

    if (groupRef.current) {
      // Cinematic camera-like object movement blended with massive mouse cursor tracking
      const targetY = THREE.MathUtils.lerp(0, -1, currentScroll.current) + (state.pointer.y * 2);
      const targetX = THREE.MathUtils.lerp(0, 1.2, currentScroll.current) + (state.pointer.x * 2);

      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
      
      // Apply mouse influence
      groupRef.current.rotation.x = mouseY.current;
      groupRef.current.rotation.y = mouseX.current;

      // Base rotation scaling based on scroll
      if (outerRef.current) {
        outerRef.current.rotation.x += 0.001 + (currentScroll.current * 0.02);
        outerRef.current.rotation.y += 0.002 + (currentScroll.current * 0.02);
      }
      
      if (innerRef.current) {
        innerRef.current.rotation.x -= 0.002;
        innerRef.current.rotation.y -= 0.001;
        // Pulse scale
        const scale = 1 + Math.sin(state.clock.elapsedTime) * 0.05;
        innerRef.current.scale.set(scale, scale, scale);
      }

      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.0005;
        particlesRef.current.position.y = currentScroll.current * 5; // Parallax effect
      }

      if (orbitRef.current) {
         // Planets orbiting the blob
         orbitRef.current.rotation.z += 0.002;
         orbitRef.current.rotation.x += 0.001;
      }
    }
  });

  return (
    <group ref={groupRef} scale={1.2}>
      
      {/* Background Deep Space Stars */}
      <Stars radius={50} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* Liquid Metal Core */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[1.8, 64, 64]} />
        <MeshDistortMaterial 
          color="#050505" 
          roughness={0.1} 
          metalness={0.9}
          distort={0.4}
          speed={2.5}
        />
      </mesh>

      {/* Orbiting Planets */}
      <group ref={orbitRef}>
        <mesh position={[3, 1, 0]}>
           <sphereGeometry args={[0.2, 32, 32]} />
           <meshStandardMaterial color="#444" roughness={0.8} />
        </mesh>
        <mesh position={[-4, -2, -1]}>
           <sphereGeometry args={[0.15, 32, 32]} />
           <meshStandardMaterial color="#888" roughness={0.4} metalness={0.5} />
        </mesh>
        <mesh position={[1, -3, 2]}>
           <sphereGeometry args={[0.3, 32, 32]} />
           <meshStandardMaterial color="#fff" roughness={0.1} />
        </mesh>
      </group>

      {/* Floating Ambient Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.02} color="#ffffff" transparent opacity={0.4} sizeAttenuation />
      </points>
    </group>
  );
}
