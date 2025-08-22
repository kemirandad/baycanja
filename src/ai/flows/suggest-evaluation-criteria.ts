'use server';

/**
 * @fileOverview A flow that suggests evaluation criteria weights based on past BAYCANJA events.
 *
 * - suggestEvaluationCriteria - A function that suggests evaluation criteria weights.
 * - SuggestEvaluationCriteriaInput - The input type for the suggestEvaluationCriteria function.
 * - SuggestEvaluationCriteriaOutput - The return type for the suggestEvaluationCriteria function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestEvaluationCriteriaInputSchema = z.object({
  pastEventData: z.string().describe('Data from past BAYCANJA events, including participant scores and overall results.'),
});
export type SuggestEvaluationCriteriaInput = z.infer<typeof SuggestEvaluationCriteriaInputSchema>;

const SuggestEvaluationCriteriaOutputSchema = z.object({
  criteriaSuggestions: z.record(z.string(), z.number()).describe('Suggested weights for each evaluation criterion.'),
  reasoning: z.string().describe('Explanation of why the AI suggested these weights.'),
});
export type SuggestEvaluationCriteriaOutput = z.infer<typeof SuggestEvaluationCriteriaOutputSchema>;

export async function suggestEvaluationCriteria(input: SuggestEvaluationCriteriaInput): Promise<SuggestEvaluationCriteriaOutput> {
  return suggestEvaluationCriteriaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestEvaluationCriteriaPrompt',
  input: {schema: SuggestEvaluationCriteriaInputSchema},
  output: {schema: SuggestEvaluationCriteriaOutputSchema},
  prompt: `You are an expert in analyzing data from past BAYCANJA events to suggest optimal evaluation criteria weights.

  Analyze the following data from past events:
  {{{pastEventData}}}

  Based on this data, suggest weights for each evaluation criterion to ensure fair and accurate scoring. The weights should sum to 1.

  Provide a clear explanation of why you suggested these weights.

  Format the output as a JSON object with 'criteriaSuggestions' (a record of criterion names to weights, where weights sum to 1) and 'reasoning' fields.
  `,
});

const suggestEvaluationCriteriaFlow = ai.defineFlow(
  {
    name: 'suggestEvaluationCriteriaFlow',
    inputSchema: SuggestEvaluationCriteriaInputSchema,
    outputSchema: SuggestEvaluationCriteriaOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
