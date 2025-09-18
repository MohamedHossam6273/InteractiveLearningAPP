import { notFound } from 'next/navigation';
import { getStoryById } from '@/lib/stories';
import { StoryPlayer } from './story-player';

export default async function StoryPage({ params }: { params: { id: string } }) {
  const storyId = params.id;
  if (!storyId) {
    notFound();
  }
  
  const story = await getStoryById(storyId);

  if (!story) {
    notFound();
  }

  return <StoryPlayer story={story} />;
}
