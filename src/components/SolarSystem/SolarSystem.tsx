import { Canvas } from '@react-three/fiber';
import { Scene } from './Scene';
import { HUD } from '../UI/HUD';

export function SolarSystem() {
  return (
    <div className="solar-system-root">
      <Canvas
        camera={{ fov: 60, near: 0.1, far: 2000, position: [0, 80, 160] }}
        gl={{ antialias: true, logarithmicDepthBuffer: true }}
      >
        <Scene />
      </Canvas>
      <HUD />
    </div>
  );
}
