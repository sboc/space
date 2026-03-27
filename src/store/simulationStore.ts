import { create } from 'zustand';

interface SimulationState {
  simulatedTime: number;
  isPaused: boolean;
  timeScale: number;
  focusedBodyId: string | null;
  tick: (delta: number) => void;
  setTimeScale: (scale: number) => void;
  togglePause: () => void;
  setFocus: (id: string | null) => void;
  resetTime: () => void;
}

export const useSimulationStore = create<SimulationState>((set) => ({
  simulatedTime: 0,
  isPaused: false,
  timeScale: 365,
  focusedBodyId: null,
  tick: (delta) => set((s) => ({ simulatedTime: s.simulatedTime + delta * s.timeScale })),
  setTimeScale: (scale) => set({ timeScale: scale }),
  togglePause: () => set((s) => ({ isPaused: !s.isPaused })),
  setFocus: (id) => set({ focusedBodyId: id }),
  resetTime: () => set({ simulatedTime: 0 }),
}));
