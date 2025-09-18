'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getStoryBySlug } from '@/lib/stories';
import type { StoryNode, StoryChoice } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function StoryPage({ params }: { params: { slug: string } }) {
  const story = getStoryBySlug(params.slug);
  const [currentNodeId, setCurrentNodeId] = useState(1);

  const currentNode = useMemo(() => {
    return story?.nodes.find((node) => node.id === currentNodeId);
  }, [story, currentNodeId]);

  if (!story) {
    notFound();
  }

  if (!currentNode) {
    // Handle story end or invalid node
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-65px)] text-center p-4">
        <h1 className="text-3xl font-bold font-headline mb-4">The End</h1>
        <p className="text-muted-foreground mb-8">You have reached the end of this story path.</p>
        <div className='flex gap-4'>
            <Button asChild>
                <Link href="/recommendations">Find a New Story</Link>
            </Button>
            <Button variant="outline" onClick={() => setCurrentNodeId(1)}>
                Start This Story Over
            </Button>
        </div>
      </div>
    );
  }

  const handleChoice = (choice: StoryChoice) => {
    setCurrentNodeId(choice.nextId);
  };
  
  const renderContent = (node: StoryNode) => (
    <div key={node.id} className="w-full animate-fade-in">
      {node.content.map((item, index) => {
        if (item.type === 'text') {
          return <p key={index} className="mb-4 leading-relaxed">{item.value}</p>;
        }
        if (item.type === 'choice') {
          return (
            <Button
              key={index}
              onClick={() => handleChoice(item)}
              variant="outline"
              className="mr-2 mb-2 bg-background/80 hover:bg-accent hover:text-accent-foreground"
            >
              {item.text}
            </Button>
          );
        }
        return null;
      })}
    </div>
  );


  return (
    <div className="relative min-h-[calc(100vh-65px)] flex items-center justify-center p-4">
      <Image
        src={currentNode.backgroundImage}
        alt={currentNode.imageHint}
        data-ai-hint={currentNode.imageHint}
        fill
        className="object-cover -z-20 transition-opacity duration-1000"
        key={currentNode.id}
        priority
      />
      <div className="absolute inset-0 bg-black/60 -z-10" />

      <div className="max-w-prose w-full text-lg text-background bg-black/30 backdrop-blur-sm p-8 rounded-lg shadow-2xl border border-white/10">
        {renderContent(currentNode)}
      </div>
    </div>
  );
}
