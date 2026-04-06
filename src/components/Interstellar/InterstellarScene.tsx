import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, CameraControls, Line, Html } from '@react-three/drei';
import type CameraControlsImpl from 'camera-controls';
import * as THREE from 'three';
import { SUN_DATA } from '../../data/solarSystem';
import { STAR_CATALOG, type CatalogStar } from '../../data/starCatalog';
import { useSimulationStore } from '../../store/simulationStore';
import { getCoronaTexture, getStarCoronaTexture } from '../../utils/planetTextures';

// 5 scene units = 1 light-year.
// Stars at 4 ly → ~20 units, at 2600 ly (Deneb) → ~13 000 units.
const LY = 5;
const DEG = Math.PI / 180;

function starXYZ(star: CatalogStar): [number, number, number] {
  const ra  = star.raDeg  * DEG;
  const dec = star.decDeg * DEG;
  const d   = star.distLy * LY;
  const x   = d * Math.cos(dec) * Math.cos(ra)  + (star.offset?.[0] ?? 0) * LY;
  const y   = d * Math.sin(dec)                  + (star.offset?.[1] ?? 0) * LY;
  const z   = d * Math.cos(dec) * Math.sin(ra)   + (star.offset?.[2] ?? 0) * LY;
  return [x, y, z];
}

// ── Distance reference ring ────────────────────────────────
function DistanceRing({ ly }: { ly: number }) {
  const r = ly * LY;
  const points = useMemo(() => {
    const N = 128;
    return Array.from({ length: N + 1 }, (_, i) => {
      const a = (i / N) * Math.PI * 2;
      return new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r);
    });
  }, [r]);

  const label = ly >= 1000 ? `${(ly / 1000).toFixed(1)} kly` : `${ly} ly`;

  return (
    <group>
      <Line points={points} color="#142038" lineWidth={1} />
      <Html position={[r + r * 0.03, 0, 0]} center style={{ pointerEvents: 'none' }}>
        <span style={{ color: '#2a4060', fontSize: '10px', fontFamily: 'system-ui', whiteSpace: 'nowrap' }}>
          {label}
        </span>
      </Html>
    </group>
  );
}

// ── XZ grid (only near origin) ────────────────────────────
function GridPlane() {
  const segs = useMemo(() => {
    const extent = 125; // 25 ly on each side
    const step   = 10;  // 2 ly per cell
    const lines: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = -extent; i <= extent; i += step) {
      lines.push([new THREE.Vector3(i, 0, -extent), new THREE.Vector3(i, 0, extent)]);
      lines.push([new THREE.Vector3(-extent, 0, i), new THREE.Vector3(extent, 0, i)]);
    }
    return lines;
  }, []);

  return (
    <>
      {segs.map(([a, b], i) => (
        <Line key={i} points={[a, b]} color="#0b1525" lineWidth={0.5} />
      ))}
    </>
  );
}

// ── The Sun at origin ─────────────────────────────────────
function SunMarker() {
  const spriteRef = useRef<THREE.Sprite>(null!);
  const tex = useMemo(() => getCoronaTexture(), []);

  useFrame((s) => {
    const p = 1 + Math.sin(s.clock.elapsedTime * 0.6) * 0.05;
    spriteRef.current.scale.setScalar(4 * p);
  });

  return (
    <group>
      <sprite ref={spriteRef} scale={[4, 4, 1]}>
        <spriteMaterial map={tex} transparent blending={THREE.AdditiveBlending} depthWrite={false} opacity={0.85} />
      </sprite>
      <mesh>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshBasicMaterial color="#FDB813" />
      </mesh>
      <Html position={[0, 1.8, 0]} center distanceFactor={60} style={{ pointerEvents: 'auto' }}>
        <div
          className="body-label"
          style={{ color: '#FDB813', fontWeight: 600 }}
          onClick={() => useSimulationStore.getState().setFocus(SUN_DATA.id)}
        >
          Sun · 0 ly
        </div>
      </Html>
    </group>
  );
}

