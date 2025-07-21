import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { colors } from "@/constants/colors";

const WORDS = [
  "React",
  "Three.js",
  "JavaScript",
  "HTML",
  "CSS",
  "Node.js",
  "TypeScript",
  "Redux",
  "Next.js",
  "Vite",
  "Tailwind",
  "Sass",
  "Git",
  "VSCode",
  "Figma",
  "Jest",
  "Testing",
  "API",
  "Design",
  "UX",
  "Hooks",
  "Performance",
  "Accessibility",
  "Animation",
  "Deployment",
];

function Word({ children, position }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (ref.current) {
      ref.current.lookAt(0, 0, 0);
    }
  });

  return (
    <Text
      ref={ref}
      position={position}
      fontSize={0.5}
      fontWeight={"bold"}
      scale={[-1, 1, 1]}
      color="black"
    >
      {children}
    </Text>
  );
}

export default function WordSphere({ words = WORDS }) {
  const wordPositions = useMemo(() => {
    const radius = 5;
    const count = WORDS.length;
    const positions = [];

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      positions.push(new THREE.Vector3(x, y, z));
    }

    return positions;
  }, []);

  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
      <ambientLight intensity={2} />
      {words.map((word, i) => (
        <Word key={i} position={wordPositions[i]}>
          {word}
        </Word>
      ))}
      <mesh>
        <sphereGeometry args={[5, 64, 64]} />
        <meshStandardMaterial
          color={colors.purple}
          opacity={0.95}
          transparent={true}
        />
      </mesh>
      <OrbitControls enablePan={true} />
    </Canvas>
  );
}
