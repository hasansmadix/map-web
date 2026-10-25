import { PageFaq } from '@/components/website/common/page-faq';
import type { IIntent } from '@/types/intents/intent.type';

const FAQ_QUESTION_TEMPLATES: Array<{
  question: (topic: string, related?: string) => string;
  answer: (topic: string) => string;
}> = [
    {
      question: topic => `Which ${topic} can be hired?`,
      answer: topic =>
        `MAP holds ${topic.toLowerCase()} for hire from the stores in Dubai Production City. Availability is confirmed against the dates of the engagement.`,
    },
    {
      question: topic => `How is ${topic} quoted?`,
      answer: () =>
        'The quote names the item, the dates, and the hire period. Daily and weekly rates are set when the dates are known.',
    },
    {
      question: topic => `What is included with ${topic}?`,
      answer: () =>
        'The hire includes the item and the accessories required to operate it. Additional kit is listed on the quote.',
    },
    {
      question: topic => `How is the right ${topic} chosen?`,
      answer: topic =>
        `The choice follows the production: format, dates, and the rest of the kit list. MAP will recommend a ${topic.toLowerCase()} against that brief.`,
    },
    {
      question: topic => `What are the terms for ${topic}?`,
      answer: () =>
        'Terms cover the hire period, the deposit, and the return condition. They are set out in the quote before the item leaves the store.',
    },
    {
      question: topic => `Can ${topic} be hired for a short engagement?`,
      answer: () =>
        'Yes. Items can be hired for a single day or for the run of a production. Dates are confirmed against the store diary.',
    },
    {
      question: (topic, related) =>
        related ? `How does ${topic} differ from ${related}?` : `What should be confirmed before hiring ${topic}?`,
      answer: topic =>
        `Confirm the mount, the power, and the accessories the ${topic.toLowerCase()} needs to work with the rest of the kit.`,
    },
  ];

function generateFaqItems(intent: IIntent): Array<{ question: string; answer: string }> {
  const topic = intent.linkLabel || 'equipment';
  const relatedLabel = intent.internalLinks?.[0]?.linkLabel;

  return FAQ_QUESTION_TEMPLATES.map(({ question, answer }) => ({
    question: question(topic, relatedLabel),
    answer: answer(topic),
  }));
}

interface IntentFAQProps {
  intent: IIntent;
}

export function IntentFAQ({ intent }: IntentFAQProps) {
  const faqItems = generateFaqItems(intent);

  return (
    <PageFaq
      title="Hiring questions"
      items={faqItems.map(faq => ({ q: faq.question, a: faq.answer }))}
    />
  );
}
