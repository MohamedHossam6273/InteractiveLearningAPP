
export type StoryChoice = {
  choice_text_ar: string;
  next_node_id: string;
};

export type StoryNode = {
  node_id: string;
  text_ar: string;
  image_url: string;
  choices?: StoryChoice[];
};

export type StoryContent = {
  story_id: string;
  languages: string[];
  nodes: StoryNode[];
};

export type Story = {
  id: number;
  title: string;
  subtitle: string;
  content: StoryContent;
  start?: any; // You can define a more specific type if you know what `start` contains
  created_at: string;
};
