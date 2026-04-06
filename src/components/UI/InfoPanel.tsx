import { useSimulationStore } from '../../store/simulationStore';
import { findBodyById } from '../../data/solarSystem';

function formatPeriod(days: number): string {
  return days >= 365
    ? `${(days / 365.25).toFixed(2)} yr`
    : `${days.toFixed(2)} days`;
}

function formatRotation(hours: number): string {
  return hours >= 24
    ? `${(hours / 24).toFixed(2)} days`
    : `${hours.toFixed(2)} hr`;
}

export function InfoPanel() {
  const focusedBodyId = useSimulationStore((s) => s.focusedBodyId);
  const setFocus = useSimulationStore((s) => s.setFocus);

  if (!focusedBodyId) return null;

  const body = findBodyById(focusedBodyId);
  if (!body) return null;

  const orbitalPeriodLabel =
    body.type !== 'star' && body.orbitalPeriod > 0
      ? formatPeriod(body.orbitalPeriod)
      : null;

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
        {body.distanceLy != null && (
          <div className="info-row">
            <span>Distance</span>
            <span>{body.distanceLy.toFixed(3)} ly</span>
          </div>
        )}
        {body.realDistanceAU != null && body.realDistanceAU > 0 && body.distanceLy == null && (
          <div className="info-row">
            <span>Distance</span>
            <span>{body.realDistanceAU} AU</span>
          </div>
        )}
        {body.spectralType && (
          <div className="info-row">
            <span>Spectral Type</span>
            <span>{body.spectralType}</span>
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
          <span>{formatRotation(body.rotationPeriod)}</span>
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
