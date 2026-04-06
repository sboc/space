// Comprehensive named star catalog for the interstellar view.
//
// Position formula (equatorial → Cartesian):
//   x = d · cos(dec) · cos(ra)
//   y = d · sin(dec)             (Y-up = celestial north)
//   z = d · cos(dec) · sin(ra)
// where d = distLy × scene scale (5 units/ly).
//
// RA in decimal degrees (0–360), Dec in decimal degrees (−90…+90).
// glowFactor: 1 = dim M-dwarf, 5 = luminous supergiant.
// All distances are in light-years (Hipparcos / recent measurements).

export interface CatalogStar {
  id: string;
  name: string;
  raDeg: number;
  decDeg: number;
  distLy: number;
  spectralType: string;
  color: string;
  glowFactor: number;
  /** Small XYZ offset in ly for binary companions to prevent overlap. */
  offset?: [number, number, number];
}

export const STAR_CATALOG: CatalogStar[] = [

  // ══════════════════════════════════════════════════════════
  // VERY NEAR (< 5 ly)
  // ══════════════════════════════════════════════════════════
  { id: 'proxima-centauri',  name: 'Proxima Cen',         raDeg: 217.43, decDeg: -62.68, distLy:    4.24, spectralType: 'M5Ve',    color: '#FF6040', glowFactor: 1   },
  { id: 'alpha-centauri-a',  name: 'α Cen A',             raDeg: 219.90, decDeg: -60.84, distLy:    4.37, spectralType: 'G2V',     color: '#FFF5A0', glowFactor: 2   },
  { id: 'alpha-centauri-b',  name: 'α Cen B',             raDeg: 219.90, decDeg: -60.84, distLy:    4.37, spectralType: 'K1V',     color: '#FFB060', glowFactor: 1.5, offset: [0.10, 0, 0.10] },

  // ══════════════════════════════════════════════════════════
  // NEAR (5–15 ly)
  // ══════════════════════════════════════════════════════════
  { id: 'barnards-star',     name: "Barnard's Star",       raDeg: 269.45, decDeg:   4.69, distLy:    5.96, spectralType: 'M4Ve',    color: '#FF5030', glowFactor: 1   },
  { id: 'wolf-359',          name: 'Wolf 359',             raDeg: 164.12, decDeg:   7.02, distLy:    7.78, spectralType: 'M6Ve',    color: '#FF4825', glowFactor: 1   },
  { id: 'lalande-21185',     name: 'Lalande 21185',        raDeg: 165.83, decDeg:  35.97, distLy:    8.29, spectralType: 'M2V',     color: '#FF7040', glowFactor: 1   },
  { id: 'sirius-a',          name: 'Sirius',               raDeg: 101.29, decDeg: -16.72, distLy:    8.66, spectralType: 'A1V',     color: '#C8E0FF', glowFactor: 3   },
  { id: 'uv-ceti-a',         name: 'UV Ceti A',            raDeg:  24.68, decDeg: -17.95, distLy:    8.73, spectralType: 'M5.5Ve',  color: '#FF4020', glowFactor: 1   },
  { id: 'uv-ceti-b',         name: 'UV Ceti B',            raDeg:  24.68, decDeg: -17.95, distLy:    8.73, spectralType: 'M6Ve',    color: '#FF3010', glowFactor: 1,   offset: [0.10, 0, 0.08] },
  { id: 'ross-154',          name: 'Ross 154',             raDeg: 282.45, decDeg: -23.83, distLy:    9.70, spectralType: 'M3.5Ve',  color: '#FF5530', glowFactor: 1   },
  { id: 'ross-248',          name: 'Ross 248',             raDeg: 355.48, decDeg:  44.18, distLy:   10.32, spectralType: 'M5.5Ve',  color: '#FF4020', glowFactor: 1   },
  { id: 'epsilon-eridani',   name: 'ε Eridani',            raDeg:  53.23, decDeg:  -9.46, distLy:   10.52, spectralType: 'K2V',     color: '#FF9040', glowFactor: 1.5 },
  { id: 'lacaille-9352',     name: 'Lacaille 9352',        raDeg: 346.47, decDeg: -35.85, distLy:   10.74, spectralType: 'M1.5Ve',  color: '#FF6840', glowFactor: 1   },
  { id: 'ross-128',          name: 'Ross 128',             raDeg: 176.93, decDeg:   0.80, distLy:   10.94, spectralType: 'M4Ve',    color: '#FF4820', glowFactor: 1   },
  { id: 'ez-aquarii',        name: 'EZ Aquarii',           raDeg: 339.64, decDeg: -15.30, distLy:   11.27, spectralType: 'M5Ve',    color: '#FF4020', glowFactor: 1   },
  { id: '61-cygni-a',        name: '61 Cyg A',             raDeg: 316.73, decDeg:  38.75, distLy:   11.37, spectralType: 'K5Ve',    color: '#FFB060', glowFactor: 1.5 },
  { id: '61-cygni-b',        name: '61 Cyg B',             raDeg: 316.73, decDeg:  38.75, distLy:   11.37, spectralType: 'K7Ve',    color: '#FF9848', glowFactor: 1.2, offset: [0.10, 0, 0.08] },
  { id: 'procyon-a',         name: 'Procyon',              raDeg: 114.83, decDeg:   5.22, distLy:   11.46, spectralType: 'F5IV',    color: '#FFF8D0', glowFactor: 2   },
  { id: 'struve-2398',       name: 'Struve 2398',          raDeg: 280.70, decDeg:  59.63, distLy:   11.52, spectralType: 'M3Ve',    color: '#FF5030', glowFactor: 1   },
  { id: 'groombridge-34',    name: 'Groombridge 34',       raDeg:   4.59, decDeg:  44.02, distLy:   11.62, spectralType: 'M1.5Ve',  color: '#FF6840', glowFactor: 1   },
  { id: 'dx-cancri',         name: 'DX Cancri',            raDeg: 127.45, decDeg:  26.77, distLy:   11.83, spectralType: 'M6Ve',    color: '#FF3510', glowFactor: 1   },
  { id: 'epsilon-indi',      name: 'ε Indi',               raDeg: 330.84, decDeg: -56.79, distLy:   11.87, spectralType: 'K5Ve',    color: '#FFB060', glowFactor: 1.5 },
  { id: 'tau-ceti',          name: 'τ Ceti',               raDeg:  26.02, decDeg: -15.94, distLy:   11.91, spectralType: 'G8V',     color: '#FFE090', glowFactor: 1.5 },
  { id: 'yz-ceti',           name: 'YZ Ceti',              raDeg:  18.13, decDeg: -16.98, distLy:   12.13, spectralType: 'M4.5Ve',  color: '#FF4820', glowFactor: 1   },
  { id: 'luyten-star',       name: "Luyten's Star",        raDeg: 111.85, decDeg:   5.22, distLy:   12.36, spectralType: 'M3.5Ve',  color: '#FF5530', glowFactor: 1   },
  { id: 'teegardens-star',   name: "Teegarden's Star",     raDeg:  43.25, decDeg:  16.88, distLy:   12.49, spectralType: 'M7Ve',    color: '#FF2808', glowFactor: 1   },
  { id: 'kapteyn',           name: "Kapteyn's Star",       raDeg:  77.92, decDeg: -45.02, distLy:   12.76, spectralType: 'M1.5VIp', color: '#FF6040', glowFactor: 1   },
  { id: 'lacaille-8760',     name: 'Lacaille 8760',        raDeg: 319.31, decDeg: -38.87, distLy:   12.87, spectralType: 'M0Ve',    color: '#FF7040', glowFactor: 1   },
  { id: 'kruger-60',         name: 'Kruger 60',            raDeg: 337.00, decDeg:  57.69, distLy:   13.15, spectralType: 'M3Ve',    color: '#FF5030', glowFactor: 1   },
  { id: 'ross-614',          name: 'Ross 614',             raDeg:  97.35, decDeg:  -2.82, distLy:   13.35, spectralType: 'M4.5Ve',  color: '#FF4820', glowFactor: 1   },
  { id: 'wolf-1061',         name: 'Wolf 1061',            raDeg: 247.58, decDeg: -12.65, distLy:   13.82, spectralType: 'M3V',     color: '#FF5530', glowFactor: 1   },
  { id: 'van-maanen',        name: "Van Maanen's Star",    raDeg:  12.29, decDeg:   5.39, distLy:   14.07, spectralType: 'DZ7',     color: '#E0EEFF', glowFactor: 0.8 },
  { id: 'gliese-1',          name: 'Gliese 1',             raDeg:   1.35, decDeg: -37.35, distLy:   14.23, spectralType: 'M1.5V',   color: '#FF6040', glowFactor: 1   },
  { id: 'wolf-424',          name: 'Wolf 424',             raDeg: 188.32, decDeg:   9.02, distLy:   14.31, spectralType: 'M5Ve',    color: '#FF4020', glowFactor: 1   },
  { id: 'tz-arietis',        name: 'TZ Arietis',          raDeg:  30.05, decDeg:  13.05, distLy:   14.55, spectralType: 'M4.5V',   color: '#FF4820', glowFactor: 1   },
  { id: 'gj-687',            name: 'GJ 687',               raDeg: 264.10, decDeg:  68.33, distLy:   14.84, spectralType: 'M3.5Ve',  color: '#FF5030', glowFactor: 1   },

  // ══════════════════════════════════════════════════════════
  // SOLAR NEIGHBORHOOD (15–50 ly)
  // ══════════════════════════════════════════════════════════
  { id: 'rasalhague',        name: 'Rasalhague',           raDeg: 263.73, decDeg:  12.56, distLy:   47.0,  spectralType: 'A5III',   color: '#DCE8FF', glowFactor: 2   },
  { id: 'muphrid',           name: 'Muphrid',              raDeg: 208.67, decDeg:  18.40, distLy:   37.2,  spectralType: 'G0IV',    color: '#FFF5D0', glowFactor: 1.5 },
  { id: '70-ophiuchi',       name: '70 Ophiuchi',          raDeg: 271.36, decDeg:   2.50, distLy:   16.59, spectralType: 'K0V',     color: '#FFBB60', glowFactor: 1.5 },
  { id: 'altair',            name: 'Altair',               raDeg: 297.70, decDeg:   8.87, distLy:   16.73, spectralType: 'A7V',     color: '#E8F0FF', glowFactor: 2   },
  { id: 'alshain',           name: 'Alshain',              raDeg: 299.69, decDeg:   6.41, distLy:   44.7,  spectralType: 'G8IV',    color: '#FFE090', glowFactor: 1.5 },
  { id: 'gliese-229',        name: 'Gliese 229',           raDeg:  92.65, decDeg: -21.87, distLy:   18.82, spectralType: 'M1V',     color: '#FF6840', glowFactor: 1   },
  { id: '82-eridani',        name: '82 Eridani',           raDeg:  49.98, decDeg: -43.07, distLy:   19.71, spectralType: 'G5V',     color: '#FFE8A0', glowFactor: 1.5 },
  { id: 'delta-pavonis',     name: 'δ Pavonis',            raDeg: 302.18, decDeg: -66.18, distLy:   19.92, spectralType: 'G8IV',    color: '#FFE090', glowFactor: 1.5 },
  { id: 'gj-570-a',          name: 'GJ 570 A',             raDeg: 222.00, decDeg: -21.42, distLy:   19.20, spectralType: 'K4V',     color: '#FFC060', glowFactor: 1.2 },
  { id: 'beta-hydri',        name: 'β Hydri',              raDeg:   6.44, decDeg: -77.25, distLy:   24.33, spectralType: 'G2IV',    color: '#FFF5A0', glowFactor: 2   },
  { id: 'chara',             name: 'Chara',                raDeg: 188.44, decDeg:  41.36, distLy:   27.4,  spectralType: 'G0V',     color: '#FFF5D0', glowFactor: 1.5 },
  { id: 'vega',              name: 'Vega',                 raDeg: 279.23, decDeg:  38.78, distLy:   25.04, spectralType: 'A0V',     color: '#D0E8FF', glowFactor: 2.5 },
  { id: 'fomalhaut',         name: 'Fomalhaut',            raDeg: 344.41, decDeg: -29.62, distLy:   25.13, spectralType: 'A3V',     color: '#D8ECFF', glowFactor: 2.5 },
  { id: 'porrima',           name: 'Porrima',              raDeg: 190.42, decDeg:  -1.45, distLy:   38.1,  spectralType: 'F0V',     color: '#F8F5FF', glowFactor: 1.5 },
  { id: 'denebola',          name: 'Denebola',             raDeg: 177.27, decDeg:  14.57, distLy:   35.9,  spectralType: 'A3V',     color: '#D4E4FF', glowFactor: 2   },
  { id: 'merak',             name: 'Merak',                raDeg: 165.46, decDeg:  56.38, distLy:   79.7,  spectralType: 'A1V',     color: '#D4E4FF', glowFactor: 2   },
  { id: 'caph',              name: 'Caph',                 raDeg:   2.30, decDeg:  59.15, distLy:   54.7,  spectralType: 'F2III',   color: '#FFF4E0', glowFactor: 1.8 },
  { id: 'wasat',             name: 'Wasat',                raDeg: 110.03, decDeg:  21.98, distLy:   59.1,  spectralType: 'F0IV',    color: '#F8F5FF', glowFactor: 1.5 },
  { id: 'alzirr',            name: 'Alzirr',               raDeg: 101.32, decDeg:  12.90, distLy:   58.7,  spectralType: 'F5IV',    color: '#FFF8E8', glowFactor: 1.5 },
  { id: 'zosma',             name: 'Zosma',                raDeg: 168.53, decDeg:  20.52, distLy:   58.4,  spectralType: 'A4V',     color: '#DCEAFF', glowFactor: 2   },
  { id: 'sheratan',          name: 'Sheratan',             raDeg:  28.66, decDeg:  20.81, distLy:   59.6,  spectralType: 'A5V',     color: '#E0ECFF', glowFactor: 1.8 },
  { id: 'deneb-algedi',      name: 'Deneb Algedi',         raDeg: 326.76, decDeg: -16.13, distLy:   38.7,  spectralType: 'A5m',     color: '#DCE8FF', glowFactor: 1.8 },
  { id: 'menkent',           name: 'Menkent',              raDeg: 211.67, decDeg: -36.37, distLy:   60.9,  spectralType: 'K0IIIb',  color: '#FFD080', glowFactor: 2   },
  { id: 'pollux',            name: 'Pollux',               raDeg: 116.33, decDeg:  28.03, distLy:   33.78, spectralType: 'K0IIIb',  color: '#FFD080', glowFactor: 2.5 },
  { id: 'alphecca',          name: 'Alphecca',             raDeg: 233.67, decDeg:  26.71, distLy:   75.0,  spectralType: 'A0V',     color: '#D4E4FF', glowFactor: 2   },
  { id: 'unukalhai',         name: 'Unukalhai',            raDeg: 236.07, decDeg:   6.43, distLy:   73.5,  spectralType: 'K2IIIa',  color: '#FFC060', glowFactor: 2   },
  { id: 'zubenelgenubi',     name: 'Zubenelgenubi',        raDeg: 222.72, decDeg: -15.99, distLy:   77.0,  spectralType: 'A3IV',    color: '#D4E4FF', glowFactor: 1.8 },
  { id: 'diphda',            name: 'Diphda',               raDeg:  10.90, decDeg: -17.99, distLy:   96.3,  spectralType: 'G9III',   color: '#FFD080', glowFactor: 2   },
  { id: 'sabik',             name: 'Sabik',                raDeg: 257.60, decDeg: -15.73, distLy:   84.0,  spectralType: 'A2V',     color: '#D4E4FF', glowFactor: 1.8 },
  { id: 'cebalrai',          name: 'Cebalrai',             raDeg: 265.87, decDeg:   4.57, distLy:   82.0,  spectralType: 'K2III',   color: '#FFC060', glowFactor: 2   },
  { id: 'gienah-cyg',        name: 'Gienah',               raDeg: 311.55, decDeg:  33.97, distLy:   72.0,  spectralType: 'K0III',   color: '#FFD080', glowFactor: 2   },
  { id: 'ankaa',             name: 'Ankaa',                raDeg:   6.57, decDeg: -42.31, distLy:   85.0,  spectralType: 'K0III',   color: '#FFD080', glowFactor: 2   },
  { id: 'alsephina',         name: 'Alsephina',            raDeg: 131.18, decDeg: -54.71, distLy:   80.6,  spectralType: 'A1V',     color: '#D4E4FF', glowFactor: 2   },
  { id: 'arcturus',          name: 'Arcturus',             raDeg: 213.92, decDeg:  19.18, distLy:   36.66, spectralType: 'K1.5III', color: '#FFD060', glowFactor: 3   },
  { id: 'syrma',             name: 'Syrma',                raDeg: 214.00, decDeg:  -6.00, distLy:   70.0,  spectralType: 'F6V',     color: '#FFF8E8', glowFactor: 1.5 },
  { id: 'phad',              name: 'Phecda',               raDeg: 178.46, decDeg:  53.69, distLy:   83.7,  spectralType: 'A0Ve',    color: '#D4E4FF', glowFactor: 2   },
  { id: 'megrez',            name: 'Megrez',               raDeg: 183.86, decDeg:  57.03, distLy:   80.5,  spectralType: 'A3V',     color: '#D4E4FF', glowFactor: 1.8 },
  { id: 'alioth',            name: 'Alioth',               raDeg: 193.51, decDeg:  55.96, distLy:   82.6,  spectralType: 'A0p',     color: '#D4E4FF', glowFactor: 2   },
  { id: 'mizar',             name: 'Mizar',                raDeg: 200.98, decDeg:  54.93, distLy:   82.9,  spectralType: 'A1V',     color: '#D4E4FF', glowFactor: 2   },
  { id: 'regulus',           name: 'Regulus',              raDeg: 152.09, decDeg:  11.97, distLy:   79.0,  spectralType: 'B7V',     color: '#C8D8FF', glowFactor: 2.5 },
  { id: 'gacrux',            name: 'Gacrux',               raDeg: 187.79, decDeg: -57.11, distLy:   88.0,  spectralType: 'M3.5III', color: '#FF7030', glowFactor: 3   },
  { id: 'algol',             name: 'Algol',                raDeg:  47.04, decDeg:  40.96, distLy:   90.0,  spectralType: 'B8V',     color: '#C8D8FF', glowFactor: 2   },
  { id: 'cor-caroli',        name: 'Cor Caroli',           raDeg: 194.01, decDeg:  38.32, distLy:  110.0,  spectralType: 'A0Vp',    color: '#D4E4FF', glowFactor: 1.8 },

  // ══════════════════════════════════════════════════════════
  // MIDDLE DISTANCE (50–200 ly)
  // ══════════════════════════════════════════════════════════
  { id: 'capella',           name: 'Capella',              raDeg:  79.17, decDeg:  45.99, distLy:   42.9,  spectralType: 'G3III',   color: '#FFE880', glowFactor: 3   },
  { id: 'castor',            name: 'Castor',               raDeg: 113.65, decDeg:  31.88, distLy:   51.5,  spectralType: 'A1V',     color: '#D8ECFF', glowFactor: 2.5 },
  { id: 'dubhe',             name: 'Dubhe',                raDeg: 165.93, decDeg:  61.75, distLy:  123.0,  spectralType: 'K0III',   color: '#FFD080', glowFactor: 2.5 },
  { id: 'menkalinan',        name: 'Menkalinan',           raDeg:  89.88, decDeg:  44.95, distLy:   81.0,  spectralType: 'A2IV',    color: '#D4E4FF', glowFactor: 2   },
  { id: 'alkaid',            name: 'Alkaid',               raDeg: 206.88, decDeg:  49.31, distLy:  103.9,  spectralType: 'B3V',     color: '#B4CCFF', glowFactor: 2.5 },
  { id: 'alhena',            name: 'Alhena',               raDeg:  99.43, decDeg:  16.40, distLy:  109.0,  spectralType: 'A0IV',    color: '#D4E4FF', glowFactor: 2   },
  { id: 'alphard',           name: 'Alphard',              raDeg: 141.90, decDeg:  -8.66, distLy:  180.0,  spectralType: 'K3II',    color: '#FFB858', glowFactor: 3   },
  { id: 'vindemiatrix',      name: 'Vindemiatrix',         raDeg: 195.55, decDeg:  10.96, distLy:  102.0,  spectralType: 'G8III',   color: '#FFE090', glowFactor: 2   },
  { id: 'ruchbah',           name: 'Ruchbah',              raDeg:  21.45, decDeg:  60.24, distLy:   99.0,  spectralType: 'A5V',     color: '#DCE8FF', glowFactor: 1.8 },
  { id: 'kornephoros',       name: 'Kornephoros',          raDeg: 247.55, decDeg:  21.49, distLy:  148.0,  spectralType: 'K0IV',    color: '#FFD080', glowFactor: 2   },
  { id: 'eltanin',           name: 'Eltanin',              raDeg: 269.15, decDeg:  51.49, distLy:  148.0,  spectralType: 'K5III',   color: '#FFA040', glowFactor: 2.5 },
  { id: 'kochab',            name: 'Kochab',               raDeg: 222.68, decDeg:  74.16, distLy:  126.0,  spectralType: 'K4III',   color: '#FFA040', glowFactor: 2.5 },
  { id: 'hamal',             name: 'Hamal',                raDeg:  31.79, decDeg:  23.46, distLy:   65.8,  spectralType: 'K2III',   color: '#FFB060', glowFactor: 2.5 },
  { id: 'aldebaran',         name: 'Aldebaran',            raDeg:  68.98, decDeg:  16.51, distLy:   65.0,  spectralType: 'K5III',   color: '#FFA040', glowFactor: 3.5 },
  { id: 'kaus-australis',    name: 'Kaus Australis',       raDeg: 276.04, decDeg: -34.38, distLy:  143.0,  spectralType: 'B9.5III', color: '#C8D8FF', glowFactor: 2.5 },
  { id: 'schedar',           name: 'Schedar',              raDeg:  10.13, decDeg:  56.54, distLy:  228.0,  spectralType: 'K0IIIa',  color: '#FFD080', glowFactor: 2.5 },
  { id: 'cursa',             name: 'Cursa',                raDeg:  76.96, decDeg:  -5.09, distLy:   89.0,  spectralType: 'A3III',   color: '#D4E4FF', glowFactor: 2   },
  { id: 'izar',              name: 'Izar',                 raDeg: 221.25, decDeg:  27.07, distLy:  203.0,  spectralType: 'K0II',    color: '#FFB858', glowFactor: 2.5 },
  { id: 'thuban',            name: 'Thuban',               raDeg: 211.09, decDeg:  64.38, distLy:  303.0,  spectralType: 'A0III',   color: '#D4E4FF', glowFactor: 2   },
  { id: 'tejat',             name: 'Tejat',                raDeg:  95.74, decDeg:  22.51, distLy:  230.0,  spectralType: 'M3III',   color: '#FF6830', glowFactor: 2.5 },
  { id: 'yed-prior',         name: 'Yed Prior',            raDeg: 239.55, decDeg:  -3.69, distLy:  171.0,  spectralType: 'M1III',   color: '#FF7030', glowFactor: 2.5 },
  { id: 'menkib',            name: 'Menkib',               raDeg:  57.14, decDeg:  35.79, distLy: 1227.0,  spectralType: 'O7.5III', color: '#90A8FF', glowFactor: 4   },
  { id: 'algieba',           name: 'Algieba',              raDeg: 154.99, decDeg:  19.84, distLy:  130.0,  spectralType: 'K0III',   color: '#FFD060', glowFactor: 3   },
  { id: 'acubens',           name: 'Acubens',              raDeg: 134.62, decDeg:  11.86, distLy:  174.0,  spectralType: 'A5m',     color: '#DCE8FF', glowFactor: 2   },
  { id: 'altarf',            name: 'Altarf',               raDeg: 124.13, decDeg:   9.19, distLy:  290.0,  spectralType: 'K4III',   color: '#FFA040', glowFactor: 2.5 },
  { id: 'pherkad',           name: 'Pherkad',              raDeg: 230.18, decDeg:  71.83, distLy:  487.0,  spectralType: 'A3III',   color: '#D4E4FF', glowFactor: 2.5 },
  { id: 'ascella',           name: 'Ascella',              raDeg: 285.65, decDeg: -29.88, distLy:   88.8,  spectralType: 'A2.5V',   color: '#D4E4FF', glowFactor: 2   },
  { id: 'nunki',             name: 'Nunki',                raDeg: 283.82, decDeg: -26.30, distLy:  228.0,  spectralType: 'B2.5V',   color: '#B0C8FF', glowFactor: 2.5 },
  { id: 'zubeneschamali',    name: 'Zubeneschamali',       raDeg: 229.25, decDeg:  -9.38, distLy:  160.0,  spectralType: 'B8V',     color: '#C8D8FF', glowFactor: 2   },
  { id: 'miaplacidus',       name: 'Miaplacidus',          raDeg: 138.30, decDeg: -69.72, distLy:  113.0,  spectralType: 'A2IV',    color: '#D4E4FF', glowFactor: 2.5 },
  { id: 'elnath',            name: 'Elnath',               raDeg:  81.57, decDeg:  28.61, distLy:  131.0,  spectralType: 'B7V',     color: '#C4D4FF', glowFactor: 2.5 },
  { id: 'markab',            name: 'Markab',               raDeg: 346.19, decDeg:  15.18, distLy:  133.0,  spectralType: 'B9III',   color: '#C8D8FF', glowFactor: 2   },
  { id: 'alrescha',          name: 'Alrescha',             raDeg:  30.51, decDeg:   2.76, distLy:  151.0,  spectralType: 'A0V',     color: '#D4E4FF', glowFactor: 1.8 },
  { id: 'acamar',            name: 'Acamar',               raDeg:  44.57, decDeg: -40.30, distLy:  161.0,  spectralType: 'A4II',    color: '#D8ECFF', glowFactor: 2.5 },
  { id: 'gomeisa',           name: 'Gomeisa',              raDeg: 111.79, decDeg:   8.29, distLy:  162.0,  spectralType: 'B8Ve',    color: '#C8D8FF', glowFactor: 2   },
  { id: 'mesarthim',         name: 'Mesarthim',            raDeg:  28.38, decDeg:  19.29, distLy:  164.0,  spectralType: 'A1p',     color: '#D8ECFF', glowFactor: 1.8 },
  { id: 'peacock',           name: 'Peacock',              raDeg: 306.41, decDeg: -56.73, distLy:  183.0,  spectralType: 'B2IV',    color: '#A8C0FF', glowFactor: 2.5 },
  { id: 'nihal',             name: 'Nihal',                raDeg:  82.06, decDeg: -20.76, distLy:  159.0,  spectralType: 'G5II',    color: '#FFE090', glowFactor: 2   },
  { id: 'scheat',            name: 'Scheat',               raDeg: 345.94, decDeg:  28.08, distLy:  196.0,  spectralType: 'M2.5II',  color: '#FF7030', glowFactor: 3   },
  { id: 'mirach',            name: 'Mirach',               raDeg:  17.43, decDeg:  35.62, distLy:  197.0,  spectralType: 'M0III',   color: '#FF8040', glowFactor: 2.5 },
  { id: 'alpheratz',         name: 'Alpheratz',            raDeg:   2.10, decDeg:  29.09, distLy:   97.0,  spectralType: 'B8IVp',   color: '#C4D4FF', glowFactor: 2   },
  { id: 'alnair',            name: 'Alnair',               raDeg: 332.06, decDeg: -46.96, distLy:  101.0,  spectralType: 'B6V',     color: '#B8D0FF', glowFactor: 2.5 },
  { id: 'rasalgethi',        name: 'Rasalgethi',           raDeg: 258.66, decDeg:  14.39, distLy:  360.0,  spectralType: 'M5II',    color: '#FF5820', glowFactor: 3.5 },
  { id: 'rastaban',          name: 'Rastaban',             raDeg: 262.61, decDeg:  52.30, distLy:  380.0,  spectralType: 'G2Ib',    color: '#FFE090', glowFactor: 3   },
  { id: 'almach',            name: 'Almach',               raDeg:  30.97, decDeg:  42.33, distLy:  355.0,  spectralType: 'K3II',    color: '#FFB050', glowFactor: 3   },
  { id: 'menkar',            name: 'Menkar',               raDeg:  45.57, decDeg:   4.09, distLy:  249.0,  spectralType: 'M1.5III', color: '#FF7030', glowFactor: 2.5 },
  { id: 'homam',             name: 'Homam',                raDeg: 329.15, decDeg:  10.83, distLy:  209.0,  spectralType: 'B8V',     color: '#C8D8FF', glowFactor: 2   },
  { id: 'mebsuda',           name: 'Mebsuda',              raDeg: 100.98, decDeg:  25.13, distLy:  900.0,  spectralType: 'G8Ib',    color: '#FFE090', glowFactor: 3.5 },
  { id: 'navi',              name: 'Navi',                 raDeg:  14.18, decDeg:  60.72, distLy:  613.0,  spectralType: 'B0IVe',   color: '#9AAFFF', glowFactor: 3.5 },
  { id: 'ginan',             name: 'Ginan',                raDeg: 185.34, decDeg: -60.40, distLy:  228.0,  spectralType: 'K3III',   color: '#FFC060', glowFactor: 2   },
  { id: 'imai',              name: 'Imai',                 raDeg: 183.79, decDeg: -58.75, distLy:  364.0,  spectralType: 'B2IV',    color: '#A8C0FF', glowFactor: 2.5 },
  { id: 'alcyone',           name: 'Alcyone',              raDeg:  56.87, decDeg:  24.10, distLy:  440.0,  spectralType: 'B7III',   color: '#C4D4FF', glowFactor: 3   },
  { id: 'tarazed',           name: 'Tarazed',              raDeg: 296.56, decDeg:  10.61, distLy:  461.0,  spectralType: 'K3II',    color: '#FFB050', glowFactor: 3   },
  { id: 'kaus-media',        name: 'Kaus Media',           raDeg: 275.25, decDeg: -29.83, distLy:  306.0,  spectralType: 'K3III',   color: '#FFC060', glowFactor: 2.5 },

  // ══════════════════════════════════════════════════════════
  // FURTHER OUT (200–800 ly)
  // ══════════════════════════════════════════════════════════
  { id: 'achernar',          name: 'Achernar',             raDeg:  24.43, decDeg: -57.24, distLy:  139.0,  spectralType: 'B6V',     color: '#B8D0FF', glowFactor: 3   },
  { id: 'graffias',          name: 'Graffias',             raDeg: 241.36, decDeg: -19.81, distLy:  404.0,  spectralType: 'B0.5V',   color: '#9AAFFF', glowFactor: 3   },
  { id: 'dschubba',          name: 'Dschubba',             raDeg: 240.08, decDeg: -22.62, distLy:  440.0,  spectralType: 'B0.3IV',  color: '#9AAFFF', glowFactor: 3   },
  { id: 'sargas',            name: 'Sargas',               raDeg: 264.33, decDeg: -42.99, distLy:  272.0,  spectralType: 'F0II',    color: '#FFF4E0', glowFactor: 3   },
  { id: 'polaris',           name: 'Polaris',              raDeg:  37.95, decDeg:  89.26, distLy:  433.0,  spectralType: 'F7Ib',    color: '#FFF4E0', glowFactor: 3.5 },
  { id: 'spica',             name: 'Spica',                raDeg: 201.30, decDeg: -11.16, distLy:  250.0,  spectralType: 'B1V',     color: '#A8C0FF', glowFactor: 3.5 },
  { id: 'mira',              name: 'Mira',                 raDeg:  34.84, decDeg:  -2.97, distLy:  299.0,  spectralType: 'M7IIIe',  color: '#FF5020', glowFactor: 3.5 },
  { id: 'canopus',           name: 'Canopus',              raDeg:  95.99, decDeg: -52.70, distLy:  310.0,  spectralType: 'F0II',    color: '#FFF8E0', glowFactor: 4   },
  { id: 'acrux',             name: 'Acrux',                raDeg: 186.65, decDeg: -63.10, distLy:  321.0,  spectralType: 'B0.5IV',  color: '#A0BCFF', glowFactor: 3   },
  { id: 'mimosa',            name: 'Mimosa',               raDeg: 191.93, decDeg: -59.69, distLy:  353.0,  spectralType: 'B1III',   color: '#A8C0FF', glowFactor: 3.5 },
  { id: 'hadar',             name: 'Hadar',                raDeg: 210.95, decDeg: -60.37, distLy:  390.0,  spectralType: 'B1III',   color: '#A8C0FF', glowFactor: 3.5 },
  { id: 'albireo',           name: 'Albireo',              raDeg: 292.68, decDeg:  27.96, distLy:  430.0,  spectralType: 'K3II',    color: '#FFB050', glowFactor: 3   },
  { id: 'furud',             name: 'Furud',                raDeg:  94.99, decDeg: -30.06, distLy:  362.0,  spectralType: 'B2.5V',   color: '#B0C8FF', glowFactor: 2.5 },
  { id: 'mirzam',            name: 'Mirzam',               raDeg:  95.68, decDeg: -17.96, distLy:  500.0,  spectralType: 'B1II',    color: '#A8C0FF', glowFactor: 3.5 },
  { id: 'adhara',            name: 'Adhara',               raDeg: 104.66, decDeg: -28.97, distLy:  430.0,  spectralType: 'B2Iae',   color: '#A0BCFF', glowFactor: 4   },
  { id: 'segin',             name: 'Segin',                raDeg:  28.60, decDeg:  63.67, distLy:  442.0,  spectralType: 'B3III',   color: '#B0C8FF', glowFactor: 2.5 },
  { id: 'algenib',           name: 'Algenib',              raDeg:   3.31, decDeg:  15.18, distLy:  335.0,  spectralType: 'B2IV',    color: '#A8C0FF', glowFactor: 2.5 },
  { id: 'lesath',            name: 'Lesath',               raDeg: 262.69, decDeg: -37.30, distLy:  580.0,  spectralType: 'B2IV',    color: '#A8C0FF', glowFactor: 3   },
  { id: 'phact',             name: 'Phact',                raDeg:  84.91, decDeg: -34.07, distLy:  268.0,  spectralType: 'B7IV',    color: '#C4D4FF', glowFactor: 2.5 },
  { id: 'mirfak',            name: 'Mirfak',               raDeg:  51.08, decDeg:  49.86, distLy:  592.0,  spectralType: 'F5Ib',    color: '#FFF8E0', glowFactor: 4   },
  { id: 'kakkab',            name: 'Kakkab',               raDeg: 220.48, decDeg: -47.39, distLy:  548.0,  spectralType: 'B1.5III', color: '#A8C0FF', glowFactor: 3   },
  { id: 'avior',             name: 'Avior',                raDeg: 125.63, decDeg: -59.51, distLy:  632.0,  spectralType: 'K3III',   color: '#FFC060', glowFactor: 3   },
  { id: 'sadr',              name: 'Sadr',                 raDeg: 305.56, decDeg:  40.26, distLy: 1523.0,  spectralType: 'F8Ib',    color: '#FFF0C0', glowFactor: 4   },
  { id: 'antares',           name: 'Antares',              raDeg: 247.35, decDeg: -26.43, distLy:  554.0,  spectralType: 'M1.5Iab', color: '#FF4418', glowFactor: 5   },
  { id: 'enif',              name: 'Enif',                 raDeg: 326.05, decDeg:   9.87, distLy:  690.0,  spectralType: 'K2Ib',    color: '#FFB050', glowFactor: 3.5 },
  { id: 'atria',             name: 'Atria',                raDeg: 252.17, decDeg: -69.03, distLy:  415.0,  spectralType: 'K2II',    color: '#FFB858', glowFactor: 3   },
  { id: 'saiph',             name: 'Saiph',                raDeg:  86.94, decDeg:  -9.67, distLy:  650.0,  spectralType: 'B0.5Ia',  color: '#9AAFFF', glowFactor: 4.5 },
  { id: 'shaula',            name: 'Shaula',               raDeg: 263.40, decDeg: -37.10, distLy:  700.0,  spectralType: 'B1.5IV',  color: '#A8C0FF', glowFactor: 3.5 },
  { id: 'arneb',             name: 'Arneb',                raDeg:  83.18, decDeg: -17.82, distLy: 1283.0,  spectralType: 'F0Ib',    color: '#FFF4E0', glowFactor: 4   },
  { id: 'sadalsuud',         name: 'Sadalsuud',            raDeg: 322.89, decDeg:  -5.57, distLy:  610.0,  spectralType: 'G0Ib',    color: '#FFF0C0', glowFactor: 3.5 },
  { id: 'sadalmelik',        name: 'Sadalmelik',           raDeg: 331.45, decDeg:  -0.32, distLy:  520.0,  spectralType: 'G2Ib',    color: '#FFE8A0', glowFactor: 3   },
  { id: 'regor',             name: 'Regor',                raDeg: 122.38, decDeg: -47.34, distLy: 1096.0,  spectralType: 'WC8+O',   color: '#90D0FF', glowFactor: 4.5 },
  { id: 'sheliak',           name: 'Sheliak',              raDeg: 282.52, decDeg:  33.36, distLy:  960.0,  spectralType: 'B8II',    color: '#C8D8FF', glowFactor: 3   },
  { id: 'sulafat',           name: 'Sulafat',              raDeg: 284.74, decDeg:  32.69, distLy:  635.0,  spectralType: 'B9III',   color: '#C8D8FF', glowFactor: 2.5 },
  { id: 'zaurak',            name: 'Zaurak',               raDeg:  59.51, decDeg: -13.51, distLy:  221.0,  spectralType: 'M0III',   color: '#FF7030', glowFactor: 2.5 },

  // ══════════════════════════════════════════════════════════
  // DISTANT & LUMINOUS (800 ly+)
  // ══════════════════════════════════════════════════════════
  { id: 'bellatrix',         name: 'Bellatrix',            raDeg:  81.28, decDeg:   6.35, distLy:  243.0,  spectralType: 'B2III',   color: '#A8C0FF', glowFactor: 3.5 },
  { id: 'alnitak',           name: 'Alnitak',              raDeg:  85.19, decDeg:  -1.94, distLy:  800.0,  spectralType: 'O9.5Ib',  color: '#9BBCFF', glowFactor: 4.5 },
  { id: 'betelgeuse',        name: 'Betelgeuse',           raDeg:  88.79, decDeg:   7.40, distLy:  700.0,  spectralType: 'M1-2Ia',  color: '#FF6020', glowFactor: 5   },
  { id: 'mintaka',           name: 'Mintaka',              raDeg:  83.00, decDeg:  -0.30, distLy:  900.0,  spectralType: 'O9.5V',   color: '#9BBCFF', glowFactor: 4.5 },
  { id: 'alnilam',           name: 'Alnilam',              raDeg:  84.05, decDeg:  -1.20, distLy: 2000.0,  spectralType: 'B0Ia',    color: '#90AFFF', glowFactor: 5   },
  { id: 'rigel',             name: 'Rigel',                raDeg:  78.63, decDeg:  -8.20, distLy:  860.0,  spectralType: 'B8Ia',    color: '#B8D4FF', glowFactor: 5   },
  { id: 'wezen',             name: 'Wezen',                raDeg: 107.10, decDeg: -26.39, distLy: 1606.0,  spectralType: 'F8Ia',    color: '#FFF0C0', glowFactor: 4.5 },
  { id: 'naos',              name: 'Naos',                 raDeg: 120.90, decDeg: -40.00, distLy: 1090.0,  spectralType: 'O5Iaf',   color: '#7090FF', glowFactor: 5   },
  { id: 'aludra',            name: 'Aludra',               raDeg: 111.02, decDeg: -29.30, distLy: 3196.0,  spectralType: 'B5Ia',    color: '#B8D0FF', glowFactor: 5   },
  { id: 'deneb',             name: 'Deneb',                raDeg: 310.36, decDeg:  45.28, distLy: 2615.0,  spectralType: 'A2Ia',    color: '#D8ECFF', glowFactor: 5   },
];
