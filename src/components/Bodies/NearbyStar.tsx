import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { BodyData } from '../../data/solarSystem';
import { useSimulationStore } from '../../store/simulationStore';
import { getStarCoronaTexture } from '../../utils/planetTextures';

const DEG2RAD = Math.PI / 180;

interface Props { data: BodyData; }

export function NearbyStar({ data }: Props) {
  'use no memo';
  const meshRef   = useRef<THREE.Mesh>(null!);
  const coronaRef = useRef<THREE.Sprite>(null!);

  const coronaTex = useMemo(() => {
    const c = new THREE.Color(data.color);
    return getStarCoronaTexture(
      Math.round(c.r * 255),
      Math.round(c.g * 255),
      Math.round(c.b * 255),
    );
  }, [data.color]);

  const pos = data.position ?? [0, 0, 0];
  // Minimum corona size ensures dim M-dwarfs remain visible at distance
  const coronaSize = Math.max(data.radius * 8, 5);
  const labelHeight = Math.max(data.radius * 2, 4);

  useFrame((_state, delta) => {
    'use no memo';
    const { isPaused, timeScale } = useSimulationStore.getState();
    if (isPaused) return;
    const rotSpeed = (2 * Math.PI) / (data.rotationPeriod / 24);
    meshRef.current.rotation.y += rotSpeed * delta * timeScale;
    // Gentle corona pulse
    const pulse = 1 + Math.sin(_state.clock.elapsedTime * 0.5) * 0.05;
    coronaRef.current.scale.setScalar(coronaSize * pulse);
  });

  return (
    <group position={pos}>
      {/* Corona glow — billboard sprite with additive blending */}
      <sprite ref={coronaRef} scale={[coronaSize, coronaSize, 1]}>
        <spriteMaterial
          map={coronaTex}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          opacity={0.65}
        />
      </sprite>

      {/* Star surface */}
      <mesh ref={meshRef} rotation={[0, 0, data.axialTilt * DEG2RAD]}>
        <sphereGeometry args={[data.radius, 32, 32]} />
        <meshBasicMaterial color={data.color} />
      </mesh>

      <Html
        position={[0, labelHeight, 0]}
        center
        distanceFactor={80}
        style={{ pointerEvents: 'auto' }}
      >
        <div
          className="body-label star-label"
          style={{ color: data.color }}
          onClick={() => useSimulationStore.getState().setFocus(data.id)}
        >
          {data.name}
        </div>
      </Html>
    </group>
  );
}
