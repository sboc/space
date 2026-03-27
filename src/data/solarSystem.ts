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
    orbitalRadius: 18,
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
    orbitalRadius: 29,
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
    orbitalRadius: 36,
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
        orbitalRadius: 2.5,
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
    orbitalRadius: 49,
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
        orbitalRadius: 1.6,
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
        orbitalRadius: 2.8,
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
    orbitalRadius: 88,
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
        orbitalRadius: 3.6,
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
        orbitalRadius: 5.4,
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
        orbitalRadius: 7.8,
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
        orbitalRadius: 10.8,
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
    orbitalRadius: 103,
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
        orbitalRadius: 6.0,
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
    orbitalRadius: 115,
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
    orbitalRadius: 122,
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
];

export const ALL_BODIES: BodyData[] = [
  SUN_DATA,
  ...PLANETS,
  ...PLANETS.flatMap(p => p.moons ?? []),
];

export function findBodyById(id: string): BodyData | undefined {
  return ALL_BODIES.find(b => b.id === id);
}

export function computeWorldPosition(body: BodyData, simTime: number): THREE.Vector3 {
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
