import React, { useRef } from 'react';
import { EXPERIENCES } from '../constants';
import { Experience as ExperienceType } from '../types';
import { useOnScreen } from '../hooks/useOnScreen';

const ExperienceItem: React.FC<{ item: ExperienceType; index: number }> = ({ item, index }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref, { threshold: 0.2, triggerOnce: true });

    return (
        <div ref={ref} className={`relative pl-8 md:pl-0 transform transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className={`md:flex ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-start`}>
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
                    <div className="bg-white dark:bg-light-navy p-6 rounded-lg shadow-md dark:shadow-lg">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-light-slate">{item.role} @ <span className="text-blue-600 dark:text-accent-blue">{item.company}</span></h3>
                        <p className="text-sm font-mono text-gray-500 dark:text-slate mb-4">{item.period}</p>
                        <ul className="space-y-2">
                            {item.description.map((desc, i) => (
                                <li key={i} className="flex items-start">
                                    <span className="text-blue-600 dark:text-accent-blue mr-3 mt-1">&#10148;</span>
                                    <span className="text-gray-600 dark:text-slate">{desc}</span>
                                </li>
                            ))}
                        </ul>
                        {item.tags && item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {item.tags.map(tag => (
                                    <span key={tag} className="text-xs font-mono text-blue-600 bg-blue-600/10 dark:text-accent-blue dark:bg-accent-blue/10 px-2 py-1 rounded">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="hidden md:flex md:w-1/2 items-center justify-center">
                    <div className="w-4 h-4 bg-blue-600 dark:bg-accent-blue rounded-full absolute left-1/2 -translate-x-1/2 z-10 border-4 border-gray-50 dark:border-dark-bg"></div>
                </div>
            </div>
            {/* Mobile timeline dot */}
            <div className="md:hidden w-4 h-4 bg-blue-600 dark:bg-accent-blue rounded-full absolute top-8 -left-2 z-10 border-4 border-gray-50 dark:border-dark-bg"></div>
        </div>
    );
};

const Experience: React.FC = () => {
    return (
        <section id="experience" className="py-24">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-light-slate mb-16 flex items-center w-full">
                <span className="text-blue-600 dark:text-accent-blue font-mono mr-4 text-2xl">04.</span>
                Work Experience
                <span className="flex-grow h-px bg-gray-300 dark:bg-slate/30 ml-6"></span>
            </h2>

            <div className="relative">
                {/* Vertical line for desktop */}
                <div className="hidden md:block absolute h-full w-0.5 bg-gray-300 dark:bg-slate/30 left-1/2 -translate-x-1/2"></div>
                {/* Vertical line for mobile */}
                <div className="md:hidden absolute h-full w-0.5 bg-gray-300 dark:bg-slate/30 left-0"></div>

                <div className="space-y-16">
                    {EXPERIENCES.map((exp, index) => (
                        <ExperienceItem key={exp.id} item={exp} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;