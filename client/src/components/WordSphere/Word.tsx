import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type WordProps = {
  children: React.ReactNode;
  position: THREE.Vector3;
};

export default function Word({ children, position }: WordProps) {
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
