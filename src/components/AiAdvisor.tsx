'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  suggestEvaluationCriteria,
  type SuggestEvaluationCriteriaOutput,
} from '@/ai/flows/suggest-evaluation-criteria';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
} from 'recharts';

const formSchema = z.object({
  pastEventData: z.string().min(50, {
    message: 'Por favor, introduce al menos 50 caracteres de datos históricos.',
  }),
});

type AiAdvisorFormValues = z.infer<typeof formSchema>;

export default function AiAdvisor() {
  const [result, setResult] =
    useState<SuggestEvaluationCriteriaOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<AiAdvisorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pastEventData: '',
    },
  });

  async function onSubmit(data: AiAdvisorFormValues) {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await suggestEvaluationCriteria({
        pastEventData: data.pastEventData,
      });
      setResult(response);
    } catch (e) {
      console.error(e);
      setError(
        'Ha ocurrido un error al contactar con la IA. Por favor, inténtalo de nuevo.'
      );
    } finally {
      setIsLoading(false);
    }
  }

  const chartData = result?.criteriaSuggestions
    ? Object.entries(result.criteriaSuggestions).map(([name, weight]) => ({
        name,
        peso: Number((weight * 100).toFixed(2)),
      }))
    : [];

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      <Card>
        <CardHeader>
          <CardTitle>Analizar Datos</CardTitle>
          <CardDescription>
            Pega aquí los datos de eventos BAYCANJA anteriores. Puedes incluir
            puntuaciones, resultados, o cualquier dato relevante.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="pastEventData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Datos Históricos del Evento</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ej: En 2023, el grupo 'Renacer' obtuvo 8.5 en técnica pero solo 6.0 en originalidad, quedando 3ro. El ganador, un mago, destacó por su originalidad (9.5)..."
                        className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{' '}
                    Analizando...
                  </>
                ) : (
                  'Obtener Sugerencias'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Resultados del Análisis</CardTitle>
          <CardDescription>
            Ponderaciones sugeridas por la IA y su razonamiento.
          </CardDescription>
        </CardHeader>
        <CardContent className="min-h-[400px]">
          {isLoading && (
            <div className="flex justify-center items-center h-full pt-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          {error && <p className="text-destructive text-center">{error}</p>}
          {!isLoading && !result && !error && (
             <div className="text-center py-12 text-muted-foreground">
                <p className="text-lg">Los resultados aparecerán aquí.</p>
            </div>
          )}
          {result && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-center">
                  Ponderaciones Sugeridas
                </h3>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 12 }}
                        angle={-20}
                        textAnchor="end"
                        height={60}
                        interval={0}
                      />
                      <YAxis unit="%" />
                      <Tooltip
                        formatter={(value) => `${value}%`}
                        cursor={{ fill: 'hsl(var(--accent) / 0.2)' }}
                      />
                      <Legend wrapperStyle={{ fontSize: '14px' }} />
                      <Bar dataKey="peso" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Razonamiento de la IA
                </h3>
                <p className="text-muted-foreground bg-secondary/50 p-4 rounded-md border">
                  {result.reasoning}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
