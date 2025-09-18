
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

export type Story = {
  story_id: string;
  title: string;
  description: string;
  nodes: {
    story_id: string;
    languages: string[];
    nodes: StoryNode[];
  };
};