// ── Depth drop-lines for nearby stars ────────────────────
// Only draw for stars within 30 ly (150 units) — beyond that they're too numerous
function DepthLines() {
  const nearby = STAR_CATALOG.filter(s => s.distLy <= 30);
  return (
    <>
      {nearby.map(star => {
        const [x, y, z] = starXYZ(star);
        if (Math.abs(y) < 0.5) return null; // on the plane already
        const foot: [number, number, number] = [x, 0, z];
        return (
          <group key={`drop-${star.id}`}>
            <Line
              points={[new THREE.Vector3(x, y, z), new THREE.Vector3(...foot)]}
              color="#162840"
              lineWidth={0.6}
              dashed
              dashSize={0.8}
              gapSize={0.5}
            />
            <mesh position={foot}>
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshBasicMaterial color="#1e3554" />
            </mesh>
          </group>
        );
      })}
    </>
  );
}

// ── Individual star marker ────────────────────────────────
interface StarProps {
  star: CatalogStar;
  onSelect: (s: CatalogStar) => void;
}

function StarMarker({ star, onSelect }: StarProps) {
  const spriteRef = useRef<THREE.Sprite>(null!);
  const pos = useMemo(() => starXYZ(star), [star]);
  const coronaSize = 1.5 + star.glowFactor * 1.4;

  const coronaTex = useMemo(() => {
    const c = new THREE.Color(star.color);
    return getStarCoronaTexture(
      Math.round(c.r * 255),
      Math.round(c.g * 255),
      Math.round(c.b * 255),
    );
  }, [star.color]);

  useFrame((s) => {
    // Gentle individual pulse offset by position hash
    const phase = (pos[0] + pos[2]) * 0.07;
    const p = 1 + Math.sin(s.clock.elapsedTime * 0.5 + phase) * 0.06;
    spriteRef.current.scale.setScalar(coronaSize * p);
  });

  // Distant stars get bigger glow in scene units so they stay visible
  const label = `${star.name} · ${star.distLy >= 100 ? Math.round(star.distLy) : star.distLy.toFixed(1)} ly`;

  return (
    <group position={pos}>
      <sprite ref={spriteRef} scale={[coronaSize, coronaSize, 1]}>
        <spriteMaterial map={coronaTex} transparent blending={THREE.AdditiveBlending} depthWrite={false} opacity={0.8} />
      </sprite>
      <mesh onClick={() => onSelect(star)} onPointerOver={e => e.stopPropagation()}>
        <sphereGeometry args={[0.3, 12, 12]} />
        <meshBasicMaterial color={star.color} />
      </mesh>
      <Html
        position={[0, coronaSize * 0.6 + 0.5, 0]}
        center
        distanceFactor={60}
        style={{ pointerEvents: 'auto' }}
      >
        <div
          className="body-label"
          style={{ color: star.color, whiteSpace: 'nowrap' }}
          onClick={() => onSelect(star)}
        >
          {label}
        </div>
      </Html>
    </group>
  );
}

// ── Scene ─────────────────────────────────────────────────
interface Props {
  onSelectStar: (s: CatalogStar | null) => void;
}

export function InterstellarScene({ onSelectStar }: Props) {
  const controlsRef = useRef<CameraControlsImpl>(null);

  return (
    <>
      <ambientLight intensity={0.05} />
      <Stars radius={6000} depth={500} count={10000} factor={4} fade speed={0} />

      <GridPlane />
      <DistanceRing ly={10}   />
      <DistanceRing ly={25}   />
      <DistanceRing ly={50}   />
      <DistanceRing ly={100}  />
      <DistanceRing ly={500}  />
      <DistanceRing ly={1000} />
      <DistanceRing ly={3000} />

      <DepthLines />
      <SunMarker />

      {STAR_CATALOG.map(star => (
        <StarMarker key={star.id} star={star} onSelect={onSelectStar} />
      ))}

      <CameraControls ref={controlsRef} />
    </>
  );
}
