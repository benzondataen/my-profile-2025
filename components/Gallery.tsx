import React, { useState, useMemo, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ASSETS_BUCKET, GALLERY_PREFIX } from '../constants';
import { GalleryItem } from '../types';
import { useOnScreen } from '../hooks/useOnScreen';
import { fetchGalleryImages } from '../services/api';

const HEIC_EXTENSION = /\.(heic|heif)$/i;

// Browsers can't render HEIC/HEIF (iPhone's default photo format) in an <img> tag, so it's
// converted to a JPEG blob client-side. Loaded lazily via dynamic import (only when a HEIC
// photo actually needs it) and only once the card scrolls into view, to avoid decoding
// dozens of photos at once.
const useDisplaySrc = (src: string, isVisible: boolean) => {
    const isHeic = HEIC_EXTENSION.test(src);
    const [displaySrc, setDisplaySrc] = useState<string | null>(isHeic ? null : src);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        if (!isHeic || !isVisible) return;
        let objectUrl: string | null = null;
        let cancelled = false;

        (async () => {
            try {
                const heic2any = (await import('heic2any')).default;
                const heicBlob = await fetch(src).then(res => res.blob());
                const converted = await heic2any({ blob: heicBlob, toType: 'image/jpeg', quality: 0.8 });
                const jpegBlob = Array.isArray(converted) ? converted[0] : converted;
                objectUrl = URL.createObjectURL(jpegBlob);
                if (!cancelled) setDisplaySrc(objectUrl);
            } catch (error) {
                console.error('Failed to convert HEIC image:', src, error);
                if (!cancelled) setFailed(true);
            }
        })();

        return () => {
            cancelled = true;
            if (objectUrl) URL.revokeObjectURL(objectUrl);
        };
    }, [isHeic, isVisible, src]);

    return { displaySrc, failed };
};

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const Lightbox: React.FC<{ src: string; alt: string; description?: string; onClose: () => void }> = ({ src, alt, description, onClose }) => {
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', onKeyDown);
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = previousOverflow;
        };
    }, [onClose]);

    return ReactDOM.createPortal(
        <div
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 sm:p-8"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors p-2"
            >
                <CloseIcon className="h-8 w-8" />
            </button>
            <div className="flex flex-col items-center max-w-full max-h-full" onClick={e => e.stopPropagation()}>
                <img src={src} alt={alt} className="max-w-full max-h-[85vh] object-contain rounded" />
                {description && <p className="text-white text-center mt-4 max-w-2xl">{description}</p>}
            </div>
        </div>,
        document.body
    );
};

const GalleryCard: React.FC<{ item: GalleryItem }> = ({ item }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref, { threshold: 0.1, triggerOnce: true });
    const { displaySrc, failed } = useDisplaySrc(item.src, isVisible);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div
                ref={ref}
                onClick={() => displaySrc && setIsOpen(true)}
                className={`group relative overflow-hidden rounded-lg shadow-lg transform transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${displaySrc ? 'cursor-pointer' : ''}`}
            >
                {displaySrc ? (
                    <img src={displaySrc} alt={item.alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                ) : (
                    <div className="w-full aspect-[4/3] bg-gray-200 dark:bg-slate/30 animate-pulse flex items-center justify-center">
                        {failed && <span className="text-xs text-gray-500 dark:text-slate px-4 text-center">Couldn't load this photo</span>}
                    </div>
                )}
                {item.description && (
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <p className="text-white text-sm font-bold">{item.description}</p>
                    </div>
                )}
            </div>
            {isOpen && displaySrc && (
                <Lightbox src={displaySrc} alt={item.alt} description={item.description} onClose={() => setIsOpen(false)} />
            )}
        </>
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
            const images = await fetchGalleryImages(ASSETS_BUCKET, GALLERY_PREFIX);
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
