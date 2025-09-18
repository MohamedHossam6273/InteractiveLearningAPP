import { RecommendationList } from "@/components/recommendation-list";
import { stories } from '@/lib/stories';
import type { PersonalizedStoryRecommendationsOutput } from '@/ai/flows/personalized-story-recommendations';
import { slugify } from "@/lib/utils";

export const metadata = {
    title: "All Stories | Choice Learn",
    description: "Browse all available stories.",
};

export default function RecommendationsPage() {
  const recommendations: PersonalizedStoryRecommendationsOutput['storyRecommendations'] = stories.map(story => ({
    title: story.title,
    description: story.description,
    learningConcepts: "interactive, choice-based", // Placeholder
    difficulty: 'medium', // Placeholder
  }));

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 md:py-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold font-headline mb-4">All Stories</h1>
        <p className="text-lg text-muted-foreground">
          Browse our library of interactive stories and start a new adventure.
        </p>
      </div>
      
      <RecommendationList recommendations={recommendations} />
    </div>
  );
}
