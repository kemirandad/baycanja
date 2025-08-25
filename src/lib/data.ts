import type { Participant, Criterion, User } from './types';

export const users: User[] = [
  // Admin
  { id: 'admin', username: 'admin', password: 'password', role: 'ADMIN' },
  // Jueces de Canto
  { id: 'juez_canto_1', username: 'juez.canto1', password: 'password', role: 'CANTO' },
  { id: 'juez_canto_2', username: 'juez.canto2', password: 'password', role: 'CANTO' },
  { id: 'juez_canto_3', username: 'juez.canto3', password: 'password', role: 'CANTO' },
  // Jueces de Baile
  { id: 'juez_baile_1', username: 'juez.baile1', password: 'password', role: 'BAILE' },
  { id: 'juez_baile_2', username: 'juez.baile2', password: 'password', role: 'BAILE' },
  { id: 'juez_baile_3', username: 'juez.baile3', password: 'password', role: 'BAILE' },
];


export const participants: Participant[] = [
  // Canto - Categoría A
  {
    id: '1',
    name: 'JUAN JOSE PAREJO JIMENEZ',
    description: 'Presentación de canto.',
    longDescription:
      'JUAN JOSE PAREJO JIMENEZ competirá en la categoría A con una emocionante presentación de canto, demostrando su talento y pasión por la música.',
    photoUrl: 'https://placehold.co/600x400.png',
    category: 'A',
    eventType: 'Canto',
  },
  {
    id: '2',
    name: 'JARIANA SOFIA APRESA ARROLLO',
    description: 'Presentación de canto.',
    longDescription:
      'JARIANA SOFIA APRESA ARROLLO subirá al escenario para ofrecer una interpretación vocal única en la categoría A, buscando cautivar al jurado y al público.',
    photoUrl: 'https://placehold.co/600x400.png',
    category: 'A',
    eventType: 'Canto',
  },
  {
    id: '3',
    name: 'JAIME ANDRES VILLARETE GALEANO',
    description: 'Presentación de canto.',
    longDescription:
      'JAIME ANDRES VILLARETE GALEANO participa en la categoría A, listo para mostrar su desenvolvimiento escénico y su potente voz.',
    photoUrl: 'https://placehold.co/600x400.png',
    category: 'A',
    eventType: 'Canto',
  },
  {
    id: '4',
    name: 'SAMUEL DAVID NISPERUZA CAICEDO',
    description: 'Presentación de canto.',
    longDescription:
      'SAMUEL DAVID NISPERUZA CAICEDO demostrará su habilidad técnica y originalidad en su presentación de canto para la categoría A.',
    photoUrl: 'https://placehold.co/600x400.png',
    category: 'A',
    eventType: 'Canto',
  },
  {
    id: '5',
    name: 'ANA CASTILLA',
    description: 'Presentación de canto.',
    longDescription:
      'ANA CASTILLA competirá en la categoría A, compartiendo su talento vocal y carisma en una presentación que promete ser inolvidable.',
    photoUrl: 'https://placehold.co/600x400.png',
    category: 'A',
    eventType: 'Canto',
  },
  {
    id: '6',
    name: 'ANA LUCIA RUIZ GARCIA',
    description: 'Presentación de canto.',
    longDescription:
      'ANA LUCIA RUIZ GARCIA cierra la categoría A con una interpretación llena de sentimiento y técnica, esperando dejar una marca en el evento.',
    photoUrl: 'https://placehold.co/600x400.png',
    category: 'A',
    eventType: 'Canto',
  },
  // Canto - Categoría B
  {
    id: '7',
    name: 'ADRIANA YISEL CONTRERAS REINO',
    description: 'Presentación de canto.',
    longDescription:
      'ADRIANA YISEL CONTRERAS REINO abre la categoría B con su increíble voz, presentando una canción que tocará el corazón de todos.',
    photoUrl: 'https://placehold.co/600x400.png',
    category: 'B',
    eventType: 'Canto',
  },
  {
    id: '8',
    name: 'MARIANGEL VICTORIA CHOURIO PEÑA',
    description: 'Presentación de canto.',
    longDescription:
      'MARIANGEL VICTORIA CHOURIO PEÑA demostrará su gran talento vocal y dominio escénico en la categoría B.',
    photoUrl: 'https://placehold.co/600x400.png',
    category: 'B',
    eventType: 'Canto',
  },
  {
    id: '9',
    name: 'SAMUEL LOGREIRA MARTINEZ',
    description: 'Presentación de canto.',
    longDescription:
      'SAMUEL LOGREIRA MARTINEZ buscará impresionar al jurado con su originalidad y potente mensaje en la categoría B.',
    photoUrl: 'https://placehold.co/600x400.png',
    category: 'B',
    eventType: 'Canto',
  },
  {
    id: '10',
    name: 'VALERIA CAROLINA MEZA CHARRIS',
    description: 'Presentación de canto.',
    longDescription:
      'VALERIA CAROLINA MEZA CHARRIS, participante de la categoría B, ofrecerá una presentación llena de carisma y técnica.',
    photoUrl: 'https://placehold.co/600x400.png',
    category: 'B',
    eventType: 'Canto',
  },
  {
    id: '11',
    name: 'VANESSA ARANGO',
    description: 'Presentación de canto.',
    longDescription:
      'VANESSA ARANGO competirá en la categoría B, mostrando su talento y una propuesta artística fresca y creativa.',
    photoUrl: 'https://placehold.co/600x400.png',
    category: 'B',
    eventType: 'Canto',
  },
  {
    id: '12',
    name: 'DALLANA ANDREA PINEDA PÉREZ',
    description: 'Presentación de canto.',
    longDescription:
      'DALLANA ANDREA PINEDA PÉREZ cierra la competencia en la categoría B con una interpretación vocal que promete emocionar a todos.',
    photoUrl: 'https://placehold.co/600x400.png',
    category: 'B',
    eventType: 'Canto',
  },
  // Baile - Categoría A
  {
    id: '13',
    name: 'GRUPO BODY & SOUL',
    description: 'Presentación de baile.',
    longDescription: 'El grupo BODY & SOUL trae una coreografía llena de energía y pasión para la categoría A de baile.',
    photoUrl: 'https://placehold.co/600x400.png',
    category: 'A',
    eventType: 'Baile',
  },
  {
    id: '14',
    name: 'GRUPO PEQUEÑOS CON RITMO',
    description: 'Presentación de baile.',
    longDescription: 'PEQUEÑOS CON RITMO demostrarán su increíble coordinación y carisma en el escenario de la categoría A.',
    photoUrl: 'https://placehold.co/600x400.png',
    category: 'A',
    eventType: 'Baile',
  },
  {
    id: '15',
    name: 'DANZA DE LOS PAJAROS',
    description: 'Presentación de baile.',
    longDescription: 'El grupo DANZA DE LOS PAJAROS presentará una pieza de baile tradicional con un toque moderno en la categoría A.',
    photoUrl: 'https://placehold.co/600x400.png',
    category: 'A',
    eventType: 'Baile',
  },
    // Baile - Categoría B
  {
    id: '16',
    name: 'GRUPO FOLCLORICO SAN FRANCISCO JAVIER',
    description: 'Presentación de baile.',
    longDescription: 'El GRUPO FOLCLORICO SAN FRANCISCO JAVIER mostrará la riqueza cultural de la región con su presentación en la categoría B.',
    photoUrl: 'https://placehold.co/600x400.png',
    category: 'B',
    eventType: 'Baile',
  },
  {
    id: '17',
    name: 'GRUPO THE FLOW',
    description: 'Presentación de baile.',
    longDescription: 'THE FLOW llega a la categoría B con un estilo de baile urbano que promete sorprender a todos.',
    photoUrl: 'https://placehold.co/600x400.png',
    category: 'B',
    eventType: 'Baile',
  },
  {
    id: '18',
    name: 'DANZA PALOTEO',
    description: 'Presentación de baile.',
    longDescription: 'DANZA PALOTEO competirá en la categoría B con una coreografía que mezcla tradición y vanguardia.',
    photoUrl: 'https://placehold.co/600x400.png',
    category: 'B',
    eventType: 'Baile',
  },
  {
    id: '19',
    name: 'GRUPO REYVOLUTION',
    description: 'Presentación de baile.',
    longDescription: 'El grupo REYVOLUTION está listo para revolucionar la categoría B con su innovadora propuesta de baile.',
    photoUrl: 'https://placehold.co/600x400.png',
    category: 'B',
    eventType: 'Baile',
  },
  {
    id: '20',
    name: 'GRUPO FOLCLORICO DE DANZA',
    description: 'Presentación de baile.',
    longDescription: 'El GRUPO FOLCLORICO DE DANZA cierra la categoría B con una presentación que celebra las raíces culturales a través del baile.',
    photoUrl: 'https://placehold.co/600x400.png',
    category: 'B',
    eventType: 'Baile',
  },
];

export const criteria: Criterion[] = [
  {
    id: 'originality',
    name: 'Originalidad',
    description: 'Propuesta única y creativa en la presentación o interpretación.',
    weight: 10,
  },
  {
    id: 'message',
    name: 'Mensaje',
    description: 'Claridad y potencia del mensaje transmitido.',
    weight: 20,
  },
  {
    id: 'diction',
    name: 'Dicción',
    description: 'Claridad en la pronunciación y articulación.',
    weight: 10,
  },
  {
    id: 'stage_presence',
    name: 'Dominio Escénico',
    description: 'Confianza, carisma y desenvolvimiento en el escenario.',
    weight: 25,
  },
  {
    id: 'technique',
    name: 'Técnica',
    description: 'Habilidad y ejecución técnica en la disciplina presentada.',
    weight: 25,
  },
  {
    id: 'costume',
    name: 'Vestuario',
    description: 'Adecuación y creatividad del vestuario.',
    weight: 10,
  },
];
