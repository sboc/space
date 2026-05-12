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

// Scale reference:
//   Planet orbital distances from Sun: 1 unit = 174,000 km  (true scale)
//   Body radii + moon orbital distances: 1 unit = 58,000 km (3× visual boost so Sun = 12 units)
//   Sun true radius 696,000 km → 696,000/58,000 = 12.0 ✓

export const SUN_DATA: BodyData = {
  id: 'sun',
  name: 'Sun',
  type: 'star',
  parentId: null,
  orbitalRadius: 0,
  orbitalPeriod: 1,
  initialAngle: 0,
  radius: 12.0,           // 696,000 km / 58,000 = 12.0
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
    orbitalRadius: 333,     // 57,909,175 km / 174,000
    orbitalPeriod: 87.97,
    initialAngle: 0.8,
    radius: 0.042,          // 2,440 km / 58,000
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
    orbitalRadius: 622,     // 108,209,000 km / 174,000
    orbitalPeriod: 224.70,
    initialAngle: 2.1,
    radius: 0.104,          // 6,052 km / 58,000
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
    orbitalRadius: 860,     // 149,598,000 km / 174,000
    orbitalPeriod: 365.25,
    initialAngle: 4.0,
    radius: 0.110,          // 6,371 km / 58,000
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
        orbitalRadius: 6.63,  // 384,400 km / 58,000
        orbitalPeriod: 27.32,
        initialAngle: 1.2,
        radius: 0.030,        // 1,737 km / 58,000
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
    orbitalRadius: 1310,    // 227,937,000 km / 174,000
    orbitalPeriod: 686.97,
    initialAngle: 1.0,
    radius: 0.058,          // 3,390 km / 58,000
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
        orbitalRadius: 0.162, // 9,376 km / 58,000
        orbitalPeriod: 0.319,
        initialAngle: 0.5,
        radius: 0.010,        // 11 km / 58,000 = 0.0002 → minimum for visibility
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
        orbitalRadius: 0.405, // 23,463 km / 58,000
        orbitalPeriod: 1.262,
        initialAngle: 3.0,
        radius: 0.010,        // 6 km / 58,000 = 0.0001 → minimum for visibility
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
    id: 'ceres',
    name: 'Ceres',
    type: 'planet',
    parentId: 'sun',
    orbitalRadius: 2378,    // 413,690,000 km / 174,000
    orbitalPeriod: 1680.5,
    initialAngle: 0.6,
    radius: 0.010,          // 470 km / 58,000 = 0.008 → minimum for visibility
    color: '#908888',
    emissive: '#000000',
    emissiveIntensity: 0,
    axialTilt: 4.0,
    rotationPeriod: 9.07,
    realRadiusKm: 469,
    realDistanceAU: 2.77,
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    type: 'planet',
    parentId: 'sun',
    orbitalRadius: 4474,    // 778,412,000 km / 174,000
    orbitalPeriod: 4332.59,
    initialAngle: 3.5,
    radius: 1.232,          // 71,492 km / 58,000
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
        orbitalRadius: 7.27,  // 421,800 km / 58,000
        orbitalPeriod: 1.769,
        initialAngle: 0.2,
        radius: 0.031,        // 1,822 km / 58,000
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
        orbitalRadius: 11.57, // 671,100 km / 58,000
        orbitalPeriod: 3.551,
        initialAngle: 1.8,
        radius: 0.027,        // 1,561 km / 58,000
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
        orbitalRadius: 18.46, // 1,070,400 km / 58,000
        orbitalPeriod: 7.155,
        initialAngle: 3.6,
        radius: 0.045,        // 2,634 km / 58,000
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
        orbitalRadius: 32.46, // 1,882,700 km / 58,000
        orbitalPeriod: 16.69,
        initialAngle: 5.0,
        radius: 0.042,        // 2,410 km / 58,000
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
    orbitalRadius: 8200,    // 1,426,725,000 km / 174,000
    orbitalPeriod: 10759.22,
    initialAngle: 0.4,
    radius: 1.039,          // 60,268 km / 58,000
    color: '#E4D191',
    emissive: '#000000',
    emissiveIntensity: 0,
    axialTilt: 26.7,
    rotationPeriod: 10.66,
    realRadiusKm: 60268,
    realDistanceAU: 9.537,
    rings: {
      innerRadius: 1.2,     // D-ring inner edge ~66,900 km / 60,268 = 1.11
      outerRadius: 2.3,     // A-ring outer edge ~136,780 km / 60,268 = 2.27
      color: '#C2B280',
      opacity: 0.75,
    },
    moons: [
      {
        id: 'mimas',
        name: 'Mimas',
        type: 'moon',
        parentId: 'saturn',
        orbitalRadius: 3.20,  // 185,540 km / 58,000
        orbitalPeriod: 0.942,
        initialAngle: 1.1,
        radius: 0.010,        // 198 km / 58,000 = 0.003 → minimum for visibility
        color: '#C0B8A8',
        emissive: '#000000',
        emissiveIntensity: 0,
        axialTilt: 0,
        rotationPeriod: 22.6,
        realRadiusKm: 198,
      },
      {
        id: 'enceladus',
        name: 'Enceladus',
        type: 'moon',
        parentId: 'saturn',
        orbitalRadius: 4.10,  // 238,020 km / 58,000
        orbitalPeriod: 1.370,
        initialAngle: 3.7,
        radius: 0.010,        // 252 km / 58,000 = 0.004 → minimum for visibility
        color: '#F0EFEF',
        emissive: '#000000',
        emissiveIntensity: 0,
        axialTilt: 0,
        rotationPeriod: 32.9,
        realRadiusKm: 252,
      },
      {
        id: 'tethys',
        name: 'Tethys',
        type: 'moon',
        parentId: 'saturn',
        orbitalRadius: 5.08,  // 294,660 km / 58,000
        orbitalPeriod: 1.888,
        initialAngle: 5.5,
        radius: 0.010,        // 533 km / 58,000 = 0.009 → minimum for visibility
        color: '#D0CCCC',
        emissive: '#000000',
        emissiveIntensity: 0,
        axialTilt: 1.1,
        rotationPeriod: 45.3,
        realRadiusKm: 533,
      },
      {
        id: 'dione',
        name: 'Dione',
        type: 'moon',
        parentId: 'saturn',
        orbitalRadius: 6.51,  // 377,400 km / 58,000
        orbitalPeriod: 2.737,
        initialAngle: 0.3,
        radius: 0.010,        // 562 km / 58,000 = 0.010
        color: '#C8C8C0',
        emissive: '#000000',
        emissiveIntensity: 0,
        axialTilt: 0,
        rotationPeriod: 65.7,
        realRadiusKm: 562,
      },
      {
        id: 'rhea',
        name: 'Rhea',
        type: 'moon',
        parentId: 'saturn',
        orbitalRadius: 9.09,  // 527,040 km / 58,000
        orbitalPeriod: 4.518,
        initialAngle: 2.8,
        radius: 0.013,        // 764 km / 58,000
        color: '#C0BCAC',
        emissive: '#000000',
        emissiveIntensity: 0,
        axialTilt: 0,
        rotationPeriod: 108.4,
        realRadiusKm: 764,
      },
      {
        id: 'titan',
        name: 'Titan',
        type: 'moon',
        parentId: 'saturn',
        orbitalRadius: 21.07, // 1,221,870 km / 58,000
        orbitalPeriod: 15.945,
        initialAngle: 2.4,
        radius: 0.044,        // 2,575 km / 58,000
        color: '#DAA520',
        emissive: '#000000',
        emissiveIntensity: 0,
        axialTilt: 0,
        rotationPeriod: 382.7,
        realRadiusKm: 2574,
      },
      {
        id: 'iapetus',
        name: 'Iapetus',
        type: 'moon',
        parentId: 'saturn',
        orbitalRadius: 61.39, // 3,560,820 km / 58,000
        orbitalPeriod: 79.33,
        initialAngle: 4.1,
        radius: 0.013,        // 735 km / 58,000
        color: '#806040',
        emissive: '#000000',
        emissiveIntensity: 0,
        axialTilt: 0,
        rotationPeriod: 1904.0,
        realRadiusKm: 735,
      },
    ],
  },
  {
    id: 'uranus',
    name: 'Uranus',
    type: 'planet',
    parentId: 'sun',
    orbitalRadius: 16500,   // 2,870,972,000 km / 174,000
    orbitalPeriod: 30688.5,
    initialAngle: 2.7,
    radius: 0.441,          // 25,559 km / 58,000
    color: '#7DE8E8',
    emissive: '#000000',
    emissiveIntensity: 0,
    axialTilt: 97.8,
    rotationPeriod: 17.24,
    realRadiusKm: 25559,
    realDistanceAU: 19.191,
    rings: {
      innerRadius: 1.64,    // 6-ring at 41,837 km / 25,559 = 1.637
      outerRadius: 2.00,    // epsilon ring at 51,149 km / 25,559 = 2.002
      color: '#A0A0B0',
      opacity: 0.3,
    },
    moons: [
      {
        id: 'miranda',
        name: 'Miranda',
        type: 'moon',
        parentId: 'uranus',
        orbitalRadius: 2.24,  // 129,900 km / 58,000
        orbitalPeriod: 1.413,
        initialAngle: 0.4,
        radius: 0.010,        // 236 km / 58,000 = 0.004 → minimum for visibility
        color: '#A09888',
        emissive: '#000000',
        emissiveIntensity: 0,
        axialTilt: 0,
        rotationPeriod: 33.9,
        realRadiusKm: 235,
      },
      {
        id: 'ariel',
        name: 'Ariel',
        type: 'moon',
        parentId: 'uranus',
        orbitalRadius: 3.29,  // 191,020 km / 58,000
        orbitalPeriod: 2.520,
        initialAngle: 2.2,
        radius: 0.010,        // 579 km / 58,000 = 0.010
        color: '#C0BCAC',
        emissive: '#000000',
        emissiveIntensity: 0,
        axialTilt: 0,
        rotationPeriod: 60.5,
        realRadiusKm: 579,
      },
      {
        id: 'umbriel',
        name: 'Umbriel',
        type: 'moon',
        parentId: 'uranus',
        orbitalRadius: 4.59,  // 266,300 km / 58,000
        orbitalPeriod: 4.144,
        initialAngle: 4.6,
        radius: 0.010,        // 585 km / 58,000 = 0.010
        color: '#706860',
        emissive: '#000000',
        emissiveIntensity: 0,
        axialTilt: 0,
        rotationPeriod: 99.5,
        realRadiusKm: 585,
      },
      {
        id: 'titania',
        name: 'Titania',
        type: 'moon',
        parentId: 'uranus',
        orbitalRadius: 7.52,  // 435,910 km / 58,000
        orbitalPeriod: 8.706,
        initialAngle: 1.7,
        radius: 0.014,        // 789 km / 58,000
        color: '#A89880',
        emissive: '#000000',
        emissiveIntensity: 0,
        axialTilt: 0,
        rotationPeriod: 208.9,
        realRadiusKm: 789,
      },
      {
        id: 'oberon',
        name: 'Oberon',
        type: 'moon',
        parentId: 'uranus',
        orbitalRadius: 10.06, // 583,520 km / 58,000
        orbitalPeriod: 13.463,
        initialAngle: 3.3,
        radius: 0.013,        // 761 km / 58,000
        color: '#908070',
        emissive: '#000000',
        emissiveIntensity: 0,
        axialTilt: 0,
        rotationPeriod: 323.1,
        realRadiusKm: 761,
      },
    ],
  },
  {
    id: 'neptune',
    name: 'Neptune',
    type: 'planet',
    parentId: 'sun',
    orbitalRadius: 25853,   // 4,498,253,000 km / 174,000
    orbitalPeriod: 60195.0,
    initialAngle: 4.8,
    radius: 0.424,          // 24,622 km / 58,000
    color: '#5B7FDB',
    emissive: '#000000',
    emissiveIntensity: 0,
    axialTilt: 28.3,
    rotationPeriod: 16.11,
    realRadiusKm: 24622,
    realDistanceAU: 30.069,
    moons: [
      {
        id: 'triton',
        name: 'Triton',
        type: 'moon',
        parentId: 'neptune',
        orbitalRadius: 6.12,  // 354,759 km / 58,000
        orbitalPeriod: -5.877,
        initialAngle: 2.0,
        radius: 0.023,        // 1,353 km / 58,000
        color: '#C8B4A0',
        emissive: '#000000',
        emissiveIntensity: 0,
        axialTilt: 0,
        rotationPeriod: -141.0,
        realRadiusKm: 1353,
      },
    ],
  },
  {
    id: 'pluto',
    name: 'Pluto',
    type: 'planet',
    parentId: 'sun',
    orbitalRadius: 33942,   // 5,906,380,000 km / 174,000
    orbitalPeriod: 90560.0,
    initialAngle: 1.3,
    radius: 0.020,          // 1,188 km / 58,000
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
        orbitalRadius: 0.302, // 17,536 km / 58,000
        orbitalPeriod: 6.387,
        initialAngle: 0.9,
        radius: 0.010,        // 606 km / 58,000 = 0.010
        color: '#9A9A9A',
        emissive: '#000000',
        emissiveIntensity: 0,
        axialTilt: 0,
        rotationPeriod: 153.3,
        realRadiusKm: 606,
      },
    ],
  },
  {
    id: 'haumea',
    name: 'Haumea',
    type: 'planet',
    parentId: 'sun',
    orbitalRadius: 37084,   // 43.13 AU × 149,598,000 km / 174,000
    orbitalPeriod: 103774.0,
    initialAngle: 2.1,
    radius: 0.015,          // 780 km / 58,000 = 0.013 → minimum for visibility
    color: '#E8E0D0',
    emissive: '#000000',
    emissiveIntensity: 0,
    axialTilt: 28.2,
    rotationPeriod: 3.92,
    realRadiusKm: 780,
    realDistanceAU: 43.13,
  },
  {
    id: 'makemake',
    name: 'Makemake',
    type: 'planet',
    parentId: 'sun',
    orbitalRadius: 39376,   // 45.79 AU × 149,598,000 km / 174,000
    orbitalPeriod: 111867.0,
    initialAngle: 5.2,
    radius: 0.015,          // 715 km / 58,000 = 0.012 → minimum for visibility
    color: '#C8A880',
    emissive: '#000000',
    emissiveIntensity: 0,
    axialTilt: 29.0,
    rotationPeriod: 22.5,
    realRadiusKm: 715,
    realDistanceAU: 45.79,
  },
  {
    id: 'eris',
    name: 'Eris',
    type: 'planet',
    parentId: 'sun',
    orbitalRadius: 58339,   // 67.84 AU × 149,598,000 km / 174,000
    orbitalPeriod: 204199.0,
    initialAngle: 3.8,
    radius: 0.020,          // 1,163 km / 58,000
    color: '#D8D0C0',
    emissive: '#000000',
    emissiveIntensity: 0,
    axialTilt: 44.0,
    rotationPeriod: 25.9,
    realRadiusKm: 1163,
    realDistanceAU: 67.84,
  },
];

// Nearby stars at real sky positions (RA/Dec → XYZ) with scale 50 units/ly.
// Sizes use real solar-radii ratios (Sun scene radius = 12.0 = 1 R☉).
export const NEARBY_STARS: BodyData[] = [
  {
    id: 'proxima-centauri',
    name: 'Proxima Centauri',
    type: 'star',
    parentId: null,
    position: [-10640, -26460, -8260],   // 4.24 ly · 7000
    orbitalRadius: 0, orbitalPeriod: 1, initialAngle: 0,
    radius: 1.68,                 // 0.14 R☉ × 12.0
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
    radius: 14.64,                // 1.22 R☉ × 12.0
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
    radius: 10.32,                // 0.86 R☉ × 12.0
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
    radius: 2.16,                 // 0.18 R☉ × 12.0
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
    radius: 1.92,                 // 0.16 R☉ × 12.0
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
    radius: 4.68,                 // 0.39 R☉ × 12.0
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
    radius: 20.52,                // 1.71 R☉ × 12.0
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
