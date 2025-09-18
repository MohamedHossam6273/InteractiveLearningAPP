import type { Story } from './types';

export const stories: Story[] = [
  {
    slug: 'the-phoenix-project',
    title: 'The Phoenix Project',
    description: 'An interactive corporate drama about saving a failing, high-stakes project.',
    nodes: [
      {
        id: 1,
        backgroundImage: 'https://picsum.photos/seed/phoenix-project-1/1920/1080',
        imageHint: 'corporate office',
        content: [
          { type: 'text', value: 'You are Alex, the new project lead for "Phoenix," a project that\'s six months behind schedule and massively over budget. The team is demoralized. Your first day, you walk into a tense war room. All eyes are on you.' },
          { type: 'text', value: 'Your predecessor was a notorious micromanager. The lead engineer, Sarah, approaches you with the first critical decision of the day: a major architectural choice for the database.' },
          { type: 'choice', text: 'Dive deep into the technical details with her.', nextId: 2 },
          { type: 'choice', text: 'Trust her expertise and delegate the decision.', nextId: 3 },
        ],
      },
      {
        id: 2,
        backgroundImage: 'https://picsum.photos/seed/phoenix-project-2/1920/1080',
        imageHint: 'stressed manager',
        content: [
          { type: 'text', value: 'You spend the entire day huddled with Sarah, questioning every assumption. You feel in control, but you notice the team\'s energy drain. They exchange weary glances. By the end of the day, no other work has progressed.' },
          { type: 'text', value: 'Learning Concept: Micromanagement can stifle autonomy and slow down progress by creating bottlenecks.' },
          { type: 'choice', text: 'Continue to the next day.', nextId: 4 },
        ],
      },
      {
        id: 3,
        backgroundImage: 'https://picsum.photos/seed/phoenix-project-3/1920/1080',
        imageHint: 'team meeting',
        content: [
          { type: 'text', value: 'You tell Sarah, "I trust your judgment. You know the system better than anyone. Make the call and let me know how I can support you." A wave of relief washes over her face. She quickly gathers her sub-team, and by lunch, they have a plan forward. The mood in the room lifts.' },
          { type: 'text', value: 'Learning Concept: Empowerment and delegation build trust and leverage the expertise within a team, increasing ownership and speed.' },
          { type: 'choice', text: 'Continue to the next day.', nextId: 5 },
        ],
      },
      {
        id: 4,
        backgroundImage: 'https://picsum.photos/seed/phoenix-project-4/1920/1080',
        imageHint: 'empty office',
        content: [
          { type: 'text', value: 'The project continues to move at a snail\'s pace. Your constant involvement has made you the single point of failure. The team waits for your approval on everything. The deadline is missed again.' },
          { type: 'text', value: 'You failed to launch the Phoenix Project on time. But you\'ve learned a valuable lesson about leadership.' },
          { type: 'choice', text: 'Start a new story.', nextId: 100 },
        ],
      },
       {
        id: 5,
        backgroundImage: 'https://picsum.photos/seed/phoenix-project-5/1920/1080',
        imageHint: 'successful team',
        content: [
          { type: 'text', value: 'With the team empowered, they start taking initiative. Small wins build momentum. You focus on removing obstacles and protecting them from external pressure. The project starts to turn around.' },
          { type: 'text', value: 'Against all odds, you launch the Phoenix Project. It\'s not perfect, but it\'s a massive success given where you started. You\'ve learned that leadership is not about having all the answers, but about enabling others to find them.' },
          { type: 'choice', text: 'Start a new story.', nextId: 100 },
        ],
      },
    ],
  },
];

export const getStoryBySlug = (slug: string) => {
    return stories.find((story) => story.slug === slug);
}
