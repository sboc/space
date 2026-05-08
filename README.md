# Space - Interactive 3D Space Simulator

Real-time 3D simulation of our solar system and nearby stellar neighborhood, built with React, Three.js, and TypeScript.

## Views

**Solar System** - All 8 planets with moons, ring systems, and orbital paths. Orbital distances are proportional to real AU values (Earth = 36 scene units = 1 AU). Planet sizes are exaggerated for visibility.

**Interstellar** - Nearby stars (Proxima Centauri, Alpha Centauri A/B, Sirius, and more) placed at real sky positions using RA/Dec to XYZ conversion at 50 units/light-year.

**Milky Way** - Galaxy-scale view.

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
| `npm run build` | Type-check + production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

No environment variables required.

## Project Structure

```
src/
├── main.tsx
├── App.tsx                         # View switcher (solar system / interstellar / milky way)
├── components/
│   ├── SolarSystem/
│   │   ├── SolarSystem.tsx         # Three.js Canvas wrapper
│   │   └── Scene.tsx               # 3D scene (lighting, camera, stars, bodies)
│   ├── Interstellar/
│   │   ├── InterstellarView.tsx
│   │   └── InterstellarScene.tsx
│   ├── MilkyWay/
│   │   ├── MilkyWayView.tsx
│   │   └── MilkyWayScene.tsx
│   ├── Bodies/
│   │   ├── Sun.tsx
│   │   ├── Planet.tsx
│   │   ├── Moon.tsx
│   │   ├── NearbyStar.tsx
│   │   ├── RingSystem.tsx
│   │   └── OrbitalPath.tsx
│   ├── Orbit/
│   │   └── OrbitalMechanics.tsx    # Orbital position via useFrame
│   └── UI/
│       ├── HUD.tsx
│       ├── TimeControls.tsx
│       ├── FocusMenu.tsx
│       └── InfoPanel.tsx
├── data/
│   ├── solarSystem.ts              # Celestial body data + computeWorldPosition
│   └── starCatalog.ts              # Nearby star positions and spectral data
├── store/
│   └── simulationStore.ts          # Zustand store (time, paused, timeScale, focus)
└── hooks/
    └── usePlanetFocus.ts           # Camera animation on body focus
```

## Architecture Notes

**Rendering loop:** `OrbitalMechanics.tsx` uses `useFrame` to update planet/moon positions each frame. Time state is read via `getState()` to avoid re-renders inside the animation loop.

**State:** `simulationStore` holds `simulatedTime` (days from J2000.0), `isPaused`, `timeScale` (days/sec), and `focusedBodyId`.

**Data:** `solarSystem.ts` defines `BodyData` and exports all bodies. Each entry carries real physical values (`realRadiusKm`, `realDistanceAU`) alongside display-scaled values (`radius`, `orbitalRadius`). Orbital radii use 36 units/AU so relative distances are accurate; planet radii are exaggerated so they are visible.

**Camera:** `usePlanetFocus.ts` subscribes to `focusedBodyId` and animates the camera target to the selected body's world position.

**`use no memo` directives:** Components using `useFrame` opt out of React Compiler memoization. The compiler's automatic memoization interferes with Three.js side effects in the render loop.

**Time simulation:** Epoch is J2000.0 (Jan 1, 2000 12:00 TT). Simulated time is in Earth days. Speed presets range from 1 day/sec to 100 years/sec.

## No Tests

No test suite configured. Add Vitest or Jest if testing is needed.
