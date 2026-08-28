import React, { useState, useMemo, useRef, useEffect } from 'react';
import { GALLERY_BUCKET, GALLERY_PREFIX } from '../constants';
import { GalleryItem } from '../types';
import { useOnScreen } from '../hooks/useOnScreen';
import { fetchGalleryImages } from '../services/api';

const GalleryCard: React.FC<{ item: GalleryItem }> = ({ item }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref, { threshold: 0.1, triggerOnce: true });

    return (
        <div ref={ref} className={`group relative overflow-hidden rounded-lg shadow-lg transform transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <img src={item.src} alt={item.alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <p className="text-white text-sm font-bold">{item.alt}</p>
            </div>
        </div>
    );
};

const SkeletonCard: React.FC = () => (
    <div className="rounded-lg bg-gray-200 dark:bg-slate/30 animate-pulse aspect-[4/3]"></div>
);

const Gallery: React.FC = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  useEffect(() => {
    const loadImages = async () => {
        setStatus('loading');
        try {
            const images = await fetchGalleryImages(GALLERY_BUCKET, GALLERY_PREFIX);
            setItems(images);
            setStatus('success');
        } catch (error) {
            console.error('Failed to load gallery images:', error);
            setStatus('error');
        }
    };
    loadImages();
  }, []);

  const filters = useMemo(() => {
    const years = [...new Set(items.map(item => item.year))];
    return ['All', ...years.sort((a, b) => b - a).map(String)];
  }, [items]);

  const filteredItems = useMemo(() => {
    if (activeFilter === 'All') {
      return items;
    }
    return items.filter(item => item.year === parseInt(activeFilter));
  }, [items, activeFilter]);

  return (
    <section id="gallery" className="py-24">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-light-slate mb-8 flex items-center w-full">
        <span className="text-blue-600 dark:text-accent-blue font-mono mr-4 text-2xl">03.</span>
        Gallery
        <span className="flex-grow h-px bg-gray-300 dark:bg-slate/30 ml-6"></span>
      </h2>

      {status === 'success' && items.length > 0 && (
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
      )}

      {status === 'loading' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)}
        </div>
      )}

      {status === 'error' && (
        <div className="text-center py-10">
          <p className="text-gray-600 dark:text-slate">Couldn't load the gallery right now. Please try again later.</p>
        </div>
      )}

      {status === 'success' && items.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-600 dark:text-slate">Photos coming soon.</p>
        </div>
      )}

      {status === 'success' && items.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Gallery;
