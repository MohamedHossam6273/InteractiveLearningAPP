import type { Story, StoryListItem } from './types';
import fs from 'fs/promises';
import path from 'path';

const storiesDirectory = path.join(process.cwd(), 'public', 'stories');

/**
 * Fetches the list of all available stories from the local story-list.json file.
 */
export const getStories = async (): Promise<StoryListItem[]> => {
  try {
    const filePath = path.join(storiesDirectory, 'story-list.json');
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
    // First, get the list to find the story's title
    const stories = await getStories();
    const storyInfo = stories.find(story => story.id === id);

    if (!storyInfo) {
      console.error(`Story info not found for id (${id}) in story-list.json`);
      return null;
    }

    const storyFileName = 'story.json'.trim();
    const filePath = path.join(storiesDirectory, id, storyFileName);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const storyContent: Omit<Story, 'id' | 'title'> = JSON.parse(fileContent);
    
    // Add the id and title to the story object.
    return { ...storyContent, id, title: storyInfo.title };

  } catch (error) {
    console.error(`Error fetching story by id (${id}):`, error);
    return null;
  }
};
