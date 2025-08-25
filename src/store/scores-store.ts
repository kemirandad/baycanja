import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Criterion, Participant, User } from '@/lib/types';
import { participants } from '@/lib/data';

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
  hasScores: (judgeId: string, participantId: string) => boolean;
  resetScoresForEvent: (eventType: 'Canto' | 'Baile') => void;
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
      hasScores: (judgeId, participantId) => {
        const scores = get().scores[judgeId]?.[participantId];
        return !!scores && Object.keys(scores).length > 0;
      },
      resetScoresForEvent: (eventType) => {
        set(state => {
          const newScores = { ...state.scores };
          const participantsToReset = participants.filter(p => p.eventType === eventType).map(p => p.id);

          for (const judgeId in newScores) {
            for (const participantId of participantsToReset) {
              if (newScores[judgeId]?.[participantId]) {
                delete newScores[judgeId][participantId];
              }
            }
            if (Object.keys(newScores[judgeId]).length === 0) {
              delete newScores[judgeId];
            }
          }
          
          return { scores: newScores };
        });
      },
    }),
    {
      name: 'baycanja-scores-storage-v5-roles-reset',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
