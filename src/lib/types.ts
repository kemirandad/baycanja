export interface Participant {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  photoUrl: string;
}

export interface Criterion {
  id: string;
  name: string;
  description: string;
  weight: number;
}
