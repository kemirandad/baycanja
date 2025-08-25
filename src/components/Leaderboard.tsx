
'use client';

import { useEffect, useState, useMemo } from 'react';
import { useScoresStore } from '@/store/scores-store';
import { participants, criteria, users } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Trophy, Medal, Award, Mic, Clapperboard, RotateCcw, ChevronDown } from 'lucide-react';
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
  CartesianGrid,
} from 'recharts';
import { Button } from './ui/button';
import React from 'react';
import type { Participant, Criterion } from '@/lib/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { collection, onSnapshot, query, writeBatch, getDocs, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface ScoreData {
  [criterionId: string]: number;
}

interface FirestoreScoreDoc {
  id: string; // judgeId_participantId
  scores: ScoreData;
}

interface RankedParticipant {
  id: string;
  name: string;
  totalScore: number;
  rank: number;
  category: 'A' | 'B';
  eventType: 'Canto' | 'Baile';
  judgeScores: { judgeUsername: string; score: number }[];
}

const calculateTotalScore = (scores: ScoreData, criteria: Criterion[]): number => {
  if (!scores) return 0;
  const totalScore = criteria.reduce((total, criterion) => {
    const score = scores[criterion.id] || 0;
    return total + (score * (criterion.weight / 100));
  }, 0);
  return totalScore * 10;
};

