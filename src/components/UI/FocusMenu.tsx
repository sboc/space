import { useState } from 'react';
import { PLANETS, SUN_DATA, NEARBY_STARS, findBodyById } from '../../data/solarSystem';
import { useSimulationStore } from '../../store/simulationStore';

export function FocusMenu() {
  const [open, setOpen] = useState(false);
  const focusedBodyId = useSimulationStore((s) => s.focusedBodyId);
  const setFocus = useSimulationStore((s) => s.setFocus);
  const isFollowing = useSimulationStore((s) => s.isFollowing);
  const setFollowing = useSimulationStore((s) => s.setFollowing);

  const focused = focusedBodyId ? findBodyById(focusedBodyId) : null;

  function handleSelect(id: string | null) {
    setFocus(id);
    setOpen(false);
  }

  return (
    <div className="focus-menu">
      <div className="focus-row">
        <button className="focus-btn" onClick={() => setOpen((o) => !o)}>
          {focused ? focused.name : 'Free Camera'} ▾
        </button>
        {focusedBodyId && (
          <button
            className={`follow-btn${isFollowing ? ' active' : ''}`}
            onClick={() => setFollowing(!isFollowing)}
            title={isFollowing ? 'Stop following' : 'Follow this body'}
          >
            {isFollowing ? '⦿ Following' : '◎ Follow'}
          </button>
        )}
      </div>
      {open && (
        <div className="focus-dropdown">
          <button className="focus-item" onClick={() => handleSelect(null)}>
            Free Camera
          </button>
          <button className="focus-item" onClick={() => handleSelect(SUN_DATA.id)}>
            {SUN_DATA.name}
          </button>
          {PLANETS.map((planet) => (
            <div key={planet.id}>
              <button className="focus-item" onClick={() => handleSelect(planet.id)}>
                {planet.name}
              </button>
              {planet.moons?.map((moon) => (
                <button
                  key={moon.id}
                  className="focus-item focus-moon"
                  onClick={() => handleSelect(moon.id)}
                >
                  ↳ {moon.name}
                </button>
              ))}
            </div>
          ))}
          <div className="focus-section-label">Nearby Stars</div>
          {NEARBY_STARS.map((star) => (
            <button key={star.id} className="focus-item focus-star" onClick={() => handleSelect(star.id)}>
              {star.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
