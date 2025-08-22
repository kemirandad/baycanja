export interface Participant {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  photoUrl: string;
  category: 'A' | 'B';
}

export interface Criterion {
  id: string;
  name: string;
  description: string;
  weight: number;
}
