import {useEffect} from 'react';

// Hook to close modals on click outside
export const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = e => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }

      handler(e);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};
