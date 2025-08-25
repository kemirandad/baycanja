'use client';

import Leaderboard from '@/components/Leaderboard';
import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';
import { useState } from 'react';

export default function PublicResultsPage() {
    const [key, setKey] = useState(0);

    const handleRefresh = () => {
        setKey(prevKey => prevKey + 1);
    }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">
          Resultados en Vivo - BAYCANJA
        </h1>
        <p className="text-lg text-muted-foreground">
          Clasificación en tiempo real de los participantes.
        </p>
        <div className="mt-4">
            <Button onClick={handleRefresh}>
                <RefreshCcw className="mr-2 h-4 w-4"/>
                Forzar Actualización
            </Button>
        </div>
      </div>
      <Leaderboard key={key} isPublic={true} />
    </div>
  );
}
