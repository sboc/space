import { useRef, Fragment } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, CameraControls } from '@react-three/drei';
import type CameraControlsImpl from 'camera-controls';
import { PLANETS, SUN_DATA } from '../../data/solarSystem';
import { useSimulationStore } from '../../store/simulationStore';
import { Sun } from '../Bodies/Sun';
import { Planet } from '../Bodies/Planet';
import { Moon } from '../Bodies/Moon';
import { OrbitalMechanics } from '../Orbit/OrbitalMechanics';
import { OrbitalPath } from '../Bodies/OrbitalPath';
import { usePlanetFocus } from '../../hooks/usePlanetFocus';

function SimulationTicker() {
  'use no memo';
  useFrame((_state, delta) => {
    'use no memo';
    const { isPaused, tick } = useSimulationStore.getState();
    if (!isPaused) tick(delta);
  });
  return null;
}

export function Scene() {
  const controlsRef = useRef<CameraControlsImpl>(null);
  usePlanetFocus(controlsRef);

  return (
    <>
      <ambientLight intensity={0.06} />
      <Stars radius={500} depth={100} count={6000} factor={4} fade speed={0} />

      <Sun data={SUN_DATA} />

      {/* Planet orbit paths centered at the Sun */}
      {PLANETS.map((planet) => (
        <OrbitalPath key={`orbit-${planet.id}`} radius={planet.orbitalRadius} />
      ))}

      {/* Planets with their moons */}
      {PLANETS.map((planet) => (
        <OrbitalMechanics key={planet.id} data={planet}>
          <Planet data={planet} />
          {planet.moons?.map((moon) => (
            <Fragment key={moon.id}>
              {/* Moon orbit path follows the planet */}
              <OrbitalPath radius={moon.orbitalRadius} segments={64} />
              <OrbitalMechanics data={moon}>
                <Moon data={moon} />
              </OrbitalMechanics>
            </Fragment>
          ))}
        </OrbitalMechanics>
      ))}

      <CameraControls ref={controlsRef} />
      <SimulationTicker />
    </>
  );
}
