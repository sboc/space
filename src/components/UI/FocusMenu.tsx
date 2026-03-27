import { useState } from 'react';
import { PLANETS, SUN_DATA, findBodyById } from '../../data/solarSystem';
import { useSimulationStore } from '../../store/simulationStore';

export function FocusMenu() {
  const [open, setOpen] = useState(false);
  const focusedBodyId = useSimulationStore((s) => s.focusedBodyId);
  const setFocus = useSimulationStore((s) => s.setFocus);

  const focused = focusedBodyId ? findBodyById(focusedBodyId) : null;

  function handleSelect(id: string | null) {
    setFocus(id);
    setOpen(false);
  }

  return (
    <div className="focus-menu">
      <button className="focus-btn" onClick={() => setOpen((o) => !o)}>
        {focused ? focused.name : 'Free Camera'} ▾
      </button>
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
        </div>
      )}
    </div>
  );
}
