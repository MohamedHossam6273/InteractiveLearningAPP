'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { getRecommendations, RecommendationState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RecommendationList } from './recommendation-list';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const initialState: RecommendationState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Get Recommendations
    </Button>
  );
}

export function RecommendationForm() {
  const [state, formAction] = useFormState(getRecommendations, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && state.message !== 'Success') {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <div>
      <Card>
        <CardContent className="p-6">
            <form action={formAction} className="space-y-6">
                <div className="space-y-2">
                <Label htmlFor="interests">Your Interests</Label>
                <Textarea
                    id="interests"
                    name="interests"
                    placeholder="e.g., business, psychology, startups, sci-fi novels..."
                    rows={3}
                    aria-describedby="interests-error"
                />
                {state.errors?.interests && (
                    <p id="interests-error" className="text-sm font-medium text-destructive">
                    {state.errors.interests[0]}
                    </p>
                )}
                </div>
                <div className="space-y-2">
                <Label htmlFor="learningGoals">Your Learning Goals</Label>
                <Textarea
                    id="learningGoals"
                    name="learningGoals"
                    placeholder="e.g., improve leadership, learn about cognitive biases, master negotiation..."
                    rows={3}
                    aria-describedby="learningGoals-error"
                />
                {state.errors?.learningGoals && (
                    <p id="learningGoals-error" className="text-sm font-medium text-destructive">
                    {state.errors.learningGoals[0]}
                    </p>
                )}
                </div>
                <SubmitButton />
            </form>
        </CardContent>
      </Card>


      {state.recommendations && (
        <div className="mt-12">
          <h2 className="text-3xl font-bold font-headline mb-6 text-center">Your Recommended Stories</h2>
          <RecommendationList recommendations={state.recommendations} />
        </div>
      )}
    </div>
  );
}
