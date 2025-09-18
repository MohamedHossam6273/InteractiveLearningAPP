import type { Story, StoryListItem } from './types';

// The base URL for the stories on GitHub Pages.
// This assumes the stories are in a 'stories' directory in the public folder.
const BASE_URL = '/stories'; 

/**
 * Fetches the list of all available stories from story-list.json.
 */
export const getStories = async (): Promise<StoryListItem[]> => {
  try {
    const response = await fetch(`${BASE_URL}/story-list.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const storyList = await response.json();
    return storyList.stories;
  } catch (error) {
    console.error('Error fetching story list:', error);
    return [];
  }
};

/**
 * Fetches the content of a single story by its ID.
 * The ID corresponds to the folder name in the /stories directory.
 * @param id - The ID of the story to fetch.
 */
export const getStoryById = async (id: string): Promise<Story | null> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}/story.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const storyContent: Story = await response.json();
    
    // Add the id to the story object so we can use it for image paths.
    return { ...storyContent, id };

  } catch (error) {
    console.error(`Error fetching story by id (${id}):`, error);
    return null;
  }
};
