import * as THREE from 'three';

export interface RingData {
  innerRadius: number;
  outerRadius: number;
  color: string;
  opacity: number;
}

export interface BodyData {
  id: string;
  name: string;
  type: 'star' | 'planet' | 'moon';
  parentId: string | null;
  /** Fixed world-space position for non-orbiting bodies (e.g. nearby stars). */
  position?: [number, number, number];
  orbitalRadius: number;
  orbitalPeriod: number;
  initialAngle: number;
  radius: number;
  color: string;
  emissive: string;
  emissiveIntensity: number;
  axialTilt: number;
  rotationPeriod: number;
  rings?: RingData;
  moons?: BodyData[];
  realRadiusKm?: number;
  realDistanceAU?: number;
  distanceLy?: number;
  spectralType?: string;
}

export const SUN_DATA: BodyData = {
  id: 'sun',
  name: 'Sun',
  type: 'star',
  parentId: null,
  orbitalRadius: 0,
  orbitalPeriod: 1,
  initialAngle: 0,
  radius: 4.0,
  color: '#FDB813',
  emissive: '#FDB813',
  emissiveIntensity: 1.5,
  axialTilt: 7.25,
  rotationPeriod: 609.12,
  realRadiusKm: 696000,
  realDistanceAU: 0,
};

