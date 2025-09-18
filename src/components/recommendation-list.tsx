import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { slugify } from '@/lib/utils';
import { PersonalizedStoryRecommendationsOutput } from '@/ai/flows/personalized-story-recommendations';

type RecommendationListProps = {
  recommendations: PersonalizedStoryRecommendationsOutput['storyRecommendations'];
}

export function RecommendationList({ recommendations }: RecommendationListProps) {
  const difficultyColors: { [key: string]: string } = {
    easy: 'border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-400',
    medium: 'border-yellow-500/50 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400',
    hard: 'border-red-500/50 bg-red-500/10 text-red-700 dark:text-red-400',
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {recommendations.map((rec, index) => (
        <Card key={index} className="flex flex-col hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>{rec.title}</CardTitle>
            <CardDescription>{rec.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-4">
            <div>
                <h4 className="font-semibold mb-2 text-sm text-muted-foreground">Learning Concepts:</h4>
                <div className="flex flex-wrap gap-2">
                {rec.learningConcepts.split(',').map((concept: string) => (
                    <Badge key={concept.trim()} variant="secondary">{concept.trim()}</Badge>
                ))}
                </div>
            </div>
            <div>
                <h4 className="font-semibold mb-2 text-sm text-muted-foreground">Difficulty:</h4>
                <Badge variant="outline" className={difficultyColors[rec.difficulty]}>
                    {rec.difficulty.charAt(0).toUpperCase() + rec.difficulty.slice(1)}
                </Badge>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href={`/story/${slugify(rec.title)}`}>
                Start Reading <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
