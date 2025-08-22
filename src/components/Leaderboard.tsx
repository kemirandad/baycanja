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

interface RankedParticipant {
  id: string;
  name: string;
  totalScore: number;
  rank: number;
}

export default function Leaderboard() {
  const { scores, calculateTotalScore, resetScores } = useScoresStore();
  const [rankedParticipants, setRankedParticipants] = useState<
    RankedParticipant[]
  >([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const calculatedRanks = participants
        .map((participant) => ({
          ...participant,
          totalScore: calculateTotalScore(participant.id, criteria),
        }))
        .sort((a, b) => b.totalScore - a.totalScore)
        .map((p, index) => ({
          id: p.id,
          name: p.name,
          totalScore: p.totalScore,
          rank: index + 1,
        }));

      setRankedParticipants(calculatedRanks);
    }
  }, [scores, calculateTotalScore, isClient]);

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

  if (!isClient) {
    return null; // Or a loading skeleton
  }

  return (
    <Card>
      <CardContent className="pt-6">
        {participants.some((p) => scores[p.id]) ? (
          <>
            <div className="flex justify-end mb-4">
              <Button variant="destructive" onClick={resetScores}>
                Reiniciar Puntuaciones
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] text-center">Puesto</TableHead>
                  <TableHead>Participante</TableHead>
                  <TableHead className="text-right">Puntuación Final</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rankedParticipants.map((p) => (
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
          </>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg">Aún no se han registrado calificaciones.</p>
            <p>Ve a la página de participantes para empezar a evaluar.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