export const PLANETS: BodyData[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    type: 'planet',
    parentId: 'sun',
    orbitalRadius: 333,
    orbitalPeriod: 87.97,
    initialAngle: 0.8,
    radius: 0.22,
    color: '#B5B5B5',
    emissive: '#000000',
    emissiveIntensity: 0,
    axialTilt: 0.03,
    rotationPeriod: 1407.6,
    realRadiusKm: 2439,
    realDistanceAU: 0.387,
  },
  {
    id: 'venus',
    name: 'Venus',
    type: 'planet',
    parentId: 'sun',
    orbitalRadius: 621,
    orbitalPeriod: 224.70,
    initialAngle: 2.1,
    radius: 0.48,
    color: '#E8CDA0',
    emissive: '#000000',
    emissiveIntensity: 0,
    axialTilt: 177.4,
    rotationPeriod: 5832.5,
    realRadiusKm: 6051,
    realDistanceAU: 0.723,
  },
  {
    id: 'earth',
    name: 'Earth',
    type: 'planet',
    parentId: 'sun',
    orbitalRadius: 860,
    orbitalPeriod: 365.25,
    initialAngle: 4.0,
    radius: 0.50,
    color: '#4FA3E0',
    emissive: '#000000',
    emissiveIntensity: 0,
    axialTilt: 23.4,
    rotationPeriod: 23.93,
    realRadiusKm: 6371,
    realDistanceAU: 1.0,
    moons: [
      {
        id: 'moon',
        name: 'Moon',
        type: 'moon',
        parentId: 'earth',
        orbitalRadius: 30.2,
        orbitalPeriod: 27.32,
        initialAngle: 1.2,
        radius: 0.14,
        color: '#AAAAAA',
        emissive: '#000000',
        emissiveIntensity: 0,
        axialTilt: 6.7,
        rotationPeriod: 655.7,
        realRadiusKm: 1737,
      },
    ],
  },
  {
    id: 'mars',
    name: 'Mars',
    type: 'planet',
    parentId: 'sun',
    orbitalRadius: 1310,
    orbitalPeriod: 686.97,
    initialAngle: 1.0,
    radius: 0.28,
    color: '#C1440E',
    emissive: '#000000',
    emissiveIntensity: 0,
    axialTilt: 25.2,
    rotationPeriod: 24.62,
    realRadiusKm: 3389,
    realDistanceAU: 1.524,
    moons: [
      {
        id: 'phobos',
        name: 'Phobos',
        type: 'moon',
        parentId: 'mars',
        orbitalRadius: 0.8,
        orbitalPeriod: 0.319,
        initialAngle: 0.5,
        radius: 0.06,
        color: '#8B7355',
        emissive: '#000000',
        emissiveIntensity: 0,
        axialTilt: 0,
        rotationPeriod: 7.66,
        realRadiusKm: 11,
      },
      {
        id: 'deimos',
        name: 'Deimos',
        type: 'moon',
        parentId: 'mars',
        orbitalRadius: 1.9,
        orbitalPeriod: 1.262,
        initialAngle: 3.0,
        radius: 0.05,
        color: '#9E8B72',
        emissive: '#000000',
        emissiveIntensity: 0,
        axialTilt: 0,
        rotationPeriod: 30.3,
        realRadiusKm: 6,
      },
    ],
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    type: 'planet',
    parentId: 'sun',
    orbitalRadius: 4473,
    orbitalPeriod: 4332.59,
    initialAngle: 3.5,
    radius: 1.20,
    color: '#C88B3A',
    emissive: '#000000',
    emissiveIntensity: 0,
    axialTilt: 3.1,
    rotationPeriod: 9.93,
    realRadiusKm: 71492,
    realDistanceAU: 5.203,
    moons: [
      {
        id: 'io',
        name: 'Io',
        type: 'moon',
        parentId: 'jupiter',
        orbitalRadius: 7.1,
        orbitalPeriod: 1.769,
        initialAngle: 0.2,
        radius: 0.16,
        color: '#FFD700',
        emissive: '#000000',
        emissiveIntensity: 0,
        axialTilt: 0,
        rotationPeriod: 42.5,
        realRadiusKm: 1821,
      },
      {
        id: 'europa',
        name: 'Europa',
        type: 'moon',
        parentId: 'jupiter',
        orbitalRadius: 11.3,
        orbitalPeriod: 3.551,
        initialAngle: 1.8,
        radius: 0.14,
        color: '#C8B89A',
        emissive: '#000000',
        emissiveIntensity: 0,
        axialTilt: 0,
        rotationPeriod: 85.2,
        realRadiusKm: 1561,
      },
      {
        id: 'ganymede',
        name: 'Ganymede',
        type: 'moon',
        parentId: 'jupiter',
        orbitalRadius: 18.0,
        orbitalPeriod: 7.155,
        initialAngle: 3.6,
        radius: 0.20,
        color: '#8C7853',
        emissive: '#000000',
        emissiveIntensity: 0,
        axialTilt: 0,
        rotationPeriod: 171.7,
        realRadiusKm: 2634,
      },
      {
        id: 'callisto',
        name: 'Callisto',
        type: 'moon',
        parentId: 'jupiter',
        orbitalRadius: 31.6,
        orbitalPeriod: 16.69,
        initialAngle: 5.0,
        radius: 0.18,
        color: '#6B5B45',
        emissive: '#000000',
        emissiveIntensity: 0,
        axialTilt: 0,
        rotationPeriod: 400.5,
        realRadiusKm: 2410,
      },
    ],
  },
  {
    id: 'saturn',
    name: 'Saturn',
    type: 'planet',
    parentId: 'sun',
    orbitalRadius: 8197,
    orbitalPeriod: 10759.22,
    initialAngle: 0.4,
    radius: 1.00,
    color: '#E4D191',
    emissive: '#000000',
    emissiveIntensity: 0,
    axialTilt: 26.7,
    rotationPeriod: 10.66,
    realRadiusKm: 60268,
    realDistanceAU: 9.537,
    rings: {
      innerRadius: 1.4,
      outerRadius: 2.4,
      color: '#C2B280',
      opacity: 0.75,
    },
    moons: [
      {
        id: 'titan',
        name: 'Titan',
        type: 'moon',
        parentId: 'saturn',
        orbitalRadius: 20.3,
        orbitalPeriod: 15.945,
        initialAngle: 2.4,
        radius: 0.16,
        color: '#DAA520',
        emissive: '#000000',
        emissiveIntensity: 0,
        axialTilt: 0,
        rotationPeriod: 382.7,
        realRadiusKm: 2574,
      },
    ],
  },
  {
    id: 'uranus',
    name: 'Uranus',
    type: 'planet',
    parentId: 'sun',
    orbitalRadius: 16493,
    orbitalPeriod: 30688.5,
    initialAngle: 2.7,
    radius: 0.65,
    color: '#7DE8E8',
    emissive: '#000000',
    emissiveIntensity: 0,
    axialTilt: 97.8,
    rotationPeriod: 17.24,
    realRadiusKm: 25559,
    realDistanceAU: 19.191,
    rings: {
      innerRadius: 1.6,
      outerRadius: 2.0,
      color: '#A0A0B0',
      opacity: 0.3,
    },
  },
  {
    id: 'neptune',
    name: 'Neptune',
    type: 'planet',
    parentId: 'sun',
    orbitalRadius: 25844,
    orbitalPeriod: 60195.0,
    initialAngle: 4.8,
    radius: 0.62,
    color: '#5B7FDB',
    emissive: '#000000',
    emissiveIntensity: 0,
    axialTilt: 28.3,
    rotationPeriod: 16.11,
    realRadiusKm: 24622,
    realDistanceAU: 30.069,
  },
  {
    id: 'pluto',
    name: 'Pluto',
    type: 'planet',
    parentId: 'sun',
    orbitalRadius: 33954,
    orbitalPeriod: 90560.0,
    initialAngle: 1.3,
    radius: 0.15,
    color: '#C1A87D',
    emissive: '#000000',
    emissiveIntensity: 0,
    axialTilt: 122.5,
    rotationPeriod: -153.3,
    realRadiusKm: 1188,
    realDistanceAU: 39.482,
    moons: [
      {
        id: 'charon',
        name: 'Charon',
        type: 'moon',
        parentId: 'pluto',
        orbitalRadius: 2.47,
        orbitalPeriod: 6.387,
        initialAngle: 0.9,
        radius: 0.08,
        color: '#9A9A9A',
        emissive: '#000000',
        emissiveIntensity: 0,
        axialTilt: 0,
        rotationPeriod: 153.3,
        realRadiusKm: 606,
      },
    ],
  },
];

