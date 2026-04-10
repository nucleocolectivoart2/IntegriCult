'use server';
/**
 * @fileOverview A Strategic Governance Assistant for John Cardona's IntegriCult platform.
 * This tool helps identify ESG risks, compliance strategies, and organizational culture gaps.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input Schema
const AiNarrativeDraftingToolInputSchema = z.object({
  textToProcess: z.string().describe('The business challenge or strategic topic to be analyzed.').optional(),
  sectionContext: z.string().describe('Context about the specific governance domain (e.g., "ESG", "COMPLIANCE", "CULTURA").').optional()
});
export type AiNarrativeDraftingToolInput = z.infer<typeof AiNarrativeDraftingToolInputSchema>;

// Output Schema
const AiNarrativeDraftingToolOutputSchema = z.object({
  generatedNarrative: z.string().describe('Strategic analysis or refined guidance, aligning business objectives with ethical and Jungian depths.')
});
export type AiNarrativeDraftingToolOutput = z.infer<typeof AiNarrativeDraftingToolOutputSchema>;

// Wrapper function
export async function aiNarrativeDraftingTool(input: AiNarrativeDraftingToolInput): Promise<AiNarrativeDraftingToolOutput> {
  return aiNarrativeDraftingFlow(input);
}

// Prompt definition
const narrativeDraftingPrompt = ai.definePrompt({
  name: 'narrativeDraftingPrompt',
  input: {schema: AiNarrativeDraftingToolInputSchema},
  output: {schema: AiNarrativeDraftingToolOutputSchema},
  prompt: `You are an "Asistente Estratégico de Gobernanza" for John Cardona's personal brand "IntegriCult".
John is a senior expert in Governance, Ethics, and Sustainability with a Jungian philosophical lens.
Your role is to help corporate leaders bridge the gap between technical compliance (ISO 37301, ESG) and deep human culture.

Your task is to analyze strategic queries and provide guidance that is:
1. Pragmatic: Business-oriented and clear.
2. Profound: Incorporating ethical responsibility and organizational depth.
3. Coherent: Linking personal integrity with collective governance.

If the user asks about ESG, focus on social and environmental consciousness as a cultural asset.
If the user asks about Compliance, focus on rigorous integrity as a risk-management tool.
If the user asks about Culture, focus on the "Self" of the organization.

Current consultation:
{{{textToProcess}}}

{{#if sectionContext}}
Specific domain: "{{{sectionContext}}}".
{{/if}}

Please provide a strategic analysis that converts these concepts into actionable culture.`
});

// Flow definition
const aiNarrativeDraftingFlow = ai.defineFlow(
  {
    name: 'aiNarrativeDraftingFlow',
    inputSchema: AiNarrativeDraftingToolInputSchema,
    outputSchema: AiNarrativeDraftingToolOutputSchema
  },
  async (input) => {
    const {output} = await narrativeDraftingPrompt(input);
    return output!;
  }
);
