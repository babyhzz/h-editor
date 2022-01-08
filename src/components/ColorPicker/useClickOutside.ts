import type { RefObject } from 'react';
import { useEffect } from 'react';

// Improved version of https://usehooks.com/useOnClickOutside/
const useClickOutside = (ref: RefObject<HTMLElement>, handler: (e: MouseEvent) => void) => {
  useEffect(() => {
    let startedInside: any = false;
    let startedWhenMounted: any = null;

    const listener = (event: MouseEvent) => {
      event.stopPropagation();
      event.stopImmediatePropagation();
      // Do nothing if `mousedown` or `touchstart` started inside ref element
      if (startedInside || !startedWhenMounted) return;
      // Do nothing if clicking ref's element or descendent elements
      // TODO: Why as Element is OK ?
      if (!ref.current || ref.current.contains(event.target as Element)) return;

      handler(event);
    };

    const validateEventStart = (event: MouseEvent | TouchEvent) => {
      startedWhenMounted = ref.current;
      startedInside = ref.current && ref.current.contains(event.target as Element);
    };

    document.addEventListener('mousedown', validateEventStart);
    document.addEventListener('touchstart', validateEventStart);
    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('mousedown', validateEventStart);
      document.removeEventListener('touchstart', validateEventStart);
      document.removeEventListener('click', listener);
    };
  }, [ref, handler]);
};

export default useClickOutside;
