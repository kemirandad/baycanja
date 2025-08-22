import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Criterion } from '@/lib/types';

// Scores are now nested under a judgeId
type Scores = {
  [judgeId: string]: {
    [participantId: string]: {
      [criterionId: string]: number;
    };
  };
};

type ScoresState = {
  scores: Scores;
  currentJudgeId: string;
  setCurrentJudgeId: (judgeId: string) => void;
  setScore: (
    judgeId: string,
    participantId: string,
    criterionId: string,
    score: number
  ) => void;
  getScoresForParticipant: (
    judgeId: string,
    participantId: string
  ) => { [criterionId: string]: number };
  calculateTotalScore: (
    judgeId: string,
    participantId: string,
    criteria: Criterion[]
  ) => number;
  resetScores: (judgeId: string) => void;
  hasScores: (judgeId: string, participantId: string) => boolean;
};

export const useScoresStore = create<ScoresState>()(
  persist(
    (set, get) => ({
      scores: {},
      currentJudgeId: 'juez1',
      setCurrentJudgeId: (judgeId) => set({ currentJudgeId: judgeId }),
      setScore: (judgeId, participantId, criterionId, score) => {
        set((state) => ({
          scores: {
            ...state.scores,
            [judgeId]: {
              ...state.scores[judgeId],
              [participantId]: {
                ...state.scores[judgeId]?.[participantId],
                [criterionId]: score,
              },
            },
          },
        }));
      },
      getScoresForParticipant: (judgeId, participantId) => {
        return get().scores[judgeId]?.[participantId] || {};
      },
      calculateTotalScore: (judgeId, participantId, criteria) => {
        const participantScores = get().scores[judgeId]?.[participantId] || {};
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
      resetScores: (judgeId) => {
        if (
          confirm(
            `¿Estás seguro de que quieres borrar las puntuaciones para ${judgeId}? Esta acción no se puede deshacer.`
          )
        ) {
          set((state) => {
            const newScores = { ...state.scores };
            delete newScores[judgeId];
            return { scores: newScores };
          });
        }
      },
      hasScores: (judgeId, participantId) => {
        return !!get().scores[judgeId]?.[participantId];
      }
    }),
    {
      name: 'baycanja-scores-storage-v2', // New name to avoid conflicts
      storage: createJSONStorage(() => localStorage),
    }
  )
);
