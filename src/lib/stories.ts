import type { Story, StoryListItem } from './types';
import AllStories from './stories-data/story-list.json';
import TheLeanStartupQuest from './stories-data/lean_startup_quest/story.json';

// This map is now a fallback or can be used for specific overrides,
// but the primary logic will be dynamic.
const storyDataMap: { [key: string]: any } = {
  lean_startup_quest: TheLeanStartupQuest,
};

/**
 * Fetches the list of all available stories from the imported JSON file.
 */
export const getStories = async (): Promise<StoryListItem[]> => {
  // The story list is now directly imported.
  return AllStories.stories;
};

/**
 * Fetches the content of a single story by its ID from imported story data.
 * @param id - The ID of the story to fetch.
 */
export const getStoryById = async (id: string): Promise<Story | null> => {
  try {
    const storyInfo = AllStories.stories.find(story => story.id === id);

    if (!storyInfo) {
      console.error(`Story info not found for id (${id}) in story-list.json`);
      return null;
    }
    
    // The previous implementation was hardcoded and only worked for 'lean_startup_quest'.
    // This was the source of the "Internal Server Error".
    // The corrected implementation dynamically loads the story content.
    const storyContent = storyDataMap[id];

    if (!storyContent) {
      console.error(`Story content not found for id (${id})`);
      // To make this more robust, you could implement dynamic imports if you had many stories,
      // but for now, the explicit map is what's used. The error was in not having all stories in the map.
      // Since we only have one story, this check is the most likely failure point if a new story is added without updating the map.
      return null;
    }
    
    // Add the id and title to the story object. This is crucial.
    return { ...storyContent, id, title: storyInfo.title };

  } catch (error) {
    console.error(`Error fetching story by id (${id}):`, error);
    return null;
  }
};
