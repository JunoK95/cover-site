import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { colors } from "@/constants/colors";
import Sphere from "./Sphere";

export default function WordSphere() {
  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
      <ambientLight intensity={2} />
      <directionalLight
        position={[10, 10, 5]}
        color={colors.red}
        intensity={1}
      />
      <directionalLight position={[-10, -10, 5]} intensity={1} />
      <Sphere />
      <OrbitControls enablePan={true} />
    </Canvas>
  );
}
