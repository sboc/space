import { useRef, type ReactNode } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { BodyData } from '../../data/solarSystem';
import { useSimulationStore } from '../../store/simulationStore';

interface Props {
  data: BodyData;
  children: ReactNode;
}

export function OrbitalMechanics({ data, children }: Props) {
  'use no memo';
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    'use no memo';
    const t = useSimulationStore.getState().simulatedTime;
    const angle = data.initialAngle + (2 * Math.PI * t) / data.orbitalPeriod;
    groupRef.current.position.x = Math.cos(angle) * data.orbitalRadius;
    groupRef.current.position.z = Math.sin(angle) * data.orbitalRadius;
  });

  return <group ref={groupRef}>{children}</group>;
}
