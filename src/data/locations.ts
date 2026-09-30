/**
 * Locations directory for Autoankauf Köln vehicle acquisition across Cologne and Germany.
 * Extracted and normalized from user location directory.
 */

export interface LocationItem {
  name: string;
  letter: string;
  slug: string;
  deName?: string;
  originalInput?: string;
}

export const LOCATIONS_BY_LETTER: Record<string, string[]> = {
  A: ['Aachen', 'Augsburg'],
  B: [
    'Bergisch Gladbach',
    'Berlin',
    'Bielefeld',
    'Bochum',
    'Bonn',
    'Bottrop',
    'Braunschweig',
    'Bremen',
    'Bremerhaven',
  ],
  C: ['Chemnitz', 'Cottbus'],
  D: [
    'Darmstadt',
    'Dortmund',
    'Dresden',
    'Duisburg',
    'Düren',
    'Düsseldorf',
  ],
  E: [
    'Erfurt',
    'Erlangen',
    'Essen',
    'Esslingen am Neckar',
  ],
  F: [
    'Flensburg',
    'Frankfurt am Main',
    'Freiburg im Breisgau',
    'Fürth',
  ],
  G: [
    'Gelsenkirchen',
    'Gera',
    'Gießen',
    'Göttingen',
    'Gütersloh',
  ],
  H: [
    'Hagen',
    'Halle (Saale)',
    'Hamburg',
    'Hamm',
    'Hanau',
    'Hanover',
    'Heidelberg',
    'Heilbronn',
    'Herne',
    'Hildesheim',
  ],
  I: ['Ingolstadt', 'Iserlohn'],
  J: ['Jena'],
  K: [
    'Kaiserslautern',
    'Karlsruhe',
    'Kassel',
    'Kiel',
    'Koblenz',
    'Cologne',
    'Constance',
    'Krefeld',
  ],
  L: [
    'Leipzig',
    'Leverkusen',
    'Lübeck',
    'Ludwigsburg',
    'Ludwigshafen am Rhein',
    'Lünen',
    'Luxembourg',
  ],
  M: [
    'Magdeburg',
    'Mainz',
    'Mannheim',
    'Marl',
    'Moers',
    'Mönchengladbach',
    'Mülheim an der Ruhr',
    'Munich',
    'Münster',
  ],
  N: ['Neuss', 'Nuremberg'],
  O: [
    'Oberhausen',
    'Offenbach am Main',
    'Oldenburg',
    'Osnabrück',
  ],
  P: ['Paderborn', 'Pforzheim', 'Potsdam'],
  R: [
    'Ratingen',
    'Recklinghausen',
    'Regensburg',
    'Remscheid',
    'Reutlingen',
    'Rostock',
  ],
  S: [
    'Saarbrücken',
    'Salzgitter',
    'Schwerin',
    'Siegen',
    'Solingen',
    'Stuttgart',
  ],
  T: ['Trier', 'Tübingen'],
  U: ['Ulm'],
  V: ['Villingen-Schwenningen'],
  W: [
    'Wiesbaden',
    'Witten',
    'Wolfsburg',
    'Worms',
    'Wuppertal',
    'Würzburg',
  ],
  Z: ['Zwickau'],
};

/**
 * Flat list of all 101 location names
 */
export const LOCATIONS: string[] = Object.values(LOCATIONS_BY_LETTER).flat();

/**
 * Structured list of location items with metadata
 */