const DetailsRow = ({ participant }: { participant: RankedParticipant }) => {
  return (
    <TableRow>
      <TableCell colSpan={4} className="p-0">
        <div className="p-4 bg-muted/50">
          <h4 className="text-lg font-semibold mb-2 text-center">
            Desglose de Puntuaciones para {participant.name}
          </h4>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={participant.judgeScores.filter(s => s.score > 0)}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="judgeUsername" />
                <YAxis domain={[0, 100]} />
                <Tooltip formatter={(value: number) => [value.toFixed(2), "Puntaje"]}/>
                <Legend />
                <Bar dataKey="score" name="Puntaje" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
};

const ParticipantRow = ({ participant }: { participant: RankedParticipant }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getPodiumIcon = (rank: number) => {
    const props = { className: 'h-6 w-6' };
    switch (rank) {
      case 1: return <Trophy {...props} color="#FFD700" />;
      case 2: return <Medal {...props} color="#C0C0C0" />;
      case 3: return <Award {...props} color="#CD7F32" />;
      default: return <span className="font-mono text-lg">{rank}</span>;
    }
  };

  return (
    <React.Fragment>
      <TableRow className={participant.rank <= 3 ? 'font-bold bg-secondary/50' : ''}>
        <TableCell className="text-center">
          <div className="flex justify-center items-center gap-2">
            {getPodiumIcon(participant.rank)}
          </div>
        </TableCell>
        <TableCell className="text-lg">{participant.name}</TableCell>
        <TableCell className="text-right text-lg text-primary font-mono">
          {participant.totalScore.toFixed(2)}
        </TableCell>
        <TableCell className="text-center">
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
            <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </Button>
        </TableCell>
      </TableRow>
      {isOpen && <DetailsRow participant={participant} />}
    </React.Fragment>
  );
};

export default function Leaderboard() {
  const { currentUser } = useScoresStore();
  const [allScores, setAllScores] = useState<FirestoreScoreDoc[]>([]);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    if (!currentUser) {
      router.push('/login');
    }
  }, [currentUser, router]);

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, "scores"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const scoresData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        scores: doc.data() as ScoreData,
      }));
      setAllScores(scoresData);
    });

    return () => unsubscribe();
  }, []);

  const rankedParticipants = useMemo(() => {
    const scoresByParticipant = allScores.reduce((acc, scoreDoc) => {
      const participantId = scoreDoc.id.split('_')[1];
      if (!acc[participantId]) {
        acc[participantId] = [];
      }
      acc[participantId].push(scoreDoc);
      return acc;
    }, {} as Record<string, FirestoreScoreDoc[]>);
  
    const averagedParticipants = participants.map((participant) => {
      const participantScoreDocs = scoresByParticipant[participant.id] || [];
      const judgeScores = participantScoreDocs.map(s => {
        const judgeId = s.id.split('_')[0];
        const judgeUsername = users.find(u => u.id === judgeId)?.username || 'Desconocido';
        return {
          judgeUsername,
          score: calculateTotalScore(s.scores, criteria),
        };
      });
  
      const totalAverageScore = judgeScores.length > 0
        ? judgeScores.reduce((acc, s) => acc + s.score, 0) / judgeScores.length
        : 0;
  
      return {
        ...participant,
        totalScore: totalAverageScore,
        judgeScores,
      };
    });
  
    // Function to rank a list of participants
    const rankParticipants = (list: typeof averagedParticipants) => {
      const sorted = [...list].sort((a, b) => b.totalScore - a.totalScore);
      return sorted.map((p, index) => ({
        ...p,
        rank: index + 1,
      }));
    };
  
    // Filter and rank for each group
    const cantoA = rankParticipants(averagedParticipants.filter(p => p.eventType === 'Canto' && p.category === 'A'));
    const cantoB = rankParticipants(averagedParticipants.filter(p => p.eventType === 'Canto' && p.category === 'B'));
    const baileA = rankParticipants(averagedParticipants.filter(p => p.eventType === 'Baile' && p.category === 'A'));
    const baileB = rankParticipants(averagedParticipants.filter(p => p.eventType === 'Baile' && p.category === 'B'));
  
    return [...cantoA, ...cantoB, ...baileA, ...baileB] as RankedParticipant[];
  }, [allScores]);

  const resetScoresForEvent = async (eventType: 'Canto' | 'Baile') => {
    const participantIdsToReset = participants
      .filter(p => p.eventType === eventType)
      .map(p => p.id);
  
    if (participantIdsToReset.length === 0) return;
  
    const scoresCollection = collection(db, "scores");
    const batch = writeBatch(db);
  
    // Firestore `where in` query supports up to 30 items. 
    // If you have more participants, this needs to be chunked.
    // Assuming less than 30 participants per event type for now.
    const participantIds = allScores.map(s => s.id.split('_')[1]);
    const relevantParticipantIds = participantIds.filter(id => participantIdsToReset.includes(id));
  
    if (relevantParticipantIds.length > 0) {
      const scoresToDeleteQuery = query(scoresCollection, where('participantId', 'in', relevantParticipantIds));
      const snapshot = await getDocs(scoresToDeleteQuery);
      snapshot.docs.forEach(doc => {
        // This is a safety check, but the query should handle it.
        const pId = doc.id.split('_')[1];
        const pData = participants.find(p => p.id === pId);
        if (pData?.eventType === eventType) {
            batch.delete(doc.ref);
        }
      });
    }
  
    // Legacy check for documents without participantId field (based on original implementation)
    const allDocsSnapshot = await getDocs(scoresCollection);
    allDocsSnapshot.forEach(doc => {
      const participantId = doc.id.split('_')[1];
      if (participantIdsToReset.includes(participantId) && !doc.data().participantId) {
        batch.delete(doc.ref);
      }
    });
  
  
    await batch.commit();
  };

  const renderLeaderboardTable = (eventType: 'Canto' | 'Baile', category: 'A' | 'B') => {
    if (!currentUser) return null;
    
    const categoryParticipants = rankedParticipants.filter(p => p.eventType === eventType && p.category === category);
    
    const isAnyScoreRegisteredForEvent = allScores.some(s => {
        const pId = s.id.split('_')[1];
        const p = participants.find(p => p.id === pId);
        return p?.eventType === eventType;
    });

    if (!isAnyScoreRegisteredForEvent) {
      return (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg">Aún no se han registrado calificaciones para {eventType}.</p>
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
            .map((p) => <ParticipantRow key={p.id} participant={p} />
          )}
        </TableBody>
      </Table>
    );
  };

  const renderCategoryTabs = (eventType: 'Canto' | 'Baile') => {
    return (
      <Tabs defaultValue="categoryA" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
          <TabsTrigger value="categoryA">Categoría A</TabsTrigger>
          <TabsTrigger value="categoryB">Categoría B</TabsTrigger>
        </TabsList>
        <TabsContent value="categoryA">
          {renderLeaderboardTable(eventType, 'A')}
        </TabsContent>
        <TabsContent value="categoryB">
          {renderLeaderboardTable(eventType, 'B')}
        </TabsContent>
        {currentUser?.role === 'ADMIN' && (
           <div className="mt-8 text-center">
           <AlertDialog>
             <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reiniciar Puntuaciones de {eventType}
                </Button>
             </AlertDialogTrigger>
             <AlertDialogContent>
               <AlertDialogHeader>
                 <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                 <AlertDialogDescription>
                    Esta acción borrará permanentemente todas las puntuaciones para el evento de {eventType}. Esta acción no se puede deshacer.
                 </AlertDialogDescription>
               </AlertDialogHeader>
               <AlertDialogFooter>
                 <AlertDialogCancel>Cancelar</AlertDialogCancel>
                 <AlertDialogAction onClick={() => resetScoresForEvent(eventType)}>Continuar</AlertDialogAction>
               </AlertDialogFooter>
             </AlertDialogContent>
           </AlertDialog>
         </div>
        )}
      </Tabs>
    );
  };

  if (!isClient || !currentUser) {
    return null;
  }
  
  const canSeeCanto = currentUser.role === 'ADMIN' || currentUser.role === 'CANTO';
  const canSeeBaile = currentUser.role === 'ADMIN' || currentUser.role === 'BAILE';
  const defaultTab = canSeeCanto ? 'canto' : 'baile';

  return (
    <Card>
      <CardContent className="pt-6">
       {currentUser.role === 'ADMIN' ? (
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-lg mx-auto mb-6">
            <TabsTrigger value="canto"><Mic className="mr-2"/>Canto</TabsTrigger>
            <TabsTrigger value="baile"><Clapperboard className="mr-2"/>Baile</TabsTrigger>
          </TabsList>
          <TabsContent value="canto">
            {renderCategoryTabs('Canto')}
          </TabsContent>
          <TabsContent value="baile">
            {renderCategoryTabs('Baile')}
          </TabsContent>
        </Tabs>
         ) : (
          <>
            {canSeeCanto && renderCategoryTabs('Canto')}
            {canSeeBaile && renderCategoryTabs('Baile')}
          </>
       )}
      </CardContent>
    </Card>
  );
}
