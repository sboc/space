import { useSimulationStore } from '../../store/simulationStore';
import { findBodyById } from '../../data/solarSystem';

export function InfoPanel() {
  const focusedBodyId = useSimulationStore((s) => s.focusedBodyId);
  const setFocus = useSimulationStore((s) => s.setFocus);

  if (!focusedBodyId) return null;

  const body = findBodyById(focusedBodyId);
  if (!body) return null;

  const orbitalPeriodLabel =
    body.type !== 'star' && body.orbitalPeriod > 0
      ? body.orbitalPeriod >= 365
        ? `${(body.orbitalPeriod / 365.25).toFixed(2)} yr`
        : `${body.orbitalPeriod.toFixed(2)} days`
      : null;

  const rotLabel =
    body.rotationPeriod >= 24
      ? `${(body.rotationPeriod / 24).toFixed(2)} days`
      : `${body.rotationPeriod.toFixed(2)} hr`;

  return (
    <div className="info-panel">
      <button className="info-close" onClick={() => setFocus(null)}>
        ✕
      </button>
      <h3 className="info-name">{body.name}</h3>
      <p className="info-type">{body.type.charAt(0).toUpperCase() + body.type.slice(1)}</p>
      <div className="info-rows">
        {body.realRadiusKm && (
          <div className="info-row">
            <span>Radius</span>
            <span>{body.realRadiusKm.toLocaleString()} km</span>
          </div>
        )}
        {body.realDistanceAU != null && body.realDistanceAU > 0 && (
          <div className="info-row">
            <span>Distance</span>
            <span>{body.realDistanceAU} AU</span>
          </div>
        )}
        {orbitalPeriodLabel && (
          <div className="info-row">
            <span>Orbital Period</span>
            <span>{orbitalPeriodLabel}</span>
          </div>
        )}
        <div className="info-row">
          <span>Rotation</span>
          <span>{rotLabel}</span>
        </div>
        <div className="info-row">
          <span>Axial Tilt</span>
          <span>{body.axialTilt}°</span>
        </div>
        {body.moons && body.moons.length > 0 && (
          <div className="info-row">
            <span>Moons shown</span>
            <span>{body.moons.length}</span>
          </div>
        )}
      </div>
    </div>
  );
}
