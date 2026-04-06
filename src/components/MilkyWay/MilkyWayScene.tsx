import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, CameraControls, Line, Html } from '@react-three/drei';
import type CameraControlsImpl from 'camera-controls';
import * as THREE from 'three';
import { getCoronaTexture } from '../../utils/planetTextures';

// Scale: 1 unit = 250 ly
// Galaxy diameter ~100,000 ly → 400 units
// Sun is ~26,000 ly from center → 104 units, placed at +X
const LY_PER_UNIT = 250;
const SUN_X = 26000 / LY_PER_UNIT; // ~104

const DEG = Math.PI / 180;

// ── Galaxy particle cloud ─────────────────────────────────
function Galaxy() {
  const pointsRef = useRef<THREE.Points>(null!);

  const { positions, colors } = useMemo(() => {
    const N = 90000;
    const pos = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);

    let idx = 0;

    function addParticle(x: number, y: number, z: number, r: number, g: number, b: number) {
      if (idx >= N) return;
      pos[idx * 3]     = x;
      pos[idx * 3 + 1] = y;
      pos[idx * 3 + 2] = z;
      col[idx * 3]     = r;
      col[idx * 3 + 1] = g;
      col[idx * 3 + 2] = b;
      idx++;
    }

    const rng = mulberry32(42);

    // ── Central bulge ─────────────────────────────
    // Oblate ellipsoid, radius ~15 units (3750 ly)
    for (let i = 0; i < 18000; i++) {
      const u = rng() * 2 - 1;
      const v = rng() * 2 - 1;
      const w = rng() * 2 - 1;
      const r = Math.pow(rng(), 0.5) * 18;
      const len = Math.sqrt(u * u + v * v + w * w) || 1;
      const x = (u / len) * r;
      const y = (v / len) * r * 0.45; // flattened
      const z = (w / len) * r;
      const brightness = 0.4 + rng() * 0.6;
      addParticle(x, y, z, brightness * 1.0, brightness * 0.75, brightness * 0.35);
    }

    // ── Central bar (angled ~27° from galactic x-axis) ────
    const barAngle = 27 * DEG;
    const cosB = Math.cos(barAngle);
    const sinB = Math.sin(barAngle);
    for (let i = 0; i < 8000; i++) {
      const t  = (rng() - 0.5) * 50; // half-length ~25 units (6250 ly)
      const rr = Math.pow(rng(), 2) * 6;
      const th = rng() * Math.PI * 2;
      const lx = t + Math.cos(th) * rr;
      const ly = (rng() - 0.5) * 3;
      const lz = Math.sin(th) * rr;
      const x  =  lx * cosB + lz * sinB;
      const z  = -lx * sinB + lz * cosB;
      const brightness = 0.35 + rng() * 0.45;
      addParticle(x, ly, z, brightness * 0.95, brightness * 0.8, brightness * 0.45);
    }

    // ── Four logarithmic spiral arms ──────────────────────
    // Pitch angle ~12° → b = tan(12°) / 1 ≈ 0.213
    const b = Math.tan(12 * DEG);
    const armOffsets = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
    const armColors: [number, number, number][] = [
      [0.55, 0.75, 1.0],  // blue-white (Perseus / Outer)
      [0.65, 0.85, 1.0],  // blue-white (Sagittarius)
      [0.6,  0.8,  1.0],  // blue-white (Norma / Cygnus)
      [0.55, 0.75, 1.0],  // blue-white (Scutum-Centaurus)
    ];

    const starsPerArm = 10000;

    for (let arm = 0; arm < 4; arm++) {
      const [ar, ag, ab] = armColors[arm];
      for (let i = 0; i < starsPerArm; i++) {
        // theta from ~0.6 to 10 radians (arm starts beyond bar)
        const theta = 0.6 + rng() * 9.4;
        const a0 = 12; // scale factor
        const r  = a0 * Math.exp(b * theta);
        if (r > 195) continue; // clip at galaxy edge

        const angle = theta + armOffsets[arm];
        const spread = (0.8 + rng() * 2.5) * (1 + theta * 0.08); // wider at edges
        const offR = (rng() - 0.5) * spread;
        const offA = (rng() - 0.5) * 0.18;

        const x = (r + offR) * Math.cos(angle + offA);
        const z = (r + offR) * Math.sin(angle + offA);
        const y = (rng() - 0.5) * (1.5 + r * 0.02);

        const brightness = 0.25 + rng() * 0.65;
        // Mix arm color with a warm component in denser inner regions
        const warmMix = Math.max(0, 1 - r / 60) * 0.4;
        addParticle(
          x, y, z,
          brightness * (ar + warmMix),
          brightness * (ag + warmMix * 0.5),
          brightness * ab,
        );
      }
    }

    // ── Thin disk background ──────────────────────────────
    for (let i = 0; i < 16000; i++) {
      const angle = rng() * Math.PI * 2;
      const r     = 15 + Math.pow(rng(), 0.6) * 175;
      const x     = Math.cos(angle) * r;
      const z     = Math.sin(angle) * r;
      const y     = (rng() - 0.5) * (2 + r * 0.018);
      const brightness = 0.1 + rng() * 0.25;
      addParticle(x, y, z, brightness * 0.7, brightness * 0.7, brightness * 0.9);
    }

    // ── Halo (sparse, spherical) ──────────────────────────
    for (let i = 0; i < 4000; i++) {
      const u = rng() * 2 - 1;
      const v = rng() * 2 - 1;
      const w = rng() * 2 - 1;
      const len = Math.sqrt(u * u + v * v + w * w) || 1;
      const r = 180 + rng() * 30;
      const x = (u / len) * r;
      const y = (v / len) * r * 0.7;
      const z = (w / len) * r;
      const brightness = 0.05 + rng() * 0.1;
      addParticle(x, y, z, brightness * 0.85, brightness * 0.85, brightness);
    }

    return { positions: pos, colors: col };
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  useFrame(() => {
    // Static — no rotation needed for a top-down map
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        vertexColors
        size={0.6}
        sizeAttenuation
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ── Galactic distance ring ────────────────────────────────
function GalacticRing({ ly }: { ly: number }) {
  const r = ly / LY_PER_UNIT;
  const points = useMemo(() => {
    const N = 160;
    return Array.from({ length: N + 1 }, (_, i) => {
      const a = (i / N) * Math.PI * 2;
      return new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r);
    });
  }, [r]);

  const label = ly >= 1000 ? `${(ly / 1000).toFixed(0)}k ly` : `${ly} ly`;

  return (
    <group>
      <Line points={points} color="#0d1a2e" lineWidth={0.7} />
      <Html position={[r + 2, 0, 0]} center style={{ pointerEvents: 'none' }}>
        <span style={{ color: '#1e3550', fontSize: '9px', fontFamily: 'system-ui', whiteSpace: 'nowrap' }}>
          {label}
        </span>
      </Html>
    </group>
  );
}

// ── Sun marker ────────────────────────────────────────────
function SunMarker() {
  const spriteRef = useRef<THREE.Sprite>(null!);
  const tex = useMemo(() => getCoronaTexture(), []);

  useFrame((s) => {
    const p = 1 + Math.sin(s.clock.elapsedTime * 0.7) * 0.08;
    spriteRef.current.scale.setScalar(3.5 * p);
  });

  return (
    <group position={[SUN_X, 0, 0]}>
      <sprite ref={spriteRef} scale={[3.5, 3.5, 1]}>
        <spriteMaterial map={tex} transparent blending={THREE.AdditiveBlending} depthWrite={false} opacity={0.9} />
      </sprite>
      <mesh>
        <sphereGeometry args={[0.35, 12, 12]} />
        <meshBasicMaterial color="#FDB813" />
      </mesh>
      {/* "You are here" ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.8, 2.1, 48]} />
        <meshBasicMaterial color="#4080ff" transparent opacity={0.45} side={THREE.DoubleSide} />
      </mesh>
      <Html position={[0, 4, 0]} center distanceFactor={300} style={{ pointerEvents: 'none' }}>
        <div style={{
          color: '#90b8ff',
          fontSize: '11px',
          fontFamily: 'system-ui',
          whiteSpace: 'nowrap',
          textShadow: '0 0 8px rgba(0,0,0,0.9)',
          textAlign: 'center',
          lineHeight: '1.4',
        }}>
          <div style={{ fontWeight: 600 }}>You are here</div>
          <div style={{ color: '#5080b0', fontSize: '9px' }}>26,000 ly from center</div>
        </div>
      </Html>
    </group>
  );
}

// ── Circle showing star catalog extent ────────────────────
// 3,200 ly max in catalog → 3200 / 250 = 12.8 units radius from Sun
function CatalogCircle() {
  const r = 3200 / LY_PER_UNIT;
  const points = useMemo(() => {
    const N = 96;
    return Array.from({ length: N + 1 }, (_, i) => {
      const a = (i / N) * Math.PI * 2;
      return new THREE.Vector3(SUN_X + Math.cos(a) * r, 0, Math.sin(a) * r);
    });
  }, [r]);

  return (
    <group>
      <Line points={points} color="#2a4878" lineWidth={1} dashed dashSize={1.2} gapSize={0.8} />
      <Html position={[SUN_X + r + 1.5, 0, 0]} center style={{ pointerEvents: 'none' }}>
        <span style={{ color: '#3a5878', fontSize: '9px', fontFamily: 'system-ui', whiteSpace: 'nowrap' }}>
          stellar catalog (3,200 ly)
        </span>
      </Html>
    </group>
  );
}

// ── Galactic center label ─────────────────────────────────
function GalacticCenterLabel() {
  return (
    <Html position={[0, 4, 0]} center style={{ pointerEvents: 'none' }}>
      <div style={{
        color: '#c8941880',
        fontSize: '10px',
        fontFamily: 'system-ui',
        whiteSpace: 'nowrap',
        textShadow: '0 0 6px rgba(0,0,0,0.9)',
        textAlign: 'center',
      }}>
        Galactic Center
      </div>
    </Html>
  );
}

// ── Arm labels ────────────────────────────────────────────
function ArmLabel({ label, angleDeg, radiusUnits, color }: { label: string; angleDeg: number; radiusUnits: number; color: string }) {
  const angle = angleDeg * DEG;
  const x = Math.cos(angle) * radiusUnits;
  const z = Math.sin(angle) * radiusUnits;
  return (
    <Html position={[x, 2, z]} center style={{ pointerEvents: 'none' }}>
      <span style={{ color, fontSize: '9px', fontFamily: 'system-ui', whiteSpace: 'nowrap', opacity: 0.6 }}>
        {label}
      </span>
    </Html>
  );
}

// ── Scene ─────────────────────────────────────────────────
interface Props {
  onSelectRegion?: (label: string) => void;
}

export function MilkyWayScene(_props: Props) {
  const controlsRef = useRef<CameraControlsImpl>(null);

  return (
    <>
      <ambientLight intensity={0.02} />
      <Stars radius={2000} depth={300} count={6000} factor={3} fade speed={0} />

      <Galaxy />

      {/* Distance rings centered on galaxy center */}
      <GalacticRing ly={10000} />
      <GalacticRing ly={25000} />
      <GalacticRing ly={50000} />

      <CatalogCircle />
      <SunMarker />
      <GalacticCenterLabel />

      {/* Arm labels — approximate positions along each arm */}
      <ArmLabel label="Perseus Arm"         angleDeg={-35}  radiusUnits={90}  color="#88aaff" />
      <ArmLabel label="Sagittarius Arm"     angleDeg={55}   radiusUnits={75}  color="#88aaff" />
      <ArmLabel label="Norma–Cygnus Arm"    angleDeg={145}  radiusUnits={95}  color="#88aaff" />
      <ArmLabel label="Scutum-Centaurus"    angleDeg={235}  radiusUnits={80}  color="#88aaff" />
      <ArmLabel label="Orion Spur"          angleDeg={8}    radiusUnits={110} color="#6080cc" />

      <CameraControls ref={controlsRef} />
    </>
  );
}

// ── Deterministic PRNG (mulberry32) ──────────────────────
function mulberry32(seed: number) {
  return function () {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
