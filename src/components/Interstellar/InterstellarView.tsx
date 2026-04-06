import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { InterstellarScene } from './InterstellarScene';
import type { CatalogStar } from '../../data/starCatalog';

interface Props {
  onSwitchToPrev: () => void;
  onSwitchToNext: () => void;
}

export function InterstellarView({ onSwitchToPrev, onSwitchToNext }: Props) {
  const [selected, setSelected] = useState<CatalogStar | null>(null);

  return (
    <div className="solar-system-root">
      <Canvas
        camera={{ fov: 50, near: 0.1, far: 15000, position: [30, 70, 120] }}
        gl={{ antialias: true, logarithmicDepthBuffer: true }}
      >
        <InterstellarScene onSelectStar={setSelected} />
      </Canvas>

      <div className="hud">
        <div className="hud-top">
          <span className="hud-title">Stellar Neighborhood</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="view-toggle-btn" onClick={onSwitchToPrev}>
              ← Solar System
            </button>
            <button className="view-toggle-btn" onClick={onSwitchToNext}>
              Milky Way →
            </button>
          </div>
        </div>

        {selected && (
          <div className="info-panel interstellar-info-panel">
            <button className="info-close" onClick={() => setSelected(null)}>✕</button>
            <h3 className="info-name">{selected.name}</h3>
            <p className="info-type">{selected.spectralType}</p>
            <div className="info-rows">
              <div className="info-row">
                <span>Distance</span>
                <span>
                  {selected.distLy >= 100
                    ? `${Math.round(selected.distLy).toLocaleString()} ly`
                    : `${selected.distLy.toFixed(3)} ly`}
                </span>
              </div>
              <div className="info-row">
                <span>Distance</span>
                <span>{(selected.distLy * 63241).toLocaleString(undefined, { maximumFractionDigits: 0 })} AU</span>
              </div>
              <div className="info-row">
                <span>Light travel</span>
                <span>
                  {selected.distLy >= 1
                    ? `${selected.distLy.toFixed(1)} years`
                    : `${(selected.distLy * 365.25).toFixed(0)} days`}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="interstellar-legend">
          <div className="legend-row">
            <span className="legend-bar" />
            <span>5 units = 1 light-year · true relative scale</span>
          </div>
          <div className="legend-row legend-muted">
            {`${selected ? 'Click elsewhere to deselect · ' : ''}Click any star for details`}
          </div>
        </div>
      </div>
    </div>
  );
}
