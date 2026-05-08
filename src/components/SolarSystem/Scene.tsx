import { useRef, Fragment } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, CameraControls } from '@react-three/drei';
import type CameraControlsImpl from 'camera-controls';
import type { RefObject } from 'react';
import * as THREE from 'three';
import { PLANETS, SUN_DATA, NEARBY_STARS, findBodyById, computeWorldPosition } from '../../data/solarSystem';
import { useSimulationStore } from '../../store/simulationStore';
import { Sun } from '../Bodies/Sun';
import { Planet } from '../Bodies/Planet';
import { Moon } from '../Bodies/Moon';
import { NearbyStar } from '../Bodies/NearbyStar';
import { OrbitalMechanics } from '../Orbit/OrbitalMechanics';
import { OrbitalPath } from '../Bodies/OrbitalPath';
import { usePlanetFocus } from '../../hooks/usePlanetFocus';

function CameraFollower({ controlsRef }: { controlsRef: RefObject<CameraControlsImpl | null> }) {
  'use no memo';
  const prevBodyPos = useRef<THREE.Vector3 | null>(null);
  const lastFocusedId = useRef<string | null>(null);
  const tmpDelta = useRef(new THREE.Vector3());
  const tmpCamPos = useRef(new THREE.Vector3());
  const tmpTarget = useRef(new THREE.Vector3());

  useFrame(() => {
    'use no memo';
    const { isFollowing, focusedBodyId, simulatedTime } = useSimulationStore.getState();

    if (!isFollowing || !focusedBodyId || !controlsRef.current) {
      prevBodyPos.current = null;
      lastFocusedId.current = null;
      return;
    }

    const body = findBodyById(focusedBodyId);
    if (!body) return;

    const currentPos = computeWorldPosition(body, simulatedTime);

    // Reset tracking when focused body changes
    if (focusedBodyId !== lastFocusedId.current) {
      lastFocusedId.current = focusedBodyId;
      prevBodyPos.current = currentPos.clone();
      return;
    }

    if (prevBodyPos.current === null) {
      prevBodyPos.current = currentPos.clone();
      return;
    }

    tmpDelta.current.copy(currentPos).sub(prevBodyPos.current);

    if (tmpDelta.current.lengthSq() > 1e-12) {
      controlsRef.current.getPosition(tmpCamPos.current);
      controlsRef.current.getTarget(tmpTarget.current);
      void controlsRef.current.setLookAt(
        tmpCamPos.current.x + tmpDelta.current.x,
        tmpCamPos.current.y + tmpDelta.current.y,
        tmpCamPos.current.z + tmpDelta.current.z,
        tmpTarget.current.x + tmpDelta.current.x,
        tmpTarget.current.y + tmpDelta.current.y,
        tmpTarget.current.z + tmpDelta.current.z,
        false,
      );
    }

    prevBodyPos.current.copy(currentPos);
  });

  return null;
}

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
      <ambientLight intensity={0.10} />
      <Stars radius={80000} depth={10000} count={8000} factor={4} fade speed={0} />

      <Sun data={SUN_DATA} />

      {/* Nearby stars at true sky positions (50 scene units / light-year) */}
      {NEARBY_STARS.map((star) => (
        <NearbyStar key={star.id} data={star} />
      ))}

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
      <CameraFollower controlsRef={controlsRef} />
      <SimulationTicker />
    </>
  );
}
