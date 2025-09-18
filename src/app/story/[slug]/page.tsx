import { notFound } from 'next/navigation';
import { getStoryBySlug } from '@/lib/stories';
import { StoryPlayer } from './story-player';

export default async function StoryPage({ params }: { params: { slug: string } }) {
  const story = await getStoryBySlug(params.slug);

  if (!story) {
    notFound();
  }

  return <StoryPlayer story={story} />;
}