// Nearby stars placed at real sky positions (RA/Dec → XYZ) with scale 50 units/ly.
// Sizes use real solar-radii ratios (Sun scene radius = 4.0 = 1 R☉).
export const NEARBY_STARS: BodyData[] = [
  {
    id: 'proxima-centauri',
    name: 'Proxima Centauri',
    type: 'star',
    parentId: null,
    position: [-10640, -26460, -8260],   // 4.24 ly · 7000
    orbitalRadius: 0, orbitalPeriod: 1, initialAngle: 0,
    radius: 0.56,                 // 0.14 R☉
    color: '#FF6040', emissive: '#FF4020', emissiveIntensity: 1.2,
    axialTilt: 0, rotationPeriod: 1800,
    realRadiusKm: 97700, distanceLy: 4.243, spectralType: 'M5Ve',
  },
  {
    id: 'alpha-centauri-a',
    name: 'Alpha Centauri A',
    type: 'star',
    parentId: null,
    position: [-11480, -26740, -9520],   // 4.37 ly · 7000
    orbitalRadius: 0, orbitalPeriod: 1, initialAngle: 0,
    radius: 4.88,                 // 1.22 R☉
    color: '#FFF5A0', emissive: '#FFE840', emissiveIntensity: 1.5,
    axialTilt: 0, rotationPeriod: 530,
    realRadiusKm: 849000, distanceLy: 4.370, spectralType: 'G2V',
  },
  {
    id: 'alpha-centauri-b',
    name: 'Alpha Centauri B',
    type: 'star',
    parentId: null,
    position: [-10360, -27020, -8540],   // same system, offset ~1000 units for separation
    orbitalRadius: 0, orbitalPeriod: 1, initialAngle: 0,
    radius: 3.44,                 // 0.86 R☉
    color: '#FFB060', emissive: '#FF9040', emissiveIntensity: 1.3,
    axialTilt: 0, rotationPeriod: 613,
    realRadiusKm: 598000, distanceLy: 4.370, spectralType: 'K1V',
  },
  {
    id: 'barnards-star',
    name: "Barnard's Star",
    type: 'star',
    parentId: null,
    position: [-420, 3360, -41580],     // 5.96 ly · 7000
    orbitalRadius: 0, orbitalPeriod: 1, initialAngle: 0,
    radius: 0.72,                 // 0.18 R☉
    color: '#FF5030', emissive: '#FF3010', emissiveIntensity: 1.1,
    axialTilt: 0, rotationPeriod: 7460,
    realRadiusKm: 125000, distanceLy: 5.958, spectralType: 'M4Ve',
  },
  {
    id: 'wolf-359',
    name: 'Wolf 359',
    type: 'star',
    parentId: null,
    position: [-52080, 6720, 14700],    // 7.78 ly · 7000
    orbitalRadius: 0, orbitalPeriod: 1, initialAngle: 0,
    radius: 0.64,                 // 0.16 R☉
    color: '#FF4825', emissive: '#FF2808', emissiveIntensity: 1.1,
    axialTilt: 0, rotationPeriod: 694,
    realRadiusKm: 111000, distanceLy: 7.775, spectralType: 'M6Ve',
  },
  {
    id: 'lalande-21185',
    name: 'Lalande 21185',
    type: 'star',
    parentId: null,
    position: [-45500, 34160, 11480],    // 8.29 ly · 7000
    orbitalRadius: 0, orbitalPeriod: 1, initialAngle: 0,
    radius: 1.56,                 // 0.39 R☉
    color: '#FF7040', emissive: '#FF5020', emissiveIntensity: 1.2,
    axialTilt: 0, rotationPeriod: 1296,
    realRadiusKm: 271000, distanceLy: 8.291, spectralType: 'M2V',
  },
  {
    id: 'sirius-a',
    name: 'Sirius A',
    type: 'star',
    parentId: null,
    position: [-11200, -17500, 56840],   // 8.66 ly · 7000
    orbitalRadius: 0, orbitalPeriod: 1, initialAngle: 0,
    radius: 6.84,                 // 1.71 R☉
    color: '#C0D8FF', emissive: '#A0C0FF', emissiveIntensity: 1.8,
    axialTilt: 0, rotationPeriod: 38.4,
    realRadiusKm: 1189800, distanceLy: 8.659, spectralType: 'A1V',
  },
];

export const ALL_BODIES: BodyData[] = [
  SUN_DATA,
  ...PLANETS,
  ...PLANETS.flatMap(p => p.moons ?? []),
  ...NEARBY_STARS,
];

const BODY_MAP = new Map<string, BodyData>(ALL_BODIES.map(b => [b.id, b]));

export function findBodyById(id: string): BodyData | undefined {
  return BODY_MAP.get(id);
}

export function computeWorldPosition(body: BodyData, simTime: number): THREE.Vector3 {
  if (body.position) {
    return new THREE.Vector3(body.position[0], body.position[1], body.position[2]);
  }

  const angle = body.initialAngle + (2 * Math.PI * simTime) / body.orbitalPeriod;
  const localX = Math.cos(angle) * body.orbitalRadius;
  const localZ = Math.sin(angle) * body.orbitalRadius;

  if (!body.parentId) {
    return new THREE.Vector3(localX, 0, localZ);
  }

  const parent = findBodyById(body.parentId);
  if (!parent) return new THREE.Vector3(localX, 0, localZ);

  const parentPos = computeWorldPosition(parent, simTime);
  return new THREE.Vector3(parentPos.x + localX, parentPos.y, parentPos.z + localZ);
}
