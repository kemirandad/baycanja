'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useScoresStore } from '@/store/scores-store';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { LogIn, Medal } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { setCurrentJudgeId } = useScoresStore();
  const [selectedJudge, setSelectedJudge] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!selectedJudge) {
      setError('Por favor, selecciona un juez para continuar.');
      return;
    }
    setError('');
    setCurrentJudgeId(selectedJudge);
    router.push('/');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
       <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(231,72,72,0.1),transparent)]"></div></div>
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <Medal className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-3xl font-extrabold">BAYCANJA Ranks</CardTitle>
          <CardDescription className="text-lg">
            Bienvenido, Jurado. Por favor, identifíquese.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="judge-select" className="text-base">Seleccionar Juez</Label>
            <Select value={selectedJudge} onValueChange={setSelectedJudge}>
              <SelectTrigger id="judge-select" className="w-full text-base h-12">
                <SelectValue placeholder="Seleccione su usuario de juez..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Juez 1">Juez 1</SelectItem>
                <SelectItem value="Juez 2">Juez 2</SelectItem>
                <SelectItem value="Juez 3">Juez 3</SelectItem>
                <SelectItem value="Juez 4">Juez 4</SelectItem>
              </SelectContent>
            </Select>
            {error && <p className="text-sm font-medium text-destructive pt-1">{error}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleLogin} className="w-full text-lg py-6">
            <LogIn className="mr-2 h-5 w-5"/>
            Iniciar Sesión
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
