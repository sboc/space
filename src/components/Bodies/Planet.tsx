import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { BodyData } from '../../data/solarSystem';
import { useSimulationStore } from '../../store/simulationStore';
import { RingSystem } from './RingSystem';
import { getBodyTexture, BODY_ROUGHNESS, BODY_METALNESS } from '../../utils/planetTextures';

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
      // Cap visual rotation at 1 rev/s — beyond that the texture aliases badly
      const visualSpeed = Math.min(rotSpeed * timeScale, 2 * Math.PI);
      meshRef.current.rotation.y += visualSpeed * delta;
    }
  });

  return (
    <>
      <group rotation={[0, 0, data.axialTilt * DEG2RAD]}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[data.radius, 48, 48]} />
          <meshStandardMaterial
            map={getBodyTexture(data.id)}
            emissive={data.emissive}
            emissiveIntensity={data.emissiveIntensity}
            roughness={BODY_ROUGHNESS[data.id] ?? 0.75}
            metalness={BODY_METALNESS[data.id] ?? 0}
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
