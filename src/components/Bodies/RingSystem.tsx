import * as THREE from 'three';
import type { RingData } from '../../data/solarSystem';

interface Props {
  data: RingData;
  bodyRadius: number;
}

export function RingSystem({ data, bodyRadius }: Props) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[data.innerRadius * bodyRadius, data.outerRadius * bodyRadius, 80]} />
      <meshBasicMaterial
        color={data.color}
        side={THREE.DoubleSide}
        transparent
        opacity={data.opacity}
      />
    </mesh>
  );
}
