export type StoryChoice = {
  type: 'choice';
  text: string;
  nextId: number;
};

export type StoryText = {
  type: 'text';
  value: string;
};

export type StoryNode = {
  id: number;
  backgroundImage: string;
  imageHint: string;
  content: (StoryText | StoryChoice)[];
};

export type Story = {
  slug: string;
  title: string;
  description: string;
  nodes: StoryNode[];
};
