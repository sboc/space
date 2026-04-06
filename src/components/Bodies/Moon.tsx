import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { BodyData } from '../../data/solarSystem';
import { useSimulationStore } from '../../store/simulationStore';
import { getBodyTexture, BODY_ROUGHNESS, BODY_METALNESS } from '../../utils/planetTextures';

interface Props {
  data: BodyData;
}

export function Moon({ data }: Props) {
  'use no memo';
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((_state, delta) => {
    'use no memo';
    const { isPaused, timeScale } = useSimulationStore.getState();
    if (!isPaused) {
      const rotSpeed = (2 * Math.PI) / (data.rotationPeriod / 24);
      const visualSpeed = Math.min(rotSpeed * timeScale, 2 * Math.PI);
      meshRef.current.rotation.y += visualSpeed * delta;
    }
  });

  return (
    <>
      <mesh ref={meshRef}>
        <sphereGeometry args={[data.radius, 32, 32]} />
        <meshStandardMaterial
          map={getBodyTexture(data.id)}
          roughness={BODY_ROUGHNESS[data.id] ?? 0.85}
          metalness={BODY_METALNESS[data.id] ?? 0}
        />
      </mesh>
      <Html
        position={[0, data.radius * 2.2, 0]}
        center
        distanceFactor={30}
        style={{ pointerEvents: 'auto' }}
      >
        <div
          className="body-label moon-label"
          onClick={() => useSimulationStore.getState().setFocus(data.id)}
        >
          {data.name}
        </div>
      </Html>
    </>
  );
}
