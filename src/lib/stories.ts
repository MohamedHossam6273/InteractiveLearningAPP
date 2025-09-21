import type { Story, StoryListItem } from './types';
import AllStories from './stories-data/story-list.json';

// A map to hold dynamically imported story data.
// This is necessary because we can't use dynamic `import()` with variables in a way that works for static builds.
// We have to be explicit.
import TheLeanStartupQuest from './stories-data/lean_startup_quest/story.json';

const storyDataMap: { [key: string]: any } = {
  lean_startup_quest: TheLeanStartupQuest,
  // When you add a new story, you'll need to import it and add it to this map.
  // For example:
  // import NewStoryData from './stories-data/new_story_folder/story.json';
  // 'new_story_id': NewStoryData,
};

/**
 * Fetches the list of all available stories from the imported JSON file.
 */
export const getStories = async (): Promise<StoryListItem[]> => {
  // The story list is directly imported from the JSON file.
  return AllStories.stories;
};

/**
 * Fetches the content of a single story by its ID.
 * This function now correctly looks up the pre-imported story data.
 * @param id - The ID of the story to fetch.
 */
export const getStoryById = async (id: string): Promise<Story | null> => {
  try {
    // 1. Find the story's metadata (title, subtitle, etc.) from the main list.
    const storyInfo = AllStories.stories.find(story => story.id === id);

    if (!storyInfo) {
      console.error(`Story info not found for id (${id}) in story-list.json`);
      return null;
    }

    // 2. Find the story's main content (nodes, choices) from our data map.
    const storyContent = storyDataMap[id];

    if (!storyContent) {
      console.error(`Story content for id (${id}) not found in storyDataMap. Did you forget to import it in src/lib/stories.ts?`);
      return null;
    }

    // 3. Combine the metadata and content into a single Story object.
    // The 'id' and 'title' are crucial for the story player to function correctly.
    return { 
      ...storyContent, 
      id: storyInfo.id, 
      title: storyInfo.title 
    };

  } catch (error) {
    console.error(`An unexpected error occurred while fetching story by id (${id}):`, error);
    return null;
  }
};
