import React, { useRef } from 'react';
import { SKILLS } from '../constants';
import { SkillCategory } from '../types';
import { useOnScreen } from '../hooks/useOnScreen';

const SkillCard: React.FC<{ item: SkillCategory }> = ({ item }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref, { threshold: 0.2, triggerOnce: true });

    return (
        <div
            ref={ref}
            className={`bg-white dark:bg-light-navy p-6 rounded-lg shadow-md dark:shadow-lg transform transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            <h3 className="text-lg font-bold text-gray-900 dark:text-light-slate mb-4">{item.category}</h3>
            <div className="flex flex-wrap gap-2">
                {item.skills.map(skill => (
                    <span key={skill} className="text-xs font-mono text-blue-600 bg-blue-600/10 dark:text-accent-blue dark:bg-accent-blue/10 px-2 py-1 rounded">
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
};

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-light-slate mb-12 flex items-center w-full">
        <span className="text-blue-600 dark:text-accent-blue font-mono mr-4 text-2xl">04.</span>
        Skills
        <span className="flex-grow h-px bg-gray-300 dark:bg-slate/30 ml-6"></span>
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SKILLS.map(item => <SkillCard key={item.id} item={item} />)}
      </div>
    </section>
  );
};

export default Skills;
