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
    photoUrl: '/images/participants/juan-jose-parejo.png?v=2',
    category: 'A',
    eventType: 'Canto',
  },
  {
    id: '2',
    name: 'JARIANA SOFIA APRESA ARROLLO',
    description: 'Presentación de canto.',
    longDescription:
      'JARIANA SOFIA APRESA ARROLLO subirá al escenario para ofrecer una interpretación vocal única en la categoría A, buscando cautivar al jurado y al público.',
    photoUrl: '/images/participants/jariana-sofia-apresa.png?v=2',
    category: 'A',
    eventType: 'Canto',
  },
  {
    id: '3',
    name: 'JAIME ANDRES VILLARETE GALEANO',
    description: 'Presentación de canto.',
    longDescription:
      'JAIME ANDRES VILLARETE GALEANO participa en la categoría A, listo para mostrar su desenvolvimiento escénico y su potente voz.',
    photoUrl: '/images/participants/jaime-andres-villarete.png?v=2',
    category: 'A',
    eventType: 'Canto',
  },
  {
    id: '4',
    name: 'SAMUEL DAVID NISPERUZA CAICEDO',
    description: 'Presentación de canto.',
    longDescription:
      'SAMUEL DAVID NISPERUZA CAICEDO demostrará su habilidad técnica y originalidad en su presentación de canto para la categoría A.',
    photoUrl: '/images/participants/samuel-david-nisperuza.png?v=2',
    category: 'A',
    eventType: 'Canto',
  },
  {
    id: '5',
    name: 'ANA CASTILLA',
    description: 'Presentación de canto.',
    longDescription:
      'ANA CASTILLA competirá en la categoría A, compartiendo su talento vocal y carisma en una presentación que promete ser inolvidable.',
    photoUrl: '/images/participants/ana-castilla.png?v=2',
    category: 'A',
    eventType: 'Canto',
  },
  {
    id: '6',
    name: 'ANA LUCIA RUIZ GARCIA',
    description: 'Presentación de canto.',
    longDescription:
      'ANA LUCIA RUIZ GARCIA cierra la categoría A con una interpretación llena de sentimiento y técnica, esperando dejar una marca en el evento.',
    photoUrl: '/images/participants/ana-lucia-ruiz.png?v=2',
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
    photoUrl: '/images/participants/adriana-yisel-contreras.png?v=2',
    category: 'B',
    eventType: 'Canto',
  },
  {
    id: '8',
    name: 'MARIANGEL VICTORIA CHOURIO PEÑA',
    description: 'Presentación de canto.',
    longDescription:
      'MARIANGEL VICTORIA CHOURIO PEÑA demostrará su gran talento vocal y dominio escénico en la categoría B.',
    photoUrl: '/images/participants/mariangel-victoria-chourio.png?v=2',
    category: 'B',
    eventType: 'Canto',
  },
  {
    id: '9',
    name: 'SAMUEL LOGREIRA MARTINEZ',
    description: 'Presentación de canto.',
    longDescription:
      'SAMUEL LOGREIRA MARTINEZ buscará impresionar al jurado con su originalidad y potente mensaje en la categoría B.',
    photoUrl: '/images/participants/samuel-logreira-martinez.png?v=2',
    category: 'B',
    eventType: 'Canto',
  },
  {
    id: '10',
    name: 'VALERIA CAROLINA MEZA CHARRIS',
    description: 'Presentación de canto.',
    longDescription:
      'VALERIA CAROLINA MEZA CHARRIS, participante de la categoría B, ofrecerá una presentación llena de carisma y técnica.',
    photoUrl: '/images/participants/valeria-carolina-meza.png?v=2',
    category: 'B',
    eventType: 'Canto',
  },
  {
    id: '11',
    name: 'VANESSA ARANGO',
    description: 'Presentación de canto.',
    longDescription:
      'VANESSA ARANGO competirá en la categoría B, mostrando su talento y una propuesta artística fresca y creativa.',
    photoUrl: '/images/participants/vanessa-arango.png?v=2',
    category: 'B',
    eventType: 'Canto',
  },
  {
    id: '12',
    name: 'DALLANA ANDREA PINEDA PÉREZ',
    description: 'Presentación de canto.',
    longDescription:
      'DALLANA ANDREA PINEDA PÉREZ cierra la competencia en la categoría B con una interpretación vocal que promete emocionar a todos.',
    photoUrl: '/images/participants/dallana-andrea-pineda.png?v=2',
    category: 'B',
    eventType: 'Canto',
  },
  // Baile - Categoría A
  {
    id: '13',
    name: 'GRUPO BODY & SOUL',
    description: 'Presentación de baile.',
    longDescription: 'El grupo BODY & SOUL trae una coreografía llena de energía y pasión para la categoría A de baile.',
    photoUrl: '/images/participants/grupo-body-and-soul.png?v=2',
    category: 'A',
    eventType: 'Baile',
  },
  {
    id: '14',
    name: 'GRUPO PEQUEÑOS CON RITMO',
    description: 'Presentación de baile.',
    longDescription: 'PEQUEÑOS CON RITMO demostrarán su increíble coordinación y carisma en el escenario de la categoría A.',
    photoUrl: '/images/participants/grupo-pequenos-con-ritmo.png?v=2',
    category: 'A',
    eventType: 'Baile',
  },
  {
    id: '15',
    name: 'DANZA DE LOS PAJAROS',
    description: 'Presentación de baile.',
    longDescription: 'El grupo DANZA DE LOS PAJAROS presentará una pieza de baile tradicional con un toque moderno en la categoría A.',
    photoUrl: '/images/participants/danza-de-los-pajaros.png?v=2',
    category: 'A',
    eventType: 'Baile',
  },
    // Baile - Categoría B
  {
    id: '16',
    name: 'GRUPO FOLCLORICO SAN FRANCISCO JAVIER',
    description: 'Presentación de baile.',
    longDescription: 'El GRUPO FOLCLORICO SAN FRANCISCO JAVIER mostrará la riqueza cultural de la región con su presentación en la categoría B.',
    photoUrl: '/images/participants/grupo-folclorico-sfj.png?v=2',
    category: 'B',
    eventType: 'Baile',
  },
  {
    id: '17',
    name: 'GRUPO THE FLOW',
    description: 'Presentación de baile.',
    longDescription: 'THE FLOW llega a la categoría B con un estilo de baile urbano que promete sorprender a todos.',
    photoUrl: '/images/participants/grupo-the-flow.png?v=2',
    category: 'B',
    eventType: 'Baile',
  },
  {
    id: '18',
    name: 'DANZA PALOTEO',
    description: 'Presentación de baile.',
    longDescription: 'DANZA PALOTEO competirá en la categoría B con una coreografía que mezcla tradición y vanguardia.',
    photoUrl: '/images/participants/danza-paloteo.png?v=2',
    category: 'B',
    eventType: 'Baile',
  },
  {
    id: '19',
    name: 'GRUPO REYVOLUTION',
    description: 'Presentación de baile.',
    longDescription: 'El grupo REYVOLUTION está listo para revolucionar la categoría B con su innovadora propuesta de baile.',
    photoUrl: '/images/participants/grupo-reyvolution.png?v=2',
    category: 'B',
    eventType: 'Baile',
  },
  {
    id: '20',
    name: 'GRUPO FOLCLORICO DE DANZA',
    description: 'Presentación de baile.',
    longDescription: 'El GRUPO FOLCLORICO DE DANZA cierra la categoría B con una presentación que celebra las raíces culturales a través del baile.',
    photoUrl: '/images/participants/grupo-folclorico-de-danza.png?v=2',
    category: 'B',
    eventType: 'Baile',
  },
];

