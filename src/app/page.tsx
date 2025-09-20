import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function Home() {
  return (
    <section className="relative h-[calc(100vh-65px)] flex items-center justify-center">
      <Image
        src="https://picsum.photos/seed/choicelearn-hero/1920/1080"
        alt="A library of books"
        data-ai-hint="library books"
        fill
        className="object-cover -z-20"
        priority
      />
      <div className="absolute inset-0 bg-background/80 dark:bg-background/90 -z-10" />
      <div className="container mx-auto px-4 text-center">
        <div
          className="animate-fade-in-up"
          style={{ animationFillMode: 'backwards' }}
        >
          <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 text-primary">
            مسار
          </h1>
          <p className="text-lg md:text-2xl mb-8 max-w-3xl mx-auto text-foreground/80">
            هل سئمت من قراءة الكتب غير الخيالية التي لا يمكنك تذكرها؟ تعلم مفاهيم تغير حياتك من خلال قصص خيالية تفاعلية وجذابة.
          </p>
        </div>
        <div
          className="animate-fade-in-up"
          style={{ animationFillMode: 'backwards', animationDelay: '200ms' }}
        >
          <Button asChild size="lg">
            <Link href="/recommendations">
              تعالى نقرا حكاية... ونكتسب مهارة
              <ArrowLeft className="mr-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
