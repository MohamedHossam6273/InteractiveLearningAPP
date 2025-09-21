import type { Story, StoryListItem } from './types';
import AllStories from './stories-data/story-list.json';
import TheLeanStartupQuest from './stories-data/lean_startup_quest/story.json';

// This map allows us to dynamically look up the imported JSON content.
const storyDataMap: { [key: string]: any } = {
  lean_startup_quest: TheLeanStartupQuest,
};

/**
 * Fetches the list of all available stories from the imported JSON file.
 */
export const getStories = async (): Promise<StoryListItem[]> => {
  // Directly return the imported story list.
  return AllStories.stories;
};

/**
 * Fetches the content of a single story by its ID.
 * @param id - The ID of the story to fetch.
 */
export const getStoryById = async (id: string): Promise<Story | null> => {
  // 1. Find the story's metadata (title, etc.) from the main list.
  const storyInfo = AllStories.stories.find(story => story.id === id);

  if (!storyInfo) {
    console.error(`Story info not found for id (${id}) in story-list.json`);
    return null;
  }

  // 2. Find the story's main content (nodes, choices) from our data map.
  const storyContent = storyDataMap[id];

  if (!storyContent) {
    console.error(`Story content for id (${id}) not found. Make sure it's imported and mapped in src/lib/stories.ts`);
    return null;
  }

  // 3. Combine the metadata and content into a single Story object.
  return { 
    ...storyContent, 
    id: storyInfo.id, 
    title: storyInfo.title 
  };
};
