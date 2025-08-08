import useResizeObserver from '@react-hook/resize-observer';
import { type RefObject, useLayoutEffect, useState } from 'react';

export const useElementSize = (target: RefObject<HTMLElement | null>) => {
  const [size, setSize] = useState<DOMRect | undefined>();

  useLayoutEffect(() => {
    if (target.current) {
      setSize(target.current?.getBoundingClientRect());
    }
  }, [target]);

  useResizeObserver(target, (entry) => setSize(entry.contentRect));
  return size;
};
