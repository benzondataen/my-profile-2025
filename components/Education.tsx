import React, { useRef } from 'react';
import { EDUCATIONS } from '../constants';
import { Education as EducationType } from '../types';
import { useOnScreen } from '../hooks/useOnScreen';

const EducationCard: React.FC<{ item: EducationType }> = ({ item }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref, { threshold: 0.2, triggerOnce: true });

    return (
        <div 
            ref={ref}
            className={`bg-white dark:bg-light-navy p-8 rounded-lg shadow-md dark:shadow-lg transform transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            <div className="flex items-center mb-2">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-accent-blue mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422A12.083 12.083 0 0121 18.782V19M3 19v-1.782A12.083 12.083 0 019 10.578M12 21v-7" />
                </svg>
                <h3 className="text-xl font-bold text-gray-900 dark:text-light-slate">
                    {item.link ? (
                        <a 
                            href={item.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="hover:text-blue-600 dark:hover:text-accent-blue transition-colors duration-200"
                        >
                            {item.institution}
                        </a>
                    ) : (
                        item.institution
                    )}
                </h3>
            </div>
            <div className="pl-12">
                <p className="text-lg text-gray-800 dark:text-slate">{item.degree}</p>
                <p className="text-sm font-mono text-gray-500 dark:text-slate">{item.period}</p>
            </div>
        </div>
    );
}

const Education: React.FC = () => {
  return (
    <section id="education" className="py-24">
       <h2 className="text-3xl font-bold text-gray-900 dark:text-light-slate mb-12 flex items-center w-full">
        <span className="text-blue-600 dark:text-accent-blue font-mono mr-4 text-2xl">05.</span>
        Education
        <span className="flex-grow h-px bg-gray-300 dark:bg-slate/30 ml-6"></span>
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        {EDUCATIONS.map(edu => <EducationCard key={edu.id} item={edu} />)}
      </div>
    </section>
  );
};

export default Education;