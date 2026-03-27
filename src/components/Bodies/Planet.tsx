import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { BodyData } from '../../data/solarSystem';
import { useSimulationStore } from '../../store/simulationStore';
import { RingSystem } from './RingSystem';

const DEG2RAD = Math.PI / 180;

interface Props {
  data: BodyData;
}

export function Planet({ data }: Props) {
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
    <>
      <group rotation={[0, 0, data.axialTilt * DEG2RAD]}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[data.radius, 32, 32]} />
          <meshStandardMaterial
            color={data.color}
            emissive={data.emissive}
            emissiveIntensity={data.emissiveIntensity}
            roughness={0.8}
            metalness={0.05}
          />
        </mesh>
        {data.rings && <RingSystem data={data.rings} bodyRadius={data.radius} />}
      </group>
      <Html
        position={[0, data.radius * 2 + 0.3, 0]}
        center
        distanceFactor={60}
        style={{ pointerEvents: 'auto' }}
      >
        <div
          className="body-label"
          onClick={() => useSimulationStore.getState().setFocus(data.id)}
        >
          {data.name}
        </div>
      </Html>
    </>
  );
}
