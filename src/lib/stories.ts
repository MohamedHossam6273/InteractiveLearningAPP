
import { createClient } from '@/lib/supabase/server';
import type { Story } from './types';

// This function now fetches id, title, and subtitle
export const getStories = async (): Promise<Pick<Story, 'id' | 'title' | 'subtitle'>[]> => {
    const supabase = createClient();
    const { data: stories, error } = await supabase.from('stories').select('id, title, subtitle');

    if (error) {
        console.error('Error fetching stories:', JSON.stringify(error, null, 2));
        return [];
    }

    return stories;
};

export const getStoryById = async (id: number): Promise<Story | null> => {
    const supabase = createClient();
    // The query now selects all columns from the stories table
    const { data, error } = await supabase
        .from('stories')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching story by id:', JSON.stringify(error, null, 2));
        return null;
    }
    
    if (!data) {
        return null;
    }

    // The story structure is now in the 'content' column.
    // We assume Supabase automatically parses the JSONB column.
    return {
        ...data,
        content: typeof data.content === 'string' ? JSON.parse(data.content) : data.content,
    };
}
