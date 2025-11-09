import React, { useState, useMemo, useRef } from 'react';
import { GALLERY_ITEMS } from '../constants';
import { GalleryItem } from '../types';
import { useOnScreen } from '../hooks/useOnScreen';

const GalleryCard: React.FC<{ item: GalleryItem }> = ({ item }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref, { threshold: 0.1, triggerOnce: true });

    return (
        <div ref={ref} className={`group relative overflow-hidden rounded-lg shadow-lg transform transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <img src={item.src} alt={item.alt} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <p className="text-white text-sm font-bold">{item.alt}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                    {item.tags.map(tag => (
                        <span key={tag} className="text-xs text-accent-blue bg-accent-blue/10 px-2 py-0.5 rounded-full">{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};


const Gallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filters = useMemo(() => {
    const years = [...new Set(GALLERY_ITEMS.map(item => item.year))];
    return ['All', ...years.sort((a, b) => b - a).map(String)];
  }, []);

  const filteredItems = useMemo(() => {
    if (activeFilter === 'All') {
      return GALLERY_ITEMS;
    }
    return GALLERY_ITEMS.filter(item => item.year === parseInt(activeFilter));
  }, [activeFilter]);

  return (
    <section id="gallery" className="py-24">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-light-slate mb-8 flex items-center w-full">
        <span className="text-blue-600 dark:text-accent-blue font-mono mr-4 text-2xl">03.</span>
        Gallery
        <span className="flex-grow h-px bg-gray-300 dark:bg-slate/30 ml-6"></span>
      </h2>

      <div className="flex justify-center flex-wrap gap-2 mb-12">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full font-mono text-sm transition-colors duration-300 ${
              activeFilter === filter
                ? 'bg-blue-600 text-white dark:bg-accent-blue dark:text-light-navy'
                : 'bg-gray-200 text-gray-700 dark:bg-light-navy dark:text-slate hover:bg-gray-300 dark:hover:bg-slate/50'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <GalleryCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Gallery;
