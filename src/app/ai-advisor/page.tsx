import AiAdvisor from '@/components/AiAdvisor';

export default function AiAdvisorPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">
          Asesor de Ponderación con IA
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Obtén sugerencias para los pesos de los criterios de evaluación
          basadas en datos históricos de eventos pasados.
        </p>
      </div>
      <AiAdvisor />
    </div>
  );
}
