import { useEffect, type RefObject } from 'react';
import type CameraControlsImpl from 'camera-controls';
import { useSimulationStore } from '../store/simulationStore';
import { findBodyById, computeWorldPosition } from '../data/solarSystem';

export function usePlanetFocus(controlsRef: RefObject<CameraControlsImpl | null>) {
  useEffect(() => {
    let lastFocusedId: string | null = null;

    const unsubscribe = useSimulationStore.subscribe((state) => {
      if (state.focusedBodyId === lastFocusedId) return;
      lastFocusedId = state.focusedBodyId;

      if (!controlsRef.current || state.focusedBodyId === null) return;

      const body = findBodyById(state.focusedBodyId);
      if (!body) return;

      const pos = computeWorldPosition(body, state.simulatedTime);
      const distance = Math.max(body.radius * 10, 2);

      void controlsRef.current.setLookAt(
        pos.x + distance,
        pos.y + distance * 0.5,
        pos.z + distance,
        pos.x,
        pos.y,
        pos.z,
        true,
      );
    });

    return unsubscribe;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
