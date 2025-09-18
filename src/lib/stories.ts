import type { Story } from './types';

export const stories: Story[] = [
  {
    slug: 'the-phoenix-project',
    title: 'مشروع فينيكس',
    description: 'دراما تفاعلية في شركة حول إنقاذ مشروع فاشل وعالي المخاطر.',
    nodes: [
      {
        id: 1,
        backgroundImage: 'https://picsum.photos/seed/phoenix-project-1/1920/1080',
        imageHint: 'corporate office',
        content: [
          { type: 'text', value: 'أنت أليكس، قائد المشروع الجديد لمشروع "فينيكس"، وهو مشروع متأخر ستة أشهر عن الجدول الزمني ومتجاوز الميزانية بشكل كبير. الفريق محبط. في يومك الأول، تدخل إلى غرفة حرب متوترة. كل العيون عليك.' },
          { type: 'text', value: 'كان سلفك مديرًا دقيقًا سيئ السمعة. تقترب منك سارة، كبيرة المهندسين، بالقرار الحاسم الأول لهذا اليوم: اختيار معماري رئيسي لقاعدة البيانات.' },
          { type: 'choice', text: 'الغوص في التفاصيل الفنية معها.', nextId: 2 },
          { type: 'choice', text: 'الثقة بخبرتها وتفويض القرار.', nextId: 3 },
        ],
      },
      {
        id: 2,
        backgroundImage: 'https://picsum.photos/seed/phoenix-project-2/1920/1080',
        imageHint: 'stressed manager',
        content: [
          { type: 'text', value: 'تقضي اليوم بأكمله مع سارة، وتشكك في كل افتراض. تشعر بالسيطرة، لكنك تلاحظ استنزاف طاقة الفريق. يتبادلون نظرات متعبة. بحلول نهاية اليوم، لم يتم إحراز أي تقدم في أي عمل آخر.' },
          { type: 'text', value: 'مفهوم التعلم: الإدارة الدقيقة يمكن أن تخنق الاستقلالية وتبطئ التقدم عن طريق خلق اختناقات.' },
          { type: 'choice', text: 'الانتقال إلى اليوم التالي.', nextId: 4 },
        ],
      },
      {
        id: 3,
        backgroundImage: 'https://picsum.photos/seed/phoenix-project-3/1920/1080',
        imageHint: 'team meeting',
        content: [
          { type: 'text', value: 'تقول لسارة، "أنا أثق بحكمك. أنت تعرفين النظام أفضل من أي شخص آخر. اتخذي القرار وأخبريني كيف يمكنني دعمك." موجة من الارتياح تغمر وجهها. سرعان ما تجمع فريقها الفرعي، وبحلول وقت الغداء، لديهم خطة للمضي قدمًا. يتحسن المزاج في الغرفة.' },
          { type: 'text', value: 'مفهوم التعلم: التمكين والتفويض يبنيان الثقة ويستفيدان من الخبرة داخل الفريق، مما يزيد من الملكية والسرعة.' },
          { type: 'choice', text: 'الانتقال إلى اليوم التالي.', nextId: 5 },
        ],
      },
      {
        id: 4,
        backgroundImage: 'https://picsum.photos/seed/phoenix-project-4/1920/1080',
        imageHint: 'empty office',
        content: [
          { type: 'text', value: 'يستمر المشروع في التحرك بوتيرة بطيئة. لقد جعلك تدخلك المستمر نقطة فشل واحدة. ينتظر الفريق موافقتك على كل شيء. يتم تفويت الموعد النهائي مرة أخرى.' },
          { type: 'text', value: 'لقد فشلت في إطلاق مشروع فينيكس في الوقت المحدد. لكنك تعلمت درسًا قيمًا عن القيادة.' },
          { type: 'choice', text: 'ابدأ قصة جديدة.', nextId: 100 },
        ],
      },
       {
        id: 5,
        backgroundImage: 'https://picsum.photos/seed/phoenix-project-5/1920/1080',
        imageHint: 'successful team',
        content: [
          { type: 'text', value: 'مع تمكين الفريق، يبدأون في أخذ زمام المبادرة. الانتصارات الصغيرة تبني الزخم. تركز على إزالة العقبات وحمايتهم من الضغط الخارجي. يبدأ المشروع في التحول.' },
          { type: 'text', value: 'رغم كل الصعاب، تطلق مشروع فينيكس. إنه ليس مثاليًا، لكنه نجاح هائل بالنظر إلى ما بدأت منه. لقد تعلمت أن القيادة لا تتعلق بامتلاك كل الإجابات، بل بتمكين الآخرين من إيجادها.' },
          { type: 'choice', text: 'ابدأ قصة جديدة.', nextId: 100 },
        ],
      },
    ],
  },
];

export const getStoryBySlug = (slug: string) => {
    return stories.find((story) => story.slug === slug);
}
