import type { Participant, Criterion } from './types';

export const participants: Participant[] = [
  {
    id: '1',
    name: 'Grupo de Danza Folclórica',
    description: 'Tradición y color en cada paso.',
    longDescription:
      'El Grupo de Danza Folclórica nos trae un recorrido por las danzas más representativas de nuestro país, mostrando la riqueza cultural a través de coreografías llenas de energía y trajes coloridos. Llevan meses preparando esta presentación especial para BAYCANJA.',
    photoUrl: 'https://placehold.co/600x400.png',
    category: 'A',
  },
  {
    id: '2',
    name: 'Banda de Rock "Los Innovadores"',
    description: 'Energía pura y rock and roll.',
    longDescription:
      'Con riffs potentes y una voz inconfundible, "Los Innovadores" prometen hacer vibrar al público. Esta banda de rock, formada por estudiantes de último año, compone sus propias canciones inspiradas en los clásicos del rock y los desafíos de la vida moderna.',
    photoUrl: 'https://placehold.co/600x400.png',
    category: 'A',
  },
  {
    id: '3',
    name: 'Solista de Canto: Ana Virtudes',
    description: 'Una voz que cautiva.',
    longDescription:
      'Ana, con su excepcional talento vocal, interpretará una balada que tocará el corazón de todos. Su pasión por la música es evidente en cada nota, y su presencia en el escenario es simplemente magnética.',
    photoUrl: 'https://placehold.co/600x400.png',
    category: 'B',
  },
  {
    id: '4',
    name: 'Dúo de Magia "Ilusión Gemela"',
    description: 'Asombro y misterio en el escenario.',
    longDescription:
      'Los hermanos "Ilusión Gemela" han preparado un acto de magia que desafiará la lógica y la percepción. Con trucos nunca antes vistos y una gran dosis de humor, garantizan un espectáculo inolvidable para todos los asistentes de BAYCANJA.',
    photoUrl: 'https://placehold.co/600x400.png',
    category: 'A',
  },
  {
    id: '5',
    name: 'Competidor de Oratoria: Carlos Elocuente',
    description: 'Palabras que inspiran.',
    longDescription:
      'Carlos, un orador nato, presentará un discurso sobre la importancia de la perseverancia y los sueños. Con su poderosa retórica y carisma, busca motivar a sus compañeros a nunca rendirse y a luchar por sus metas.',
    photoUrl: 'https://placehold.co/600x400.png',
    category: 'B',
  },
  {
    id: '6',
    name: 'Exhibición de Arte en Vivo',
    description: 'Creatividad en tiempo real.',
    longDescription:
      'Un colectivo de artistas plásticos creará una obra de arte en vivo durante el evento. Utilizando diversas técnicas y materiales, transformarán un lienzo en blanco en una pieza que capture la esencia y el espíritu de BAYCANJA.',
    photoUrl: 'https://placehold.co/600x400.png',
    category: 'B',
  },
];

export const criteria: Criterion[] = [
  {
    id: 'originality',
    name: 'Originalidad y Creatividad',
    description: 'Nivel de innovación y singularidad de la presentación.',
    weight: 0.3,
  },
  {
    id: 'technique',
    name: 'Habilidad Técnica',
    description:
      'Dominio y ejecución de las habilidades requeridas para la presentación.',
    weight: 0.3,
  },
  {
    id: 'presentation',
    name: 'Presencia Escénica',
    description: 'Carisma, confianza y conexión con el público.',
    weight: 0.25,
  },
  {
    id: 'impact',
    name: 'Impacto General y Audiencia',
    description: 'La impresión general y la reacción del público.',
    weight: 0.15,
  },
];
