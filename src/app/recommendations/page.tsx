import { RecommendationList } from "@/components/recommendation-list";
import { stories } from '@/lib/stories';
import type { PersonalizedStoryRecommendationsOutput } from '@/ai/flows/personalized-story-recommendations';

export const metadata = {
    title: "كل القصص | اختر وتعلم",
    description: "تصفح جميع القصص المتاحة.",
};

export default function RecommendationsPage() {
  const recommendations: PersonalizedStoryRecommendationsOutput['storyRecommendations'] = stories.map(story => ({
    title: story.title,
    description: story.description,
    learningConcepts: "تفاعلية, قائمة على الاختيار", // Placeholder
    difficulty: 'medium', // Placeholder
  }));

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 md:py-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold font-headline mb-4">كل القصص</h1>
        <p className="text-lg text-muted-foreground">
          تصفح مكتبتنا من القصص التفاعلية وابدأ مغامرة جديدة.
        </p>
      </div>
      
      <RecommendationList recommendations={recommendations} />
    </div>
  );
}
