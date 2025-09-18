'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Story, StoryChoice } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function StoryPlayer({ story }: { story: Story }) {
  const storyContent = story.content;
  const [currentNodeId, setCurrentNodeId] = useState(storyContent.nodes[0].node_id);

  const currentNode = storyContent.nodes.find((node) => node.node_id === currentNodeId);
  
  const imageUrl = `/stories/${story.id}/${currentNode?.image_url}`;
  const imageHint = currentNode?.text_ar.substring(0, 30) || "story image";

  if (!currentNode) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-65px)] text-center p-4">
        <h1 className="text-3xl font-bold font-headline mb-4">خطأ في القصة</h1>
        <p className="text-muted-foreground mb-8">لم يتم العثور على هذا الجزء من القصة.</p>
        <Button asChild>
          <Link href="/recommendations">العودة إلى كل القصص</Link>
        </Button>
      </div>
    );
  }

  const handleChoice = (choice: StoryChoice) => {
    if (!choice.next_node_id) {
        setCurrentNodeId('end'); // a virtual node id
    } else {
        setCurrentNodeId(choice.next_node_id);
    }
  };

  const isEndingNode = !currentNode.choices || currentNode.choices.length === 0;

  if (currentNodeId === 'end' || isEndingNode) {
     return (
      <div className="relative min-h-[calc(100vh-65px)] flex items-center justify-center p-4">
        <Image
            src={imageUrl}
            alt={imageHint}
            data-ai-hint={imageHint}
            fill
            className="object-cover -z-20 transition-opacity duration-1000"
            key={currentNode.node_id}
            priority
        />
        <div className="absolute inset-0 bg-black/70 -z-10" />

        <div className="max-w-prose w-full text-lg text-foreground bg-black/40 backdrop-blur-md p-8 rounded-lg shadow-2xl border border-white/10">
            <div className="w-full animate-fade-in">
                <p className="mb-4 leading-relaxed">{currentNode.text_ar}</p>
            </div>
            <div className='flex flex-col gap-4 mt-8'>
                <h2 className="text-xl font-bold text-center">النهاية</h2>
                <Button asChild>
                    <Link href="/recommendations">ابحث عن قصة جديدة</Link>
                </Button>
                <Button variant="outline" onClick={() => setCurrentNodeId(storyContent.nodes[0].node_id)}>
                    ابدأ هذه القصة من جديد
                </Button>
            </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative min-h-[calc(100vh-65px)] flex items-center justify-center p-4">
      <Image
        src={imageUrl}
        alt={imageHint}
        data-ai-hint={imageHint}
        fill
        className="object-cover -z-20 transition-opacity duration-1000"
        key={currentNode.node_id}
        priority
      />
      <div className="absolute inset-0 bg-black/70 -z-10" />

      <div className="max-w-prose w-full text-lg text-foreground bg-black/40 backdrop-blur-md p-8 rounded-lg shadow-2xl border border-white/10">
        <div className="w-full animate-fade-in">
            <p className="mb-6 leading-relaxed">{currentNode.text_ar}</p>
            <div className='flex flex-col gap-2'>
            {currentNode.choices?.map((choice, index) => (
                <Button
                    key={index}
                    onClick={() => handleChoice(choice)}
                    variant="outline"
                    className="bg-background/20 hover:bg-accent hover:text-accent-foreground justify-start text-right w-full"
                >
                    {choice.choice_text_ar}
                </Button>
            ))}
            </div>
        </div>
      </div>
    </div>
  );
}
