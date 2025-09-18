import type { Story, StoryListItem } from './types';
import fs from 'fs/promises';
import path from 'path';

/**
 * Fetches the list of all available stories from the local story-list.json file.
 */
export const getStories = async (): Promise<StoryListItem[]> => {
  try {
    const filePath = path.join(process.cwd(), 'public', 'stories', 'story-list.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const storyList = JSON.parse(fileContent);
    return storyList.stories;
  } catch (error) {
    console.error('Error fetching story list:', error);
    return [];
  }
};

/**
 * Fetches the content of a single story by its ID from its local story.json file.
 * The ID corresponds to the folder name in the /public/stories directory.
 * @param id - The ID of the story to fetch.
 */
export const getStoryById = async (id: string): Promise<Story | null> => {
  try {
    const filePath = path.join(process.cwd(), 'public', 'stories', id, 'story.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const storyContent: Story = JSON.parse(fileContent);
    
    // Add the id to the story object so we can use it for image paths.
    return { ...storyContent, id };

  } catch (error) {
    console.error(`Error fetching story by id (${id}):`, error);
    return null;
  }
};
