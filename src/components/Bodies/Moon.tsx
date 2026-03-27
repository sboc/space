import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { BodyData } from '../../data/solarSystem';
import { useSimulationStore } from '../../store/simulationStore';

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
      meshRef.current.rotation.y += rotSpeed * delta * timeScale;
    }
  });

  return (
    <>
      <mesh ref={meshRef}>
        <sphereGeometry args={[data.radius, 20, 20]} />
        <meshStandardMaterial
          color={data.color}
          roughness={0.9}
          metalness={0}
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
