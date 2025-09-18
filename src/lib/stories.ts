import { createClient } from '@/lib/supabase/server';
import type { Story } from './types';

export const getStories = async (): Promise<Story[]> => {
    const supabase = createClient();
    const { data: stories, error } = await supabase.from('stories').select('*');

    if (error) {
        console.error('Error fetching stories:', JSON.stringify(error, null, 2));
        return [];
    }

    // The 'nodes' column is of type jsonb, so Supabase returns it as a string.
    // We need to parse it back into an object.
    return stories.map(story => ({
        ...story,
        nodes: typeof story.nodes === 'string' ? JSON.parse(story.nodes) : story.nodes,
    }));
};

export const getStoryBySlug = async (slug: string): Promise<Story | null> => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('stories')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        console.error('Error fetching story by slug:', JSON.stringify(error, null, 2));
        return null;
    }
    
    if (!data) {
        return null;
    }

    return {
        ...data,
        nodes: typeof data.nodes === 'string' ? JSON.parse(data.nodes) : data.nodes,
    };
}
