import { RecommendationForm } from "@/components/recommendation-form";

export const metadata = {
    title: "Story Recommendations | Choice Learn",
    description: "Get personalized story recommendations based on your interests and learning goals.",
};

export default function RecommendationsPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 md:py-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold font-headline mb-4">Find Your Personalized Story</h1>
        <p className="text-lg text-muted-foreground">
          Tell us about your interests and what you want to learn. We'll recommend a story tailored just for you.
        </p>
      </div>
      
      <RecommendationForm />
    </div>
  );
}
