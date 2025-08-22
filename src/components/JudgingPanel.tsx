'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { criteria } from '@/lib/data';
import type { Participant } from '@/lib/types';
import { useScoresStore } from '@/store/scores-store';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Slider } from '@/components/ui/slider';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle } from 'lucide-react';
import { useEffect } from 'react';

const formSchemaDefinition = criteria.reduce((acc, criterion) => {
  acc[criterion.id] = z.array(z.number().min(0).max(10)).nonempty();
  return acc;
}, {} as Record<string, z.ZodTypeAny>);

const formSchema = z.object(formSchemaDefinition);

type JudgingFormValues = z.infer<typeof formSchema>;

export default function JudgingPanel({
  participant,
}: {
  participant: Participant;
}) {
  const {
    setScore,
    getScoresForParticipant,
    currentJudgeId,
  } = useScoresStore();
  const { toast } = useToast();

  const currentScores = getScoresForParticipant(currentJudgeId!, participant.id);

  const defaultValues = criteria.reduce((acc, criterion) => {
    acc[criterion.id] = [currentScores[criterion.id] ?? 0];
    return acc;
  }, {} as Record<string, [number]>);

  const form = useForm<JudgingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  
  useEffect(() => {
    if (currentJudgeId) {
      const scores = getScoresForParticipant(currentJudgeId, participant.id);
      const newDefaultValues = criteria.reduce((acc, c) => {
        acc[c.id] = [scores[c.id] ?? 0];
        return acc;
      }, {} as Record<string, [number]>);
      form.reset(newDefaultValues);
    }
  }, [currentJudgeId, participant.id, getScoresForParticipant, form]);

  function onSubmit(data: JudgingFormValues) {
    if (!currentJudgeId) return;
    Object.entries(data).forEach(([criterionId, value]) => {
      const score = value[0];
      setScore(currentJudgeId, participant.id, criterionId, score);
    });

    toast({
      title: 'Calificación Guardada',
      description: `La calificación de ${currentJudgeId} para ${participant.name} ha sido guardada.`,
      action: <CheckCircle className="text-green-500" />,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Panel de Jurado ({currentJudgeId})</CardTitle>
        <CardDescription>
          Califica la presentación en una escala de 0 a 10 para cada criterio.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {criteria.map((criterion) => (
              <FormField
                key={criterion.id}
                control={form.control}
                name={criterion.id as keyof JudgingFormValues}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      {criterion.name} (Ponderación: {criterion.weight}%)
                    </FormLabel>
                    <FormDescription>{criterion.description}</FormDescription>
                    <div className="flex items-center gap-4 pt-2">
                      <FormControl>
                        <Slider
                          min={0}
                          max={10}
                          step={0.5}
                          value={field.value}
                          onValueChange={field.onChange}
                          className="flex-1"
                        />
                      </FormControl>
                      <span className="font-bold text-primary w-12 text-center text-lg">
                        {field.value?.[0].toFixed(1)}
                      </span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button type="submit" className="w-full text-lg py-6">
              Guardar Calificación
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
