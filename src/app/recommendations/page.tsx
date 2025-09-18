

import { RecommendationList } from "@/components/recommendation-list";
import { getStories } from '@/lib/stories';

export const metadata = {
    title: "كل القصص | اختر وتعلم",
    description: "تصفح جميع القصص المتاحة.",
};

export default async function RecommendationsPage() {
  const stories = await getStories();

  const recommendations = stories.map(story => ({
    id: story.id,
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
