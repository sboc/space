import { create } from 'zustand';

interface SimulationState {
  simulatedTime: number;
  isPaused: boolean;
  timeScale: number;
  focusedBodyId: string | null;
  isFollowing: boolean;
  tick: (delta: number) => void;
  setTimeScale: (scale: number) => void;
  togglePause: () => void;
  setFocus: (id: string | null) => void;
  setFollowing: (v: boolean) => void;
  resetTime: () => void;
}

export const useSimulationStore = create<SimulationState>((set) => ({
  simulatedTime: 0,
  isPaused: false,
  timeScale: 365,
  focusedBodyId: null,
  isFollowing: false,
  // Cap delta at ~33 ms so tab-reactivation spikes or GC pauses don't cause
  // visible planet position jumps at high time scales.
  tick: (delta) => set((s) => ({
    simulatedTime: s.simulatedTime + Math.min(delta, 1 / 30) * s.timeScale,
  })),
  setTimeScale: (scale) => set({ timeScale: scale }),
  togglePause: () => set((s) => ({ isPaused: !s.isPaused })),
  setFocus: (id) => set({ focusedBodyId: id, isFollowing: false }),
  setFollowing: (v) => set({ isFollowing: v }),
  resetTime: () => set({ simulatedTime: 0 }),
}));
