import { Canvas } from '@react-three/fiber';
import { MilkyWayScene } from './MilkyWayScene';

interface Props {
  onSwitchView: () => void;
}

export function MilkyWayView({ onSwitchView }: Props) {
  return (
    <div className="solar-system-root">
      <Canvas
        camera={{ fov: 45, near: 0.5, far: 3000, position: [60, 280, 220] }}
        gl={{ antialias: true, logarithmicDepthBuffer: true }}
      >
        <MilkyWayScene />
      </Canvas>

      <div className="hud">
        <div className="hud-top">
          <span className="hud-title">Milky Way</span>
          <button className="view-toggle-btn" onClick={onSwitchView}>
            ← Stellar Neighborhood
          </button>
        </div>

        <div className="interstellar-legend">
          <div className="legend-row">
            <span className="legend-bar" />
            <span>1 unit = 250 ly · ~90,000 particles</span>
          </div>
          <div className="legend-row legend-muted">
            Scroll to zoom · drag to orbit
          </div>
        </div>
      </div>
    </div>
  );
}
