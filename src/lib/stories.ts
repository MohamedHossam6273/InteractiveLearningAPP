
import { createClient } from '@/lib/supabase/server';
import type { Story } from './types';

export const getStories = async (): Promise<Omit<Story, 'nodes'>[]> => {
    const supabase = createClient();
    const { data: stories, error } = await supabase.from('stories').select('id, slug, title, description');

    if (error) {
        console.error('Error fetching stories:', JSON.stringify(error, null, 2));
        return [];
    }

    return stories;
};

export const getStoryById = async (id: number): Promise<Story | null> => {
    const supabase = createClient();
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

    // The 'nodes' column from supabase contains the full story JSON object.
    return {
        ...data,
        // The data from the 'nodes' column is the story itself
        nodes: typeof data.nodes === 'string' ? JSON.parse(data.nodes) : data.nodes,
    };
}


