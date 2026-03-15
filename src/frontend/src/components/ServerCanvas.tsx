import { OrbitControls, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import type { Group } from "three";

const UNITS = [
  { id: "u0", y: 0.9, h: 0.18, emissiveIntensity: 0.6 },
  { id: "u1", y: 0.6, h: 0.22, emissiveIntensity: 0.4 },
  { id: "u2", y: 0.25, h: 0.25, emissiveIntensity: 0.8 },
  { id: "u3", y: -0.1, h: 0.18, emissiveIntensity: 0.3 },
  { id: "u4", y: -0.4, h: 0.22, emissiveIntensity: 0.5 },
  { id: "u5", y: -0.72, h: 0.16, emissiveIntensity: 0.7 },
];

const DRIVE_SLOTS = [
  { id: "d0", x: -0.3 },
  { id: "d1", x: -0.1 },
  { id: "d2", x: 0.1 },
];

function ServerRack() {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main chassis */}
      <RoundedBox args={[1.4, 2.0, 0.5]} radius={0.04} smoothness={4}>
        <meshStandardMaterial color="#0a0a18" metalness={0.9} roughness={0.2} />
      </RoundedBox>

      {/* Server units */}
      {UNITS.map((u, idx) => (
        <group key={u.id} position={[0, u.y, 0.26]}>
          <RoundedBox args={[1.2, u.h, 0.04]} radius={0.01} smoothness={4}>
            <meshStandardMaterial
              color="#0d0d20"
              emissive="#2E5BFF"
              emissiveIntensity={u.emissiveIntensity}
              metalness={0.8}
              roughness={0.3}
            />
          </RoundedBox>
          {/* Status LED */}
          <mesh position={[0.5, 0, 0.03]}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshStandardMaterial
              color={idx % 3 === 0 ? "#AAFF00" : "#2E5BFF"}
              emissive={idx % 3 === 0 ? "#AAFF00" : "#2E5BFF"}
              emissiveIntensity={2}
            />
          </mesh>
          {/* Drive slots */}
          {DRIVE_SLOTS.map((slot) => (
            <mesh key={slot.id} position={[slot.x, 0, 0.025]}>
              <boxGeometry args={[0.12, u.h * 0.6, 0.01]} />
              <meshStandardMaterial
                color="#1a1a3a"
                metalness={0.7}
                roughness={0.4}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* Cable tray at bottom */}
      <mesh position={[0, -0.95, 0.1]}>
        <boxGeometry args={[1.3, 0.08, 0.3]} />
        <meshStandardMaterial
          color="#111122"
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>
    </group>
  );
}

export default function ServerCanvas() {
  return (
    <div className="w-full h-full" style={{ minHeight: 400 }}>
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-2 border-cobalt border-t-transparent animate-spin" />
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 0, 3.5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[3, 3, 3]} intensity={2} color="#2E5BFF" />
          <pointLight position={[-3, -1, 2]} intensity={1} color="#AAFF00" />
          <pointLight position={[0, 0, 4]} intensity={0.5} color="#ffffff" />
          <ServerRack />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={(Math.PI * 3) / 4}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
