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

export default function Home() {
  const photoHints = [
    'folk dance',
    'rock band',
    'singer woman',
    'magician stage',
    'public speaking',
    'live painting',
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">
          Participantes de BAYCANJA
        </h1>
        <p className="text-lg text-muted-foreground">
          Conoce a los talentos de este año.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {participants.map((participant, index) => (
          <Card
            key={participant.id}
            className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
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
              <CardTitle className="text-2xl font-bold mb-2">
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
        ))}
      </div>
    </div>
  );
}
