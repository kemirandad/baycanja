'use client';

import { useEffect, useState } from 'react';
import { useScoresStore } from '@/store/scores-store';
import { participants, criteria } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Trophy, Medal, Award } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';

interface RankedParticipant {
  id: string;
  name: string;
  totalScore: number;
  rank: number;
  category: 'A' | 'B';
}

export default function Leaderboard() {
  const { scores, calculateTotalScore, resetScores, currentJudgeId, hasScores } =
    useScoresStore();
  const [rankedParticipants, setRankedParticipants] = useState<
    RankedParticipant[]
  >([]);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    if (!currentJudgeId) {
      router.push('/login');
    }
  }, [currentJudgeId, router]);

  useEffect(() => {
    if (isClient && currentJudgeId) {
      const calculatedRanks = participants
        .map((participant) => ({
          ...participant,
          totalScore: calculateTotalScore(
            currentJudgeId,
            participant.id,
            criteria
          ),
        }))
        .sort((a, b) => b.totalScore - a.totalScore)
        .map((p, index, all) => {
          // Rank calculation needs to be per category
          const categoryPeers = all.filter((x) => x.category === p.category);
          const categoryRank =
            categoryPeers.sort((a, b) => b.totalScore - a.totalScore).findIndex((x) => x.id === p.id) + 1;

          return {
            id: p.id,
            name: p.name,
            totalScore: p.totalScore,
            category: p.category,
            rank: categoryRank,
          };
        });

      setRankedParticipants(calculatedRanks);
    }
  }, [scores, calculateTotalScore, isClient, currentJudgeId]);

  const getPodiumIcon = (rank: number) => {
    const props = { className: 'h-6 w-6' };
    switch (rank) {
      case 1:
        return <Trophy {...props} color="#FFD700" />;
      case 2:
        return <Medal {...props} color="#C0C0C0" />;
      case 3:
        return <Award {...props} color="#CD7F32" />;
      default:
        return <span className="font-mono text-lg">{rank}</span>;
    }
  };

  const renderLeaderboardTable = (category: 'A' | 'B') => {
    if (!currentJudgeId) return null;
    const categoryParticipants = rankedParticipants.filter(
      (p) => p.category === category
    );
    const isAnyScoreRegistered = participants.some((p) =>
      p.category === category && hasScores(currentJudgeId, p.id)
    );

    if (!isAnyScoreRegistered) {
      return (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg">
            Aún no se han registrado calificaciones en esta categoría para el{' '}
            <strong>{currentJudgeId}</strong>.
          </p>
          <p>Ve a la página de participantes para empezar a evaluar.</p>
        </div>
      );
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center">Puesto</TableHead>
            <TableHead>Participante</TableHead>
            <TableHead className="text-right">Puntuación Final</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categoryParticipants
            .sort((a, b) => a.rank - b.rank)
            .map((p) => (
              <TableRow
                key={p.id}
                className={p.rank <= 3 ? 'font-bold bg-secondary/50' : ''}
              >
                <TableCell className="text-center">
                  <div className="flex justify-center items-center gap-2">
                    {getPodiumIcon(p.rank)}
                  </div>
                </TableCell>
                <TableCell className="text-lg">{p.name}</TableCell>
                <TableCell className="text-right text-lg text-primary font-mono">
                  {p.totalScore.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    );
  };

  if (!isClient || !currentJudgeId) {
    return null; // Or a loading skeleton
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Resultados para: {currentJudgeId}</h2>
          <Button
            variant="destructive"
            onClick={() => resetScores(currentJudgeId)}
          >
            Reiniciar Puntuaciones ({currentJudgeId})
          </Button>
        </div>
        <Tabs defaultValue="categoryA" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
            <TabsTrigger value="categoryA">Categoría A</TabsTrigger>
            <TabsTrigger value="categoryB">Categoría B</TabsTrigger>
          </TabsList>
          <TabsContent value="categoryA">
            {renderLeaderboardTable('A')}
          </TabsContent>
          <TabsContent value="categoryB">
            {renderLeaderboardTable('B')}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
