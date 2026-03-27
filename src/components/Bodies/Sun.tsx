import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { BodyData } from '../../data/solarSystem';
import { useSimulationStore } from '../../store/simulationStore';

const DEG2RAD = Math.PI / 180;

interface Props {
  data: BodyData;
}

export function Sun({ data }: Props) {
  'use no memo';
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((_state, delta) => {
    'use no memo';
    const { isPaused, timeScale } = useSimulationStore.getState();
    if (!isPaused) {
      const rotSpeed = (2 * Math.PI) / (data.rotationPeriod / 24);
      meshRef.current.rotation.y += rotSpeed * delta * timeScale;
    }
  });

  return (
    <group>
      <pointLight intensity={4} distance={600} decay={1.5} color="#FFF5D6" />
      <mesh ref={meshRef} rotation={[0, 0, data.axialTilt * DEG2RAD]}>
        <sphereGeometry args={[data.radius, 48, 48]} />
        <meshStandardMaterial
          color={data.color}
          emissive={data.emissive}
          emissiveIntensity={data.emissiveIntensity}
          roughness={1}
          metalness={0}
        />
      </mesh>
      <Html
        position={[0, data.radius * 1.8, 0]}
        center
        distanceFactor={80}
        style={{ pointerEvents: 'auto' }}
      >
        <div
          className="body-label sun-label"
          onClick={() => useSimulationStore.getState().setFocus(data.id)}
        >
          {data.name}
        </div>
      </Html>
    </group>
  );
}
