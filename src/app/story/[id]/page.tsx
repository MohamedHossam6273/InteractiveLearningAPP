import { notFound } from 'next/navigation';
import { getStoryById } from '@/lib/stories';
import { StoryPlayer } from './story-player';

// Reverting: generateStaticParams is only for static site generation.
// export async function generateStaticParams() {
//   const stories = await getStories();
//   return stories.map((story) => ({
//     id: story.id,
//   }));
// }

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
