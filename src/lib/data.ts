import type { Participant, Criterion } from './types';

export const participants: Participant[] = [
  {
    id: '1',
    name: 'Grupo de Danza "Amanecer"',
    description: 'Folclore y tradición en movimiento.',
    longDescription:
      'El grupo "Amanecer" nos deleita con un espectáculo de danzas folclóricas que celebran la rica herencia cultural de nuestra región. Su dedicación y pasión se reflejan en cada coreografía.',
    photoUrl: 'https://placehold.co/600x400.png',
    category: 'A',
  },
  {
    id: '2',
    name: 'Banda "Frecuencia Astral"',
    description: 'Rock alternativo con letras profundas.',
    longDescription:
      '"Frecuencia Astral" trae una propuesta de rock alternativo con composiciones originales que exploran temas existenciales y sociales, todo envuelto en potentes arreglos musicales.',
    photoUrl: 'https://placehold.co/600x400.png',
    category: 'A',
  },
  {
    id: '3',
    name: 'Sofía "La Voz" Robles',
    description: 'Interpretación vocal que eriza la piel.',
    longDescription:
      'Sofía, conocida como "La Voz", es una solista con un dominio escénico y vocal impresionante. Interpretará una balada poderosa que promete conectar con el público a un nivel emocional.',
    photoUrl: 'https://placehold.co/600x400.png',
    category: 'A',
  },
  {
    id: '4',
    name: 'Marco "El Ilusionista" Valdéz',
    description: 'Magia que desafía la realidad.',
    longDescription:
      'Marco Valdéz, un maestro de la ilusión, presenta un acto de magia de cerca y mentalismo que dejará a todos cuestionando la realidad. Prepárense para ser sorprendidos.',
    photoUrl: 'https://placehold.co/600x400.png',
    category: 'A',
  },
  {
    id: '5',
    name: 'Alejandro "Elocuencia" Pérez',
    description: 'Oratoria sobre liderazgo y futuro.',
    longDescription:
      'Con un discurso titulado "Líderes del Mañana", Alejandro Pérez busca inspirar a sus compañeros a tomar las riendas de su futuro y a convertirse en agentes de cambio positivo en la sociedad.',
    photoUrl: 'https://placehold.co/600x400.png',
    category: 'A',
  },
  {
    id: '6',
    name: 'Dueto "Armonía Acústica"',
    description: 'Covers populares con un toque único.',
    longDescription:
      'Este dueto de guitarra y voz trae versiones frescas y emotivas de canciones conocidas. Su química en el escenario y sus arreglos acústicos crean una atmósfera íntima y memorable.',
    photoUrl: 'https://placehold.co/600x400.png',
    category: 'B',
  },
  {
    id: '7',
    name: 'Compañía de Teatro "Catarsis"',
    description: 'Fragmento de una obra clásica.',
    longDescription:
      'La compañía "Catarsis" interpretará una escena impactante de una obra de teatro universal, demostrando su talento actoral y su capacidad para transmitir emociones complejas.',
    photoUrl: 'https://placehold.co/600x400.png',
    category: 'B',
  },
  {
    id: '8',
    name: 'Mariana "Lienzo Vivo" Díaz',
    description: 'Pintura rápida sobre lienzo.',
    longDescription:
      'Mariana Díaz creará una obra de arte desde cero en solo minutos. Su técnica de pintura rápida es un espectáculo de velocidad, precisión y creatividad que captura la esencia del evento.',
    photoUrl: 'https://placehold.co/600x400.png',
    category: 'B',
  },
  {
    id: '9',
    name: 'Carlos "Stand-Up" Fuentes',
    description: 'Monólogo de comedia sobre la vida estudiantil.',
    longDescription:
      'Carlos Fuentes ofrece una rutina de stand-up comedy llena de observaciones agudas y divertidas sobre los desafíos y absurdos de la vida de estudiante. Risas garantizadas.',
    photoUrl: 'https://placehold.co/600x400.png',
    category: 'B',
  },
  {
    id: '10',
    name: 'Beatriz "Poesía" Luna',
    description: 'Recital de poesía original.',
    longDescription:
      'Beatriz Luna compartirá una selección de sus poemas más personales, explorando temas de amor, pérdida y esperanza. Su poderosa declamación da vida a cada verso.',
    photoUrl: 'https://placehold.co/600x400.png',
    category: 'B',
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
