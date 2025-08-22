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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from './ui/button';
import { ChevronDown } from 'lucide-react';

interface RankedParticipant {
  id: string;
  name: string;
  totalScore: number;
  rank: number;
  category: 'A' | 'B';
  judgeScores: { judgeId: string; score: number }[];
}

const JUDGES = ['Juez 1', 'Juez 2', 'Juez 3'];

export default function Leaderboard() {
  const { scores, calculateTotalScore, currentJudgeId } =
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
        .map((participant) => {
          const judgeScores = JUDGES.map(judgeId => ({
            judgeId,
            score: calculateTotalScore(judgeId, participant.id, criteria),
          }));

          const avgScore = judgeScores.reduce((acc, s) => acc + s.score, 0) / (judgeScores.length || 1);

          return {
            ...participant,
            totalScore: avgScore,
            judgeScores,
          };
        })
        .sort((a, b) => b.totalScore - a.totalScore)
        .map((p, index, all) => {
          const categoryPeers = all.filter((x) => x.category === p.category);
          const categoryRank =
            categoryPeers.sort((a, b) => b.totalScore - a.totalScore).findIndex((x) => x.id === p.id) + 1;

          return {
            id: p.id,
            name: p.name,
            totalScore: p.totalScore,
            category: p.category,
            rank: categoryRank,
            judgeScores: p.judgeScores
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
    
    const isAnyScoreRegistered = Object.values(scores).some(judgeScores => Object.keys(judgeScores).length > 0);


    if (!isAnyScoreRegistered) {
      return (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg">
            Aún no se han registrado calificaciones.
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
            <TableHead className="text-right">Promedio Final</TableHead>
            <TableHead className="w-[100px] text-center">Detalles</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categoryParticipants
            .sort((a, b) => a.rank - b.rank)
            .map((p) => (
              <Collapsible asChild key={p.id}>
                <TableBody>
                  <TableRow
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
                    <TableCell className='text-center'>
                      <CollapsibleTrigger asChild>
                         <Button variant="ghost" size="sm">
                          <ChevronDown className="h-4 w-4" />
                          <span className="sr-only">Ver detalles</span>
                        </Button>
                      </CollapsibleTrigger>
                    </TableCell>
                  </TableRow>
                  <CollapsibleContent asChild>
                    <TableRow>
                      <TableCell colSpan={4} className="p-0">
                        <div className="p-4 bg-muted/50">
                          <h4 className="text-lg font-semibold mb-2 text-center">Desglose de Puntuaciones para {p.name}</h4>
                          <div className="h-64 w-full">
                           <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={p.judgeScores} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="judgeId" />
                                <YAxis domain={[0, 100]} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="score" name="Puntaje" fill="hsl(var(--primary))" />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  </CollapsibleContent>
                </TableBody>
              </Collapsible>
            ))}
        </TableBody>
      </Table>
    );
  };

  if (!isClient || !currentJudgeId) {
    return null; 
  }

  return (
    <Card>
      <CardContent className="pt-6">
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
