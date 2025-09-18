// src/ai/flows/personalized-story-recommendations.ts
'use server';

/**
 * @fileOverview Provides personalized story recommendations based on user interests and learning goals.
 *
 * - getPersonalizedStoryRecommendations - A function that suggests stories tailored to the user.
 * - PersonalizedStoryRecommendationsInput - The input type for the getPersonalizedStoryRecommendations function.
 * - PersonalizedStoryRecommendationsOutput - The return type for the getPersonalizedStoryRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedStoryRecommendationsInputSchema = z.object({
  interests: z.string().describe('The user\'s interests (e.g., business, psychology, personal development).'),
  learningGoals: z.string().describe('The user\'s learning goals (e.g., leadership, productivity, mindfulness).'),
  previousStories: z.string().optional().describe('Titles of stories the user has read previously, comma separated.'),
});
export type PersonalizedStoryRecommendationsInput = z.infer<typeof PersonalizedStoryRecommendationsInputSchema>;

const PersonalizedStoryRecommendationsOutputSchema = z.object({
  storyRecommendations: z.array(
    z.object({
      title: z.string().describe('The title of the recommended story.'),
      description: z.string().describe('A brief summary of the story.'),
      learningConcepts: z.string().describe('A comma separated list of the learning concepts covered in the story.'),
      difficulty: z.enum(['easy', 'medium', 'hard']).describe('The difficulty level of the story.'),
    })
  ).describe('A list of story recommendations based on the user\'s interests and learning goals.'),
});
export type PersonalizedStoryRecommendationsOutput = z.infer<typeof PersonalizedStoryRecommendationsOutputSchema>;

export async function getPersonalizedStoryRecommendations(
  input: PersonalizedStoryRecommendationsInput
): Promise<PersonalizedStoryRecommendationsOutput> {
  return personalizedStoryRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedStoryRecommendationsPrompt',
  input: {schema: PersonalizedStoryRecommendationsInputSchema},
  output: {schema: PersonalizedStoryRecommendationsOutputSchema},
  prompt: `You are an AI story recommendation engine. You will provide story recommendations based on the user's interests and learning goals.

  Interests: {{{interests}}}
  Learning Goals: {{{learningGoals}}}
  Previous Stories: {{#if previousStories}}{{{previousStories}}}{{else}}None{{/if}}

  Based on this information, recommend 3 stories that would be relevant and engaging for the user.  Each story should include the title, a brief summary, a comma separated list of the learning concepts covered, and a difficulty level (easy, medium, or hard).
  The story recommendations should be a JSON array.
  `,
});

const personalizedStoryRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedStoryRecommendationsFlow',
    inputSchema: PersonalizedStoryRecommendationsInputSchema,
    outputSchema: PersonalizedStoryRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
