import type { Story, StoryListItem } from './types';
import path from 'path';
import { promises as fs } from 'fs';

// Get the base path for the stories directory
const storiesPath = path.join(process.cwd(), 'public', 'stories');

/**
 * Fetches the list of all available stories from story-list.json.
 */
export const getStories = async (): Promise<StoryListItem[]> => {
  try {
    const filePath = path.join(storiesPath, 'story-list.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const allStories: { stories: StoryListItem[] } = JSON.parse(data);
    return allStories.stories;
  } catch (error) {
    console.error('Failed to read or parse story-list.json:', error);
    return [];
  }
};

/**
 * Fetches the content of a single story by its ID.
 * @param id - The ID of the story to fetch.
 */
export const getStoryById = async (id: string): Promise<Story | null> => {
  try {
    // 1. Find the story's metadata (title, etc.) from the main list.
    const allStories = await getStories();
    const storyInfo = allStories.find(story => story.id === id);

    if (!storyInfo) {
      console.error(`Story info not found for id (${id}) in story-list.json`);
      return null;
    }

    // 2. Find the story's main content (nodes, choices) by reading its JSON file.
    const storyContentPath = path.join(storiesPath, id, 'story.json');
    const storyContentData = await fs.readFile(storyContentPath, 'utf-8');
    const storyContent = JSON.parse(storyContentData);

    if (!storyContent) {
      console.error(`Story content for id (${id}) not found.`);
      return null;
    }

    // 3. Combine the metadata and content into a single Story object.
    return {
      ...storyContent,
      id: storyInfo.id,
      title: storyInfo.title,
    };
  } catch (error) {
    console.error(`Failed to get story by id (${id}):`, error);
    return null;
  }
};
