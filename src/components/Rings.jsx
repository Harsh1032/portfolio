import { useGSAP } from "@gsap/react";
import { useTexture } from "@react-three/drei";
import gsap from "gsap";
import { useRef } from "react";

const Rings = ({ position }) => {
  const groupRef = useRef();
  const texture = useTexture("/textures/rings.png");

  useGSAP(() => {
    if (!groupRef.current) return;

    const timeline = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.5,
    });

    timeline.to(groupRef.current.rotation, {
      y: `+=${Math.PI * 2}`,
      x: `-=${Math.PI * 2}`,
      duration: 2.5,
    });

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <group ref={groupRef} position={position} scale={0.5}>
      {Array.from({ length: 4 }, (_, index) => (
        <mesh key={index}>
          <torusGeometry args={[(index + 1) * 0.5, 0.1]} />
          <meshMatcapMaterial matcap={texture} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
};

export default Rings;