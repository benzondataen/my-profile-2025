import React, { useRef } from 'react';
import { FAQ_ITEMS } from '../constants';
import { useOnScreen } from '../hooks/useOnScreen';

const FAQAccordionItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
    const ref = useRef<HTMLDetailsElement>(null);
    const isVisible = useOnScreen(ref, { threshold: 0.1, triggerOnce: true });

    return (
        <details
            ref={ref}
            className={`group bg-white dark:bg-light-navy rounded-lg shadow-md dark:shadow-lg transform transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            <summary className="flex justify-between items-center gap-4 cursor-pointer list-none px-6 py-5 font-bold text-gray-900 dark:text-light-slate">
                <span>{question}</span>
                <span className="shrink-0 text-blue-600 dark:text-accent-blue transition-transform duration-300 group-open:rotate-45">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </span>
            </summary>
            <p className="px-6 pb-5 text-gray-600 dark:text-slate">{answer}</p>
        </details>
    );
};

const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-24">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-light-slate mb-12 flex items-center w-full">
        <span className="text-blue-600 dark:text-accent-blue font-mono mr-4 text-2xl">06.</span>
        FAQ
        <span className="flex-grow h-px bg-gray-300 dark:bg-slate/30 ml-6"></span>
      </h2>

      <div className="max-w-3xl mx-auto space-y-4">
        {FAQ_ITEMS.map(item => (
          <FAQAccordionItem key={item.id} question={item.question} answer={item.answer} />
        ))}
      </div>
    </section>
  );
};

export default FAQ;
