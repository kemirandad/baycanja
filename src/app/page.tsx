'use client';

import Link from 'next/link';
import Image from 'next/image';
import { participants } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';
import { useScoresStore } from '@/store/scores-store';
import { useEffect } from 'react';
import type { Participant } from '@/lib/types';

export default function Home() {
  const router = useRouter();
  const { currentJudgeId } = useScoresStore();

  useEffect(() => {
    if (!currentJudgeId) {
      router.push('/login');
    }
  }, [currentJudgeId, router]);

  const photoHints = [
    'folk dance', 'rock band', 'singer woman', 'magician stage',
    'public speaking', 'live painting', 'stand up comedy', 'orchestra conductor',
    'ballet dancers', 'dj mixing', 'gospel singer', 'acoustic guitar',
    'modern dance', 'hip hop dance', 'traditional dance', 'dance crew',
    'salsa dancing', 'flamenco dancer', 'group dance', 'contemporary dance'
  ];

  const renderParticipantCard = (participant: Participant, index: number) => (
    <Card
      key={participant.id}
      className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl bg-card/80 backdrop-blur-sm"
    >
      <CardHeader className="p-0">
        <div className="aspect-video relative">
          <Image
            src={participant.photoUrl}
            alt={`Foto de ${participant.name}`}
            fill
            className="object-cover"
            data-ai-hint={photoHints[index % photoHints.length]}
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6">
        <CardTitle className="text-2xl font-bold mb-2 text-primary">
          {participant.name}
        </CardTitle>
        <CardDescription>{participant.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full">
          <Link href={`/participants/${participant.id}`}>
            Evaluar Presentación <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );

  const renderCategoryTabs = (eventType: 'Canto' | 'Baile') => {
    const participantsA = participants.filter((p) => p.eventType === eventType && p.category === 'A');
    const participantsB = participants.filter((p) => p.eventType === eventType && p.category === 'B');
    const baseIndex = eventType === 'Canto' ? 0 : 12;

    return (
      <Tabs defaultValue="categoryA" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-10 bg-transparent border-2 border-primary p-1 rounded-lg">
          <TabsTrigger value="categoryA" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md">Categoría A</TabsTrigger>
          <TabsTrigger value="categoryB" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md">Categoría B</TabsTrigger>
        </TabsList>
        <TabsContent value="categoryA">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {participantsA.map((p, i) => renderParticipantCard(p, baseIndex + i))}
          </div>
        </TabsContent>
        <TabsContent value="categoryB">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {participantsB.map((p, i) => renderParticipantCard(p, baseIndex + 6 + i))}
          </div>
        </TabsContent>
      </Tabs>
    );
  }

  if (!currentJudgeId) {
    return null;
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold text-primary mb-3 tracking-tight">
          Participantes de BAYCANJA
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Conoce a los talentosos artistas y oradores que compiten este año.
        </p>
      </div>
      <Tabs defaultValue="canto" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-lg mx-auto mb-6">
          <TabsTrigger value="canto">Canto</TabsTrigger>
          <TabsTrigger value="baile">Baile</TabsTrigger>
        </TabsList>
        <TabsContent value="canto">
          {renderCategoryTabs('Canto')}
        </TabsContent>
        <TabsContent value="baile">
          {renderCategoryTabs('Baile')}
        </TabsContent>
      </Tabs>
    </div>
  );
}
