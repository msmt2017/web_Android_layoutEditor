// src/ai/flows/suggest-layout-optimizations.ts
'use server';

/**
 * @fileOverview Analyzes XML layout code and suggests improvements based on Android development best practices, tailored to the user's coding style.
 *
 * - suggestLayoutOptimizations - A function that takes XML layout code as input and returns optimization suggestions.
 * - SuggestLayoutOptimizationsInput - The input type for the suggestLayoutOptimizations function.
 * - SuggestLayoutOptimizationsOutput - The return type for the suggestLayoutOptimizations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestLayoutOptimizationsInputSchema = z.object({
  xmlLayoutCode: z
    .string()
    .describe('The XML layout code to be analyzed for optimization.'),
  userCodingStyle: z
    .string()
    .optional()
    .describe('Description of the user\s coding style (optional).'),
});
export type SuggestLayoutOptimizationsInput = z.infer<typeof SuggestLayoutOptimizationsInputSchema>;

const SuggestLayoutOptimizationsOutputSchema = z.object({
  suggestions: z
    .string()
    .describe('The optimization suggestions for the given XML layout code.'),
});
export type SuggestLayoutOptimizationsOutput = z.infer<typeof SuggestLayoutOptimizationsOutputSchema>;

export async function suggestLayoutOptimizations(
  input: SuggestLayoutOptimizationsInput
): Promise<SuggestLayoutOptimizationsOutput> {
  return suggestLayoutOptimizationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestLayoutOptimizationsPrompt',
  input: {schema: SuggestLayoutOptimizationsInputSchema},
  output: {schema: SuggestLayoutOptimizationsOutputSchema},
  prompt: `You are an experienced Android developer. Analyze the given XML layout code and provide optimization suggestions based on Android development best practices.

Consider the following user coding style, if provided:
{{#if userCodingStyle}}
  {{{userCodingStyle}}}
{{else}}
  The user has no specific coding style preferences. Follow standard Android development best practices.
{{/if}}

XML Layout Code:
{{xmlLayoutCode}}

Provide suggestions for improving the layout's performance, readability, and maintainability. Focus on issues like overdraw, deeply nested layouts, usage of ConstraintLayout, and efficiency in resource usage. Return suggestions in markdown format.
`,
});

const suggestLayoutOptimizationsFlow = ai.defineFlow(
  {
    name: 'suggestLayoutOptimizationsFlow',
    inputSchema: SuggestLayoutOptimizationsInputSchema,
    outputSchema: SuggestLayoutOptimizationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

