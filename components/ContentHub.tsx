import React, { useState, useRef } from 'react';
import { CONTENT_ITEMS, GitHubIcon, MediumIcon, YouTubeIcon } from '../constants';
import { ContentItem, ContentType } from '../types';
import { useOnScreen } from '../hooks/useOnScreen';


const ContentCard: React.FC<{ item: ContentItem }> = ({ item }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref, { threshold: 0.1, triggerOnce: true });

    const getIcon = (type: ContentType) => {
        switch (type) {
            case ContentType.GitHub:
                return <GitHubIcon className="h-6 w-6" />;
            case ContentType.Medium:
                return <MediumIcon className="h-6 w-6" />;
            case ContentType.YouTube:
                return <YouTubeIcon className="h-6 w-6" />;
            default:
                return null;
        }
    };
    
    return (
        <div 
            ref={ref}
            className={`bg-white dark:bg-light-navy p-6 rounded-lg shadow-md dark:shadow-lg flex flex-col justify-between transform transition-all duration-700 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div>
                <div className="flex justify-between items-center mb-4">
                    <div className="text-blue-600 dark:text-accent-blue">{getIcon(item.type)}</div>
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-slate hover:text-blue-600 dark:hover:text-accent-blue transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-light-slate mb-2 hover:text-blue-600 dark:hover:text-accent-blue transition-colors"><a href={item.link}>{item.title}</a></h3>
                <p className="text-gray-600 dark:text-slate text-sm mb-4">{item.description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
                {item.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono text-blue-600 bg-blue-600/10 dark:text-accent-blue dark:bg-accent-blue/10 px-2 py-1 rounded">{tag}</span>
                ))}
            </div>
        </div>
    );
};

const ContentHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ContentType>(ContentType.GitHub);
  
  const TABS = [ContentType.GitHub, ContentType.Medium, ContentType.YouTube];
  const filteredContent = CONTENT_ITEMS.filter(item => item.type === activeTab);

  return (
    <section id="content" className="py-24">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-light-slate mb-12 flex items-center w-full">
        <span className="text-blue-600 dark:text-accent-blue font-mono mr-4 text-2xl">02.</span>
        Content Hub
        <span className="flex-grow h-px bg-gray-300 dark:bg-slate/30 ml-6"></span>
      </h2>
      
      <div className="flex justify-center mb-8 border-b border-gray-300 dark:border-slate/30">
          {TABS.map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-mono text-sm tracking-wider transition-all duration-300 ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600 dark:text-accent-blue dark:border-accent-blue' : 'text-gray-500 hover:text-gray-800 dark:text-slate dark:hover:text-light-slate'}`}
              >
                  {tab}
              </button>
          ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map(item => <ContentCard key={item.id} item={item} />)}
      </div>
    </section>
  );
};

export default ContentHub;