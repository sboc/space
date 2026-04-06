import * as THREE from 'three';
import { type RGB, fbm, lerp, clamp, lerpColor, createTexture } from './noise';

// ---- Planet texture generators --------------------------------------------

function createMercuryTexture() {
  return createTexture(256, 128, (nx, ny) => {
    const base = fbm(nx * 5, ny * 5, 4);
    const craters = fbm(nx * 14 + 1.3, ny * 14 + 2.7, 3);
    const fine = fbm(nx * 24, ny * 24, 2) * 0.3;
    const v = 100 + base * 75 + craters * 25 + fine * 15;
    return [v, v - 4, v - 6];
  });
}

function createVenusTexture() {
  return createTexture(256, 128, (nx, ny) => {
    const turb = fbm(nx * 3, ny * 3) * 0.25;
    const bandY = (ny + turb) % 1;
    const band = Math.sin(bandY * Math.PI * 10) * 0.5 + 0.5;
    const detail = fbm(nx * 9, ny * 9, 3);
    const t = band * 0.55 + detail * 0.35;
    return [210 + t * 35, 175 + t * 25, 100 + t * 10];
  });
}

function createEarthTexture() {
  return createTexture(512, 256, (nx, ny) => {
    const continent = fbm(nx * 3 + 1.1, ny * 3 + 0.7, 5);
    const detail = fbm(nx * 9, ny * 9, 3);
    const isLand = continent > 0.53;

    const pole = ny < 0.5 ? 0 : 1;
    const poleBlend = Math.max(0, 1 - Math.abs(ny - pole) / 0.1);
    if (poleBlend > 0) {
      const base: RGB = isLand ? [120, 110, 90] : [30, 80, 160];
      const snow: RGB = [235, 242, 255];
      return lerpColor(base, snow, poleBlend);
    }

    if (isLand) {
      const lat = Math.abs(ny - 0.5) * 2;
      const tropical = clamp(1 - lat * 2.5, 0, 1);
      return [
        lerp(130, 145, detail) - tropical * 20,
        lerp(115, 140, detail) + tropical * 15,
        lerp(65,  80,  detail) - tropical * 20,
      ];
    }

    const deep = clamp(0.55 - continent, 0, 0.55) / 0.55;
    return [
      20 + deep * 20 + detail * 12,
      65 + deep * 35 + detail * 20,
      150 + deep * 45 + detail * 20,
    ];
  });
}

function createMarsTexture() {
  return createTexture(256, 128, (nx, ny) => {
    const terrain = fbm(nx * 4 + 0.5, ny * 4 + 0.3, 4);
    const dust = fbm(nx * 11, ny * 11, 3);

    const northPole = clamp(1 - ny / 0.09, 0, 1);
    const southPole = clamp(1 - (1 - ny) / 0.09, 0, 1);
    const poleAmt = Math.max(northPole, southPole);
    if (poleAmt > 0) {
      const base: RGB = [180 + terrain * 35, 60 + terrain * 20, 30 + terrain * 12];
      return lerpColor(base, [230, 238, 245], poleAmt);
    }

    return [
      165 + terrain * 55 + dust * 18,
      55  + terrain * 32 + dust * 12,
      25  + terrain * 18 + dust * 8,
    ];
  });
}

function createJupiterTexture() {
  const bands: RGB[] = [
    [210, 180, 130], [160, 100,  55], [220, 195, 150], [185, 120,  55],
    [205, 170, 110], [145,  88,  42], [230, 205, 165], [175, 115,  60],
    [150,  90,  45], [215, 185, 135], [170, 108,  52], [140,  82,  38],
  ];

  return createTexture(512, 256, (nx, ny) => {
    const turb1 = fbm(nx * 2.5, ny * 5, 4) * 0.18;
    const turb2 = fbm(nx * 1.5 + 4, ny * 3 + 2, 3) * 0.07;
    const bandY = ((ny + turb1 + turb2) % 1 + 1) % 1;
    const bandPos = bandY * bands.length;
    const idx = Math.floor(bandPos) % bands.length;
    const frac = bandPos - Math.floor(bandPos);
    const smooth_t = frac * frac * (3 - 2 * frac);
    let [r, g, b] = lerpColor(bands[idx], bands[(idx + 1) % bands.length], smooth_t);

    const streak = fbm(nx * 18, ny * 18, 2) * 22 - 11;
    r += streak * 0.8;
    g += streak * 0.6;
    b += streak * 0.3;

    // Great Red Spot
    const dx = ((nx - 0.28 + 1.5) % 1) - 0.5;
    const dy = (ny - 0.40) * 3.5;
    const spotDist = (dx * dx) / 0.006 + dy * dy;
    if (spotDist < 1) {
      const amt = clamp(1 - spotDist, 0, 1);
      r = lerp(r, 195, amt * 0.85);
      g = lerp(g,  72, amt * 0.85);
      b = lerp(b,  48, amt * 0.85);
    }

    return [r, g, b];
  });
}

function createSaturnTexture() {
  return createTexture(512, 256, (nx, ny) => {
    const turb = fbm(nx * 2, ny * 4, 4) * 0.13;
    const bandY = (ny + turb) % 1;
    const band = Math.sin(bandY * Math.PI * 9) * 0.5 + 0.5;
    const detail = fbm(nx * 10, ny * 10, 3);
    const t = band * 0.5 + detail * 0.25;
    return [210 + t * 30, 192 + t * 18, 118 + t * 14];
  });
}

function createUranusTexture() {
  return createTexture(256, 128, (nx, ny) => {
    const subtle = fbm(nx * 2.5, ny * 1.5, 3) * 0.12;
    const polarDim = 1 - clamp(Math.abs(ny - 0.5) * 2 - 0.4, 0, 1) * 0.18;
    const t = subtle;
    return [
      Math.floor((95 + t * 35) * polarDim),
      Math.floor((215 + t * 18) * polarDim),
      Math.floor((220 + t * 12) * polarDim),
    ];
  });
}

function createNeptuneTexture() {
  return createTexture(256, 128, (nx, ny) => {
    const clouds = fbm(nx * 4 + 1.7, ny * 4 + 0.9, 4) * 0.35;
    const streak = fbm(nx * 12, ny * 4, 2) * 0.12;

    const dx = ((nx - 0.58 + 1.5) % 1) - 0.5;
    const dy = (ny - 0.42) * 3;
    const spotDist = (dx * dx) / 0.008 + dy * dy;
    const spotAmt = spotDist < 1 ? clamp(1 - spotDist, 0, 1) * 0.45 : 0;

    const t = clouds + streak;
    return [
      38 + t * 45 - spotAmt * 15,
      65 + t * 50 - spotAmt * 10,
      185 + t * 45 + spotAmt * 25,
    ];
  });
}

// ---- Moon texture generators ----------------------------------------------

function createMoonTexture() {
  return createTexture(256, 128, (nx, ny) => {
    const large = fbm(nx * 2.5, ny * 2.5, 4);
    const detail = fbm(nx * 11, ny * 11, 3);
    const base = large < 0.42 ? 80 + detail * 35 : 150 + detail * 35;
    return [base, base, base - 4];
  });
}

function createIoTexture() {
  return createTexture(256, 128, (nx, ny) => {
    const base = fbm(nx * 4 + 0.3, ny * 4 + 1.1, 4);
    const volcanic = fbm(nx * 7 + 3.1, ny * 7 + 2.7, 3);
    const frost = fbm(nx * 13 + 5, ny * 13 + 4, 2);
    if (frost > 0.70) { const v = 220 + frost * 30; return [v, v, v - 10]; }
    if (volcanic > 0.62) return [180 + base * 30, 65 + base * 25, 15 + base * 15];
    return [220 + base * 28, 185 + base * 22, 25 + base * 25];
  });
}

function createEuropaTexture() {
  return createTexture(256, 128, (nx, ny) => {
    const ice = fbm(nx * 3, ny * 3, 4);
    const crackA = Math.abs(fbm(nx * 12, ny * 2.5, 2) - 0.5) < 0.07;
    const crackB = Math.abs(fbm(nx * 2.5 + 2, ny * 12 + 3, 2) - 0.5) < 0.06;
    const base: RGB = [190 + ice * 45, 183 + ice * 40, 200 + ice * 40];
    return (crackA || crackB)
      ? lerpColor(base, [155, 105, 88], 0.6)
      : base;
  });
}

