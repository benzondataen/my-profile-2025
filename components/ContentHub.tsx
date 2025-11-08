import React, { useState, useRef, useEffect } from 'react';
import { CONTENT_ITEMS, GitHubIcon, MediumIcon, YouTubeIcon } from '../constants';
import { ContentItem, ContentType } from '../types';
import { useOnScreen } from '../hooks/useOnScreen';
import { fetchGitHubProjects, fetchMediumPosts, fetchYouTubeVideos } from '../services/api';


const ContentCard: React.FC<{ item: ContentItem }> = ({ item }) => {
    // FIX: Changed the ref type to HTMLAnchorElement to match the `<a>` tag it's attached to.
    const ref = useRef<HTMLAnchorElement>(null);
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
        <a 
            href={item.link}
            target="_blank" 
            rel="noopener noreferrer"
            ref={ref}
            className={`block bg-white dark:bg-light-navy p-6 rounded-lg shadow-md dark:shadow-lg flex flex-col justify-between transform transition-all duration-300 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} hover:-translate-y-2 hover:shadow-xl dark:hover:shadow-2xl`}>
            <div>
                <div className="flex justify-between items-center mb-4">
                    <div className="text-blue-600 dark:text-accent-blue">{getIcon(item.type)}</div>
                    <div className="text-gray-500 dark:text-slate hover:text-blue-600 dark:hover:text-accent-blue transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002 2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-light-slate mb-2 group-hover:text-blue-600 dark:group-hover:text-accent-blue transition-colors">{item.title}</h3>
                <p className="text-gray-600 dark:text-slate text-sm mb-4">{item.description}</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-auto">
                {item.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono text-blue-600 bg-blue-600/10 dark:text-accent-blue dark:bg-accent-blue/10 px-2 py-1 rounded">{tag}</span>
                ))}
            </div>
        </a>
    );
};

const SkeletonCard: React.FC = () => (
    <div className="bg-white dark:bg-light-navy p-6 rounded-lg shadow-md dark:shadow-lg animate-pulse">
        <div className="flex justify-between items-center mb-4">
            <div className="h-6 w-6 bg-gray-200 dark:bg-slate/30 rounded"></div>
            <div className="h-6 w-6 bg-gray-200 dark:bg-slate/30 rounded"></div>
        </div>
        <div className="h-5 w-3/4 bg-gray-200 dark:bg-slate/30 rounded mb-2"></div>
        <div className="h-4 w-full bg-gray-200 dark:bg-slate/30 rounded mb-1"></div>
        <div className="h-4 w-5/6 bg-gray-200 dark:bg-slate/30 rounded mb-4"></div>
        <div className="flex flex-wrap gap-2">
            <div className="h-5 w-16 bg-gray-200 dark:bg-slate/30 rounded"></div>
            <div className="h-5 w-20 bg-gray-200 dark:bg-slate/30 rounded"></div>
        </div>
    </div>
);


const ContentHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ContentType>(ContentType.GitHub);
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [content, setContent] = useState<ContentItem[]>([]);
  const [visibleCounts, setVisibleCounts] = useState({
    [ContentType.Medium]: 3,
    [ContentType.YouTube]: 3,
    [ContentType.GitHub]: 3,
  });
  
  useEffect(() => {
    const fetchAllContent = async () => {
        setStatus('loading');
        // Use static content as a reliable fallback
        const staticGitHub = CONTENT_ITEMS.filter(item => item.type === ContentType.GitHub);
        const staticMedium = CONTENT_ITEMS.filter(item => item.type === ContentType.Medium);
        const staticYouTube = CONTENT_ITEMS.filter(item => item.type === ContentType.YouTube);
        
        try {
            const results = await Promise.allSettled([
                fetchGitHubProjects('benzthanachit'),
                fetchMediumPosts('thanachit02185'),
                // YouTube Channel ID for @benzondataen
                fetchYouTubeVideos('UC7asJdAaJscRiFs9NwamRzQ', 'AIzaSyBlCJUOJXKEXuS9VuH4KJM7P-t4vm8eAnE')
            ]);

            const fetchedGitHub = results[0].status === 'fulfilled' && results[0].value.length > 0 ? results[0].value : staticGitHub;
            const fetchedMedium = results[1].status === 'fulfilled' && results[1].value.length > 0 ? results[1].value : staticMedium;
            const fetchedYouTube = results[2].status === 'fulfilled' && results[2].value.length > 0 ? results[2].value : staticYouTube;
            
            setContent([...fetchedGitHub, ...fetchedMedium, ...fetchedYouTube]);
        } catch (error) {
            console.error("An unexpected error occurred while fetching content:", error);
            // In case of total failure, fall back to all static content
            setContent(CONTENT_ITEMS);
        } finally {
            setStatus('success');
        }
    };
    fetchAllContent();
  }, []);

  const handleShowMore = () => {
    setVisibleCounts(prev => ({
        ...prev,
        [activeTab]: prev[activeTab] + 3,
    }));
  };

  const TABS = [ContentType.GitHub, ContentType.Medium, ContentType.YouTube];
  const filteredContent = content.filter(item => item.type === activeTab);
  const displayedContent = filteredContent.slice(0, visibleCounts[activeTab]);

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

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[320px]">
          {status === 'loading' && (
            Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={index} />)
          )}
          {status === 'success' && filteredContent.length === 0 && (
            <div className="col-span-full text-center py-10">
                <p className="text-gray-600 dark:text-slate">No content available for this category yet.</p>
            </div>
          )}
          {status === 'success' && displayedContent.map(item => <ContentCard key={item.id} item={item} />)}
      </div>

      {status === 'success' && visibleCounts[activeTab] < filteredContent.length && (
        <div className="text-center mt-12">
            <button 
                onClick={handleShowMore}
                className="px-8 py-3 border border-blue-600 text-blue-600 rounded-md font-mono text-lg hover:bg-blue-600/10 dark:border-accent-blue dark:text-accent-blue dark:hover:bg-accent-blue/10 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-accent-blue"
            >
                Show More
            </button>
        </div>
      )}
    </section>
  );
};

export default ContentHub;