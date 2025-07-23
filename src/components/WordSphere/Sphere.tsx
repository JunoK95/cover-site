import { useMemo, useRef } from "react";
import * as THREE from "three";
import { colors } from "@/constants/colors";
import Word from "./Word";
import { useFrame } from "@react-three/fiber";

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

type Props = { words?: string[] };

function Sphere({ words = WORDS }: Props) {
  const groupRef = useRef<THREE.Group>(null);

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

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
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
    </group>
  );
}

export default Sphere;
