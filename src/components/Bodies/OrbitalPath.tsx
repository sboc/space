import { useMemo } from 'react';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

interface Props {
  radius: number;
  segments?: number;
}

export function OrbitalPath({ radius, segments = 128 }: Props) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0.01, Math.sin(angle) * radius));
    }
    return pts;
  }, [radius, segments]);

  return (
    <Line
      points={points}
      color="#ffffff"
      lineWidth={0.4}
      transparent
      opacity={0.12}
    />
  );
}
