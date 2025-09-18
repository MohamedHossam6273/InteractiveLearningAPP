'use server';

import { getPersonalizedStoryRecommendations, PersonalizedStoryRecommendationsOutput } from '@/ai/flows/personalized-story-recommendations';
import { z } from 'zod';

const recommendationSchema = z.object({
  interests: z.string().min(10, 'Please describe your interests in a bit more detail.'),
  learningGoals: z.string().min(10, 'Please describe your learning goals in a bit more detail.'),
});

export type RecommendationState = {
  message?: string;
  recommendations?: PersonalizedStoryRecommendationsOutput['storyRecommendations'];
  errors?: {
    interests?: string[];
    learningGoals?: string[];
  };
};

export async function getRecommendations(
  prevState: RecommendationState,
  formData: FormData
): Promise<RecommendationState> {
  const validatedFields = recommendationSchema.safeParse({
    interests: formData.get('interests'),
    learningGoals: formData.get('learningGoals'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'There was an error with your submission.',
    };
  }

  try {
    const recommendations = await getPersonalizedStoryRecommendations(validatedFields.data);
    if (!recommendations.storyRecommendations || recommendations.storyRecommendations.length === 0) {
        return { message: 'Could not generate recommendations based on your input. Please try being more specific.' };
    }
    return { recommendations: recommendations.storyRecommendations, message: 'Success' };
  } catch (error) {
    console.error(error);
    return { message: 'Failed to get recommendations. Please try again later.' };
  }
}