export const cantoCriteria: Criterion[] = [
  {
    id: 'expression',
    name: 'Expresión e interpretación',
    description: 'Capacidad de transmitir emociones y conectar con la audiencia.',
    weight: 30,
  },
  {
    id: 'tuning',
    name: 'Afinación y ritmo',
    description: 'Precisión en la entonación y sincronía con la música.',
    weight: 25,
  },
  {
    id: 'diction',
    name: 'Dicción y claridad',
    description: 'Claridad en la pronunciación y articulación de las palabras.',
    weight: 15,
  },
  {
    id: 'stage_presence',
    name: 'Presencia escénica',
    description: 'Confianza, carisma y desenvolvimiento en el escenario.',
    weight: 20,
  },
  {
    id: 'originality',
    name: 'Originalidad',
    description: 'Propuesta única y creativa en la interpretación.',
    weight: 10,
  },
];

export const baileCriteria: Criterion[] = [
  {
    id: 'technique',
    name: 'Técnica',
    description: 'Ejecución precisa y limpia de los movimientos.',
    weight: 20,
  },
  {
    id: 'rhythm',
    name: 'Ritmo y musicalidad',
    description: 'Sincronización con la música y la interpretación del ritmo.',
    weight: 15,
  },
  {
    id: 'coordination',
    name: 'Coordinación y sincronía',
    description: 'Uniformidad y precisión en los movimientos grupales.',
    weight: 15,
  },
  {
    id: 'body_expression',
    name: 'Expresión corporal y emocional',
    description: 'Capacidad de comunicar emociones a través del movimiento.',
    weight: 15,
  },
  {
    id: 'costume',
    name: 'Vestuario y presencia escénica',
    description: 'Adecuación y creatividad del vestuario y la puesta en escena.',
    weight: 10,
  },
  {
    id: 'creativity',
    name: 'Originalidad y creatividad',
    description: 'Propuesta coreográfica innovadora y única.',
    weight: 15,
  },
  {
    id: 'difficulty',
    name: 'Dificultad de la coreografía',
    description: 'Complejidad y exigencia técnica de la coreografía.',
    weight: 10,
  },
];