export const LOCATION_ITEMS: LocationItem[] = [
  // A
  { name: 'Aachen', letter: 'A', slug: 'aachen' },
  { name: 'Augsburg', letter: 'A', slug: 'augsburg', originalInput: 'augsburg' },

  // B
  { name: 'Bergisch Gladbach', letter: 'B', slug: 'bergisch-gladbach' },
  { name: 'Berlin', letter: 'B', slug: 'berlin' },
  { name: 'Bielefeld', letter: 'B', slug: 'bielefeld' },
  { name: 'Bochum', letter: 'B', slug: 'bochum' },
  { name: 'Bonn', letter: 'B', slug: 'bonn' },
  { name: 'Bottrop', letter: 'B', slug: 'bottrop' },
  { name: 'Braunschweig', letter: 'B', slug: 'braunschweig' },
  { name: 'Bremen', letter: 'B', slug: 'bremen' },
  { name: 'Bremerhaven', letter: 'B', slug: 'bremerhaven' },

  // C
  { name: 'Chemnitz', letter: 'C', slug: 'chemnitz' },
  { name: 'Cottbus', letter: 'C', slug: 'cottbus', originalInput: 'cottbus' },

  // D
  { name: 'Darmstadt', letter: 'D', slug: 'darmstadt' },
  { name: 'Dortmund', letter: 'D', slug: 'dortmund' },
  { name: 'Dresden', letter: 'D', slug: 'dresden' },
  { name: 'Duisburg', letter: 'D', slug: 'duisburg' },
  { name: 'Düren', letter: 'D', slug: 'dueren' },
  { name: 'Düsseldorf', letter: 'D', slug: 'duesseldorf' },

  // E
  { name: 'Erfurt', letter: 'E', slug: 'erfurt' },
  { name: 'Erlangen', letter: 'E', slug: 'erlangen' },
  { name: 'Essen', letter: 'E', slug: 'essen', deName: 'Essen', originalInput: 'Eat' },
  { name: 'Esslingen am Neckar', letter: 'E', slug: 'esslingen-am-neckar' },

  // F
  { name: 'Flensburg', letter: 'F', slug: 'flensburg' },
  { name: 'Frankfurt am Main', letter: 'F', slug: 'frankfurt-am-main' },
  { name: 'Freiburg im Breisgau', letter: 'F', slug: 'freiburg-im-breisgau' },
  { name: 'Fürth', letter: 'F', slug: 'fuerth' },

  // G
  { name: 'Gelsenkirchen', letter: 'G', slug: 'gelsenkirchen' },
  { name: 'Gera', letter: 'G', slug: 'gera' },
  { name: 'Gießen', letter: 'G', slug: 'giessen', deName: 'Gießen', originalInput: 'Pour' },
  { name: 'Göttingen', letter: 'G', slug: 'goettingen' },
  { name: 'Gütersloh', letter: 'G', slug: 'guetersloh' },

  // H
  { name: 'Hagen', letter: 'H', slug: 'hagen' },
  { name: 'Halle (Saale)', letter: 'H', slug: 'halle-saale' },
  { name: 'Hamburg', letter: 'H', slug: 'hamburg' },
  { name: 'Hamm', letter: 'H', slug: 'hamm' },
  { name: 'Hanau', letter: 'H', slug: 'hanau' },
  { name: 'Hanover', letter: 'H', slug: 'hannover', deName: 'Hannover' },
  { name: 'Heidelberg', letter: 'H', slug: 'heidelberg' },
  { name: 'Heilbronn', letter: 'H', slug: 'heilbronn' },
  { name: 'Herne', letter: 'H', slug: 'herne' },
  { name: 'Hildesheim', letter: 'H', slug: 'hildesheim' },

  // I
  { name: 'Ingolstadt', letter: 'I', slug: 'ingolstadt' },
  { name: 'Iserlohn', letter: 'I', slug: 'iserlohn' },

  // J
  { name: 'Jena', letter: 'J', slug: 'jena' },

  // K
  { name: 'Kaiserslautern', letter: 'K', slug: 'kaiserslautern' },
  { name: 'Karlsruhe', letter: 'K', slug: 'karlsruhe' },
  { name: 'Kassel', letter: 'K', slug: 'kassel', originalInput: 'kassel' },
  { name: 'Kiel', letter: 'K', slug: 'kiel' },
  { name: 'Koblenz', letter: 'K', slug: 'koblenz' },
  { name: 'Cologne', letter: 'K', slug: 'koeln', deName: 'Köln' },
  { name: 'Constance', letter: 'K', slug: 'konstanz', deName: 'Konstanz' },
  { name: 'Krefeld', letter: 'K', slug: 'krefeld' },

  // L
  { name: 'Leipzig', letter: 'L', slug: 'leipzig' },
  { name: 'Leverkusen', letter: 'L', slug: 'leverkusen' },
  { name: 'Lübeck', letter: 'L', slug: 'luebeck' },
  { name: 'Ludwigsburg', letter: 'L', slug: 'ludwigsburg' },
  { name: 'Ludwigshafen am Rhein', letter: 'L', slug: 'ludwigshafen-am-rhein' },
  { name: 'Lünen', letter: 'L', slug: 'luenen' },
  { name: 'Luxembourg', letter: 'L', slug: 'luxemburg', deName: 'Luxemburg' },

  // M
  { name: 'Magdeburg', letter: 'M', slug: 'magdeburg' },
  { name: 'Mainz', letter: 'M', slug: 'mainz' },
  { name: 'Mannheim', letter: 'M', slug: 'mannheim' },
  { name: 'Marl', letter: 'M', slug: 'marl' },
  { name: 'Moers', letter: 'M', slug: 'moers' },
  { name: 'Mönchengladbach', letter: 'M', slug: 'moenchengladbach' },
  { name: 'Mülheim an der Ruhr', letter: 'M', slug: 'muelheim-an-der-ruhr' },
  { name: 'Munich', letter: 'M', slug: 'muenchen', deName: 'München' },
  { name: 'Münster', letter: 'M', slug: 'muenster', originalInput: 'Muenster' },

  // N
  { name: 'Neuss', letter: 'N', slug: 'neuss' },
  { name: 'Nuremberg', letter: 'N', slug: 'nuernberg', deName: 'Nürnberg' },

  // O
  { name: 'Oberhausen', letter: 'O', slug: 'oberhausen' },
  { name: 'Offenbach am Main', letter: 'O', slug: 'offenbach-am-main' },
  { name: 'Oldenburg', letter: 'O', slug: 'oldenburg' },
  { name: 'Osnabrück', letter: 'O', slug: 'osnabrueck' },

  // P
  { name: 'Paderborn', letter: 'P', slug: 'paderborn' },
  { name: 'Pforzheim', letter: 'P', slug: 'pforzheim' },
  { name: 'Potsdam', letter: 'P', slug: 'potsdam' },

  // R
  { name: 'Ratingen', letter: 'R', slug: 'ratingen' },
  { name: 'Recklinghausen', letter: 'R', slug: 'recklinghausen' },
  { name: 'Regensburg', letter: 'R', slug: 'regensburg', originalInput: 'regensburg' },
  { name: 'Remscheid', letter: 'R', slug: 'remscheid' },
  { name: 'Reutlingen', letter: 'R', slug: 'reutlingen' },
  { name: 'Rostock', letter: 'R', slug: 'rostock' },

  // S
  { name: 'Saarbrücken', letter: 'S', slug: 'saarbruecken' },
  { name: 'Salzgitter', letter: 'S', slug: 'salzgitter' },
  { name: 'Schwerin', letter: 'S', slug: 'schwerin' },
  { name: 'Siegen', letter: 'S', slug: 'siegen', deName: 'Siegen', originalInput: 'Siege' },
  { name: 'Solingen', letter: 'S', slug: 'solingen' },
  { name: 'Stuttgart', letter: 'S', slug: 'stuttgart' },

  // T
  { name: 'Trier', letter: 'T', slug: 'trier', originalInput: 'trier' },
  { name: 'Tübingen', letter: 'T', slug: 'tuebingen' },

  // U
  { name: 'Ulm', letter: 'U', slug: 'ulm' },

  // V
  { name: 'Villingen-Schwenningen', letter: 'V', slug: 'villingen-schwenningen' },

  // W
  { name: 'Wiesbaden', letter: 'W', slug: 'wiesbaden' },
  { name: 'Witten', letter: 'W', slug: 'witten' },
  { name: 'Wolfsburg', letter: 'W', slug: 'wolfsburg' },
  { name: 'Worms', letter: 'W', slug: 'worms' },
  { name: 'Wuppertal', letter: 'W', slug: 'wuppertal' },
  { name: 'Würzburg', letter: 'W', slug: 'wuerzburg' },

  // Z
  { name: 'Zwickau', letter: 'Z', slug: 'zwickau' },
];

export default LOCATIONS;