function createGanymedeTexture() {
  return createTexture(256, 128, (nx, ny) => {
    const region = fbm(nx * 2.5, ny * 2.5, 4);
    const detail = fbm(nx * 9, ny * 9, 3);
    const v = region < 0.44 ? 85 + detail * 42 : 148 + detail * 32;
    return [v, v - 5, v - 9];
  });
}

function createCallistoTexture() {
  return createTexture(256, 128, (nx, ny) => {
    const base = fbm(nx * 5, ny * 5, 4);
    const v = 68 + base * 62;
    return [v, v - 4, v - 7];
  });
}

function createTitanTexture() {
  return createTexture(256, 128, (nx, ny) => {
    const haze = fbm(nx * 3, ny * 3, 4);
    const band = Math.sin(ny * Math.PI * 5) * 0.08 + 0.5;
    const t = haze * 0.65 + band * 0.35;
    return [188 + t * 32, 130 + t * 22, 45 + t * 12];
  });
}

function createRockyMoonTexture(baseR: number, baseG: number, baseB: number) {
  return createTexture(256, 128, (nx, ny) => {
    const n = fbm(nx * 7, ny * 7, 4);
    return [baseR + n * 40 - 20, baseG + n * 36 - 18, baseB + n * 32 - 16];
  });
}

// ---- Sun texture generators -----------------------------------------------

function createSunTexture() {
  const spots: [number, number, number, number][] = [
    [0.17, 0.44, 0.030, 0.70],
    [0.51, 0.53, 0.024, 0.65],
    [0.73, 0.41, 0.022, 0.62],
    [0.35, 0.60, 0.017, 0.72],
    [0.61, 0.37, 0.013, 0.66],
    [0.87, 0.56, 0.020, 0.68],
    [0.44, 0.30, 0.015, 0.60],
  ];

  return createTexture(512, 256, (nx, ny) => {
    // Granulation: two scales merged with contrast boost
    const g1 = fbm(nx * 22, ny * 22, 3);
    const g2 = fbm(nx * 48 + 1.7, ny * 48 + 3.1, 2);
    const gran = clamp(g1 * 0.75 + g2 * 0.25, 0, 1);
    const boosted = gran * gran * (3 - 2 * gran);

    let r = lerp(195, 255, boosted);
    let g = lerp(82,  228, boosted);
    let b = lerp(8,   95,  boosted);

    // Sunspots: penumbra + umbra darkening
    let spotDim = 1.0;
    for (const [sx, sy, sr, darkness] of spots) {
      const dx = nx - sx;
      const dy = (ny - sy) * 2; // compensate for UV aspect ratio
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < sr * 3.2) {
        const penT = clamp(1 - dist / (sr * 3.2), 0, 1);
        const umbT = clamp(1 - dist / sr, 0, 1);
        const dim = 1 - (penT * 0.35 + umbT * darkness * 0.65);
        if (dim < spotDim) spotDim = dim;
      }
    }
    r *= spotDim;
    g *= spotDim;
    b *= spotDim;

    // Faculae: subtle bright patches
    const fac = fbm(nx * 9 + 2.3, ny * 9 + 1.1, 3);
    if (fac > 0.70) {
      const amt = (fac - 0.70) / 0.30;
      r = clamp(r + amt * 28, 0, 255);
      g = clamp(g + amt * 18, 0, 255);
      b = clamp(b + amt * 8,  0, 255);
    }

    return [r, g, b];
  });
}

