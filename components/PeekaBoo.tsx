import React, { useState, useEffect, useRef } from 'react';
import { ASSETS_BUCKET, PROFILE_PHOTO_PREFIX } from '../constants';
import { fetchLatestFileUrl } from '../services/api';

const PEEK_DURATION_MS = 4500;
const HIDDEN_DURATION_MS = 25000;
const INITIAL_DELAY_MS = 2500;

// A little easter egg: the site owner's photo peeks up from the bottom-right corner every
// so often, then ducks back down. Purely decorative and non-essential, so it's aria-hidden
// and excluded from tab order rather than competing for screen-reader/keyboard attention.
const PeekaBoo: React.FC = () => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [isPeeking, setIsPeeking] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    fetchLatestFileUrl(ASSETS_BUCKET, PROFILE_PHOTO_PREFIX)
      .then(setPhotoUrl)
      .catch(error => console.error('Failed to fetch profile photo:', error));
  }, []);

  useEffect(() => {
    if (!photoUrl) return;

    const scheduleNext = (delay: number, nextState: boolean) => {
      timeoutRef.current = setTimeout(() => {
        setIsPeeking(nextState);
        scheduleNext(nextState ? PEEK_DURATION_MS : HIDDEN_DURATION_MS, !nextState);
      }, delay);
    };

    scheduleNext(INITIAL_DELAY_MS, true);
    return () => clearTimeout(timeoutRef.current);
  }, [photoUrl]);

  if (!photoUrl) return null;

  return (
    <div
      className="fixed z-40 pointer-events-none"
      style={{
        bottom: '-24px',
        right: '-24px',
        transform: isPeeking ? 'translate(0, 0)' : 'translate(70px, 70px)',
        transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      <button
        onClick={() => setIsPeeking(false)}
        aria-hidden="true"
        tabIndex={-1}
        className={`pointer-events-auto block w-16 h-16 sm:w-24 sm:h-24 rounded-full border-4 border-blue-600 dark:border-accent-blue shadow-xl overflow-hidden ${isPeeking ? 'animate-peekaboo-wobble' : ''}`}
      >
        <img src={photoUrl} alt="" className="w-full h-full object-cover" />
      </button>
      <style>{`
        @keyframes peekaboo-wobble {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-6deg); }
          75% { transform: rotate(6deg); }
        }
        .animate-peekaboo-wobble {
          animation: peekaboo-wobble 2.2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PeekaBoo;
