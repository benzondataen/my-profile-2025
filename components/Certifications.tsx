import React, { useRef } from 'react';
import { CERTIFICATIONS, CREDLY_BADGES_URL, CREDLY_SKILLS_URL, CREDLY_BADGE_COUNT } from '../constants';
import { CertificationGroup } from '../types';
import { useOnScreen } from '../hooks/useOnScreen';

const BadgeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const CertificationCard: React.FC<{ item: CertificationGroup }> = ({ item }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref, { threshold: 0.2, triggerOnce: true });

    return (
        <div
            ref={ref}
            className={`bg-white dark:bg-light-navy p-6 rounded-lg shadow-md dark:shadow-lg transform transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            <h3 className="text-lg font-bold text-gray-900 dark:text-light-slate mb-4">{item.category}</h3>
            <ul className="space-y-2">
                {item.items.map(cert => (
                    <li key={cert} className="flex items-start text-sm text-gray-600 dark:text-slate">
                        <span className="text-blue-600 dark:text-accent-blue mr-2 mt-0.5">&#10148;</span>
                        {cert}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="py-24">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-light-slate mb-12 flex items-center w-full">
        <span className="text-blue-600 dark:text-accent-blue font-mono mr-4 text-2xl">06.</span>
        Certifications
        <span className="flex-grow h-px bg-gray-300 dark:bg-slate/30 ml-6"></span>
      </h2>

      <div className="bg-white dark:bg-light-navy rounded-lg shadow-md dark:shadow-lg p-8 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
            <BadgeIcon className="h-14 w-14 text-blue-600 dark:text-accent-blue shrink-0" />
            <div>
                <p className="text-3xl font-bold text-gray-900 dark:text-light-slate">
                    {CREDLY_BADGE_COUNT} Google Cloud Skill Badges
                </p>
                <p className="text-gray-600 dark:text-slate">
                    Verified hands-on labs from Google Cloud Skills Boost, tracked on Credly.
                </p>
            </div>
        </div>
        <div className="flex flex-wrap gap-4 shrink-0">
            <a href={CREDLY_BADGES_URL} target="_blank" rel="noopener noreferrer"
               className="px-6 py-3 bg-blue-600 text-white rounded-md font-mono text-sm hover:bg-blue-700 dark:bg-accent-blue dark:text-dark-bg dark:hover:bg-accent-blue/80 transition-colors duration-300">
                View Badges
            </a>
            <a href={CREDLY_SKILLS_URL} target="_blank" rel="noopener noreferrer"
               className="px-6 py-3 border border-blue-600 text-blue-600 rounded-md font-mono text-sm hover:bg-blue-600/10 dark:border-accent-blue dark:text-accent-blue dark:hover:bg-accent-blue/10 transition-colors duration-300">
                View Skills
            </a>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CERTIFICATIONS.map(item => <CertificationCard key={item.id} item={item} />)}
      </div>
    </section>
  );
};

export default Certifications;