function createCoronaTexture(): THREE.CanvasTexture {
  const S = 256;
  const canvas = document.createElement('canvas');
  canvas.width = S;
  canvas.height = S;
  const ctx = canvas.getContext('2d')!;
  const c = S / 2;
  const grad = ctx.createRadialGradient(c, c, S * 0.16, c, c, c);
  grad.addColorStop(0.00, 'rgba(255, 220, 120, 0.35)');
  grad.addColorStop(0.25, 'rgba(255, 175,  60, 0.18)');
  grad.addColorStop(0.50, 'rgba(255, 120,  20, 0.07)');
  grad.addColorStop(0.75, 'rgba(255,  80,   5, 0.02)');
  grad.addColorStop(1.00, 'rgba(255,  30,   0, 0.00)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, S, S);
  return new THREE.CanvasTexture(canvas);
}

// ---- Texture cache & accessors --------------------------------------------

const textureCache = new Map<string, THREE.CanvasTexture>();

export function getBodyTexture(id: string): THREE.CanvasTexture {
  if (textureCache.has(id)) return textureCache.get(id)!;

  let texture: THREE.CanvasTexture;
  switch (id) {
    case 'mercury':  texture = createMercuryTexture(); break;
    case 'venus':    texture = createVenusTexture();   break;
    case 'earth':    texture = createEarthTexture();   break;
    case 'mars':     texture = createMarsTexture();    break;
    case 'jupiter':  texture = createJupiterTexture(); break;
    case 'saturn':   texture = createSaturnTexture();  break;
    case 'uranus':   texture = createUranusTexture();  break;
    case 'neptune':  texture = createNeptuneTexture(); break;
    case 'moon':     texture = createMoonTexture();    break;
    case 'io':       texture = createIoTexture();      break;
    case 'europa':   texture = createEuropaTexture();  break;
    case 'ganymede': texture = createGanymedeTexture(); break;
    case 'callisto': texture = createCallistoTexture(); break;
    case 'titan':    texture = createTitanTexture();   break;
    case 'phobos':   texture = createRockyMoonTexture(118, 103, 78); break;
    case 'deimos':   texture = createRockyMoonTexture(133, 120, 96); break;
    default:         texture = createRockyMoonTexture(148, 143, 138); break;
  }

  textureCache.set(id, texture);
  return texture;
}

export function getSunTexture(): THREE.CanvasTexture {
  if (!textureCache.has('sun')) textureCache.set('sun', createSunTexture());
  return textureCache.get('sun')!;
}

export function getCoronaTexture(): THREE.CanvasTexture {
  if (!textureCache.has('sun-corona')) textureCache.set('sun-corona', createCoronaTexture());
  return textureCache.get('sun-corona')!;
}

export function getStarCoronaTexture(r: number, g: number, b: number): THREE.CanvasTexture {
  const key = `corona-${r}-${g}-${b}`;
  if (textureCache.has(key)) return textureCache.get(key)!;
  const S = 256;
  const canvas = document.createElement('canvas');
  canvas.width = S; canvas.height = S;
  const ctx = canvas.getContext('2d')!;
  const c = S / 2;
  const grad = ctx.createRadialGradient(c, c, S * 0.12, c, c, c);
  grad.addColorStop(0.00, `rgba(${r},${g},${b},0.45)`);
  grad.addColorStop(0.25, `rgba(${r},${g},${b},0.22)`);
  grad.addColorStop(0.50, `rgba(${r},${g},${b},0.08)`);
  grad.addColorStop(0.75, `rgba(${r},${g},${b},0.02)`);
  grad.addColorStop(1.00, `rgba(${r},${g},${b},0.00)`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, S, S);
  const tex = new THREE.CanvasTexture(canvas);
  textureCache.set(key, tex);
  return tex;
}

// ---- Per-body PBR material properties ------------------------------------

export const BODY_ROUGHNESS: Record<string, number> = {
  mercury:  0.85,
  venus:    0.60,
  earth:    0.50,
  mars:     0.82,
  jupiter:  0.50,
  saturn:   0.55,
  uranus:   0.40,
  neptune:  0.40,
  moon:     0.88,
  io:       0.70,
  europa:   0.40,
  ganymede: 0.82,
  callisto: 0.88,
  titan:    0.65,
  phobos:   0.90,
  deimos:   0.90,
};

export const BODY_METALNESS: Record<string, number> = {
  earth:  0.08,
  europa: 0.05,
};
