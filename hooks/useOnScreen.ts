
import React from 'react';

// FIX: Define a custom options type that extends IntersectionObserverInit to include the `triggerOnce` property.
// This resolves the TypeScript error about 'triggerOnce' not existing on IntersectionObserverInit.
interface UseOnScreenOptions extends IntersectionObserverInit {
  triggerOnce?: boolean;
}

export function useOnScreen(ref: React.RefObject<HTMLElement>, options: UseOnScreenOptions = { threshold: 0.1, triggerOnce: true }) {
  const [isIntersecting, setIntersecting] = React.useState(false);

  // FIX: Destructure the custom `triggerOnce` property from the standard IntersectionObserver options.
  // This allows us to pass a clean `observerOptions` object to the IntersectionObserver constructor, which prevents runtime warnings.
  // A default value is provided for `triggerOnce` to make the hook more robust.
  const { triggerOnce = true, ...observerOptions } = options;

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIntersecting(true);
        if (triggerOnce && ref.current) {
          observer.unobserve(ref.current);
        }
      }
    }, observerOptions);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
    // FIX: Update dependency array. The original dependency array was flawed.
    // By stringifying the observerOptions, we create a stable dependency that correctly triggers the effect if any observer option changes.
    // The eslint-disable is kept as the linter might complain about complex expressions in dependency array.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, JSON.stringify(observerOptions), triggerOnce]);

  return isIntersecting;
}
