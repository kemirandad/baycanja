import Leaderboard from '@/components/Leaderboard';

export default function LeaderboardPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">
          Tabla de Resultados
        </h1>
        <p className="text-lg text-muted-foreground">
          Clasificación en tiempo real de los participantes.
        </p>
      </div>
      <Leaderboard />
    </div>
  );
}
