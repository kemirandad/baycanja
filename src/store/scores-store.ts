import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Criterion, User } from '@/lib/types';

type StoredUser = Omit<User, 'password'>;

type Scores = {
  [judgeId: string]: {
    [participantId: string]: {
      [criterionId: string]: number;
    };
  };
};

type ScoresState = {
  scores: Scores;
  currentUser: StoredUser | null;
  setCurrentUser: (user: StoredUser | null) => void;
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
      currentUser: null,
      setCurrentUser: (user) => set({ currentUser: user }),
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
        
        const totalScore = criteria.reduce((total, criterion) => {
          const score = participantScores[criterion.id] || 0;
          return total + (score * (criterion.weight/100));
        }, 0);
        
        return totalScore * 10;
      },
      resetScores: (judgeId) => {
        if (
          typeof window !== 'undefined' &&
          window.confirm(
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
      name: 'baycanja-scores-storage-v4-roles',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
