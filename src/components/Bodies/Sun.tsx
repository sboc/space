import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { BodyData } from '../../data/solarSystem';
import { useSimulationStore } from '../../store/simulationStore';
import { getSunTexture, getCoronaTexture } from '../../utils/planetTextures';

const DEG2RAD = Math.PI / 180;

interface Props { data: BodyData; }

export function Sun({ data }: Props) {
  'use no memo';
  const meshRef   = useRef<THREE.Mesh>(null!);
  const coronaRef = useRef<THREE.Sprite>(null!);

  const sunTexture = useMemo(() => getSunTexture(),    []);
  const coronaTex  = useMemo(() => getCoronaTexture(), []);

  useFrame((_state, delta) => {
    'use no memo';
    const { isPaused, timeScale } = useSimulationStore.getState();
    if (isPaused) return;
    const rotSpeed = (2 * Math.PI) / (data.rotationPeriod / 24);
    meshRef.current.rotation.y += rotSpeed * delta * timeScale;
    // Gentle corona pulse
    const pulse = 1 + Math.sin(_state.clock.elapsedTime * 0.6) * 0.04;
    coronaRef.current.scale.setScalar(data.radius * 5.5 * pulse);
  });

  return (
    <group>
      <pointLight intensity={26} distance={0} decay={1.0} color="#FFF5E8" />

      {/* Outer corona glow — billboard sprite with additive blending */}
      <sprite ref={coronaRef} scale={[data.radius * 5.5, data.radius * 5.5, 1]}>
        <spriteMaterial
          map={coronaTex}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          opacity={0.7}
        />
      </sprite>

      {/* Sun surface — meshBasicMaterial: no lighting, shows its own colours */}
      <mesh ref={meshRef} rotation={[0, 0, data.axialTilt * DEG2RAD]}>
        <sphereGeometry args={[data.radius, 64, 64]} />
        <meshBasicMaterial map={sunTexture} />
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
