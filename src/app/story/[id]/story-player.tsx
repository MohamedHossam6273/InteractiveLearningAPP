'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { Story, StoryChoice } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { event } from '@/lib/gtag';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { app } from '@/lib/firebase';
import { checkAndUpdateStreak, completeStory, updateUserXP, updateStoryProgress } from '@/lib/user-progress';

const XP_PER_CHOICE = 10;
const XP_PER_COMPLETION = 50;

export function StoryPlayer({ story }: { story: Story }) {
  const auth = getAuth(app);
  const [user] = useAuthState(auth);

  const [currentNodeId, setCurrentNodeId] = useState(story.nodes[0].node_id);
  const [startTime, setStartTime] = useState(0);

  useEffect(() => {
    if (user) {
        checkAndUpdateStreak(user.uid);
    }
    
    event({
      action: 'story_started',
      params: {
        story_id: story.id,
        story_title: story.title,
      },
    });
    setStartTime(Date.now());

    const handleBeforeUnload = () => {
      const currentNode = story.nodes.find((node) => node.node_id === currentNodeId);
      const isEndingNode = !currentNode?.choices || currentNode.choices.length === 0;

      if (currentNode && !isEndingNode) {
        event({
            action: 'story_dropoff',
            params: {
                story_id: story.id,
                story_title: story.title,
                last_node_id: currentNode.node_id,
                last_node_index: story.nodes.findIndex(n => n.node_id === currentNode.node_id),
            }
        });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [story.id, story.title, user]);


  const currentNode = story.nodes.find((node) => node.node_id === currentNodeId);
  const currentNodeIndex = story.nodes.findIndex((node) => node.node_id === currentNodeId);

  const imageUrl = currentNode?.image_url ? `/stories/${story.id}/${currentNode.image_url}` : "https://picsum.photos/seed/story-placeholder/1920/1080";
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
    event({
        action: 'choice_made',
        params: {
            story_id: story.id,
            node_id: currentNodeId,
            choice_text: choice.choice_text_ar,
            next_node_id: choice.next_node_id,
        }
    });

    if (user) {
      updateUserXP(user.uid, XP_PER_CHOICE);
      const nextNodeIndex = story.nodes.findIndex(n => n.node_id === choice.next_node_id);
      if (nextNodeIndex !== -1) {
        const progress = (nextNodeIndex + 1) / story.nodes.length;
        updateStoryProgress(user.uid, story.id, progress);
      }
    }


    if (!choice.next_node_id) {
        setCurrentNodeId('end');
    } else {
        setCurrentNodeId(choice.next_node_id);
    }
  };
  
  const handleAffiliateClick = (url: string) => {
    event({
        action: 'affiliate_click',
        params: {
            story_id: story.id,
            story_title: story.title,
            affiliate_url: url,
        }
    });
    window.open(url, '_blank');
  };

  const isEndingNode = !currentNode.choices || currentNode.choices.length === 0;

  if (currentNodeId === 'end' || isEndingNode) {
    if (startTime > 0) {
        const duration = Math.round((Date.now() - startTime) / 1000);
        event({
            action: 'story_completed',
            params: {
                story_id: story.id,
                story_title: story.title,
                duration: duration,
                total_nodes: story.nodes.length,
            }
        });
        if (user) {
          completeStory(user.uid, story.id, XP_PER_COMPLETION);
        }
        setStartTime(0); // Prevent re-firing
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
                <p className="mb-4 leading-relaxed text-white">{currentNode.text_ar}</p>
                {/* Example Affiliate Link */}
                <p className="text-center text-sm text-gray-300 my-4">أعجبك ما تعلمته؟ تحقق من الكتاب الكامل:</p>
                <Button onClick={() => handleAffiliateClick(`https://www.amazon.com/dp/B004J4XGN6?tag=youraffiliatetag-20`)} className='w-full'>
                    شراء "The Lean Startup" على أمازون
                </Button>
            </div>
            <div className='flex flex-col gap-4 mt-8'>
                <h2 className="text-xl font-bold text-center text-white">النهاية</h2>
                <Button asChild>
                    <Link href="/recommendations">ابحث عن قصة جديدة</Link>
                </Button>
                <Button variant="outline" onClick={() => setCurrentNodeId(story.nodes[0].node_id)}>
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
            <p className="mb-6 leading-relaxed text-white">{currentNode.text_ar}</p>
            <div className='flex flex-col gap-2'>
            {currentNode.choices?.map((choice, index) => (
                <Button
                    key={index}
                    onClick={() => handleChoice(choice)}
                    variant="outline"
                    className="bg-background/20 hover:bg-accent hover:text-accent-foreground justify-start text-right w-full text-white hover:text-accent-foreground"
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
