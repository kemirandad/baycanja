import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Criterion } from '@/lib/types';

type Scores = {
  [participantId: string]: {
    [criterionId: string]: number;
  };
};

type ScoresState = {
  scores: Scores;
  setScore: (participantId: string, criterionId: string, score: number) => void;
  getScoresForParticipant: (
    participantId: string
  ) => { [criterionId: string]: number };
  calculateTotalScore: (participantId: string, criteria: Criterion[]) => number;
  resetScores: () => void;
};

export const useScoresStore = create<ScoresState>()(
  persist(
    (set, get) => ({
      scores: {},
      setScore: (participantId, criterionId, score) => {
        set((state) => ({
          scores: {
            ...state.scores,
            [participantId]: {
              ...state.scores[participantId],
              [criterionId]: score,
            },
          },
        }));
      },
      getScoresForParticipant: (participantId) => {
        return get().scores[participantId] || {};
      },
      calculateTotalScore: (participantId, criteria) => {
        const participantScores = get().scores[participantId] || {};
        const totalWeight = criteria.reduce(
          (sum, criterion) => sum + criterion.weight,
          0
        );
        if (totalWeight === 0) return 0;

        const weightedScore = criteria.reduce((total, criterion) => {
          const score = participantScores[criterion.id] || 0;
          return total + score * criterion.weight;
        }, 0);

        return (weightedScore / totalWeight) * 10;
      },
      resetScores: () => {
        if (
          confirm(
            '¿Estás seguro de que quieres borrar todas las puntuaciones? Esta acción no se puede deshacer.'
          )
        ) {
          set({ scores: {} });
        }
      },
    }),
    {
      name: 'baycanja-scores-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
