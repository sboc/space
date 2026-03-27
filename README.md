# Space — Interactive 3D Solar System Simulator

A real-time 3D simulation of our solar system built with React, Three.js, and TypeScript. Explore all 8 planets, their moons, ring systems, and orbital mechanics with controllable time simulation.

## Tech Stack

| Layer | Library |
|---|---|
| UI framework | React 19 + TypeScript |
| 3D rendering | Three.js + @react-three/fiber |
| 3D helpers | @react-three/drei (Stars, CameraControls, Html, Line) |
| State | Zustand |
| Build | Vite + Babel (React Compiler) |

## Getting Started

```bash
npm install
npm run dev
```

Dev server runs at `http://localhost:5173` with HMR.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Type-check + production build → `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

No environment variables required — the app is fully self-contained.

## Project Structure

```
src/
├── main.tsx                    # Entry point
├── App.tsx                     # Root component
├── components/
│   ├── SolarSystem/
│   │   ├── SolarSystem.tsx     # Three.js Canvas wrapper
│   │   └── Scene.tsx           # 3D scene setup (lighting, camera, stars)
│   ├── Bodies/
│   │   ├── Sun.tsx             # Sun mesh + point light
│   │   ├── Planet.tsx          # Planet mesh + texture
│   │   ├── Moon.tsx            # Moon mesh
│   │   ├── RingSystem.tsx      # Ring geometry (Saturn, Uranus)
│   │   └── OrbitalPath.tsx     # Orbital ellipse visualization
│   ├── Orbit/
│   │   └── OrbitalMechanics.tsx # Orbital position calculation + useFrame loop
│   └── UI/
│       ├── HUD.tsx             # HUD layout container
│       ├── TimeControls.tsx    # Play/pause + speed presets
│       ├── FocusMenu.tsx       # Body selection dropdown
│       └── InfoPanel.tsx       # Selected body info panel
├── data/
│   └── solarSystem.ts          # All celestial body data + utility functions
├── store/
│   └── simulationStore.ts      # Zustand store (time, paused, timeScale, focus)
└── hooks/
    └── usePlanetFocus.ts       # Camera animation on body focus
```

## Architecture Notes

**Rendering loop:** `OrbitalMechanics.tsx` uses `useFrame` to advance simulated time and update planet/moon positions each frame. Time state is read imperatively via `getState()` to avoid unnecessary re-renders inside the animation loop.

**State:** `simulationStore` holds four values — `simulatedTime` (days from J2000.0), `isPaused`, `timeScale` (days/sec), and `focusedBodyId`. All UI controls and 3D components subscribe to this store.

**Data:** `solarSystem.ts` defines a `BodyData` interface and exports a typed array of all bodies. Each entry carries both real physical values (`realRadiusKm`, `realDistanceAU`) and display-scaled values (`radius`, `orbitalRadius`) since true-to-scale would make planets invisible. `findBodyById()` and `computeWorldPosition()` are utility functions exported from this file.

**Camera:** `usePlanetFocus.ts` subscribes to `focusedBodyId` and animates the camera-controls target to the selected body's current world position.

**'use no memo' directives:** Components that use `useFrame` opt out of React Compiler memoization with `'use no memo'` at the top of the file. This is intentional — the compiler's automatic memoization interferes with Three.js side effects in the render loop.

**Time simulation:** The epoch is J2000.0 (Jan 1, 2000 12:00 TT). Simulated time is in Earth days. Speed presets range from 1 day/sec to 100 years/sec. All orbital periods match real values.

## No Tests

There is no test suite configured. Vitest or Jest would need to be added if testing is required.
