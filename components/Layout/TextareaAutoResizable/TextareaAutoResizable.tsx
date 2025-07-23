import { useEffect, useRef } from 'react';

import type { ResizableTextareaProps } from './types';

export const TextareaAutoResizable = (props: ResizableTextareaProps) => {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (ref && ref.current !== null) {
      const handler = () => handleResize(ref.current as HTMLTextAreaElement);
      ref.current?.addEventListener('input', handler);
      ref.current?.addEventListener('drop', handler);
      ref.current?.addEventListener('paste', handler);
      // init resize
      setTimeout(() => handleResize(ref.current as HTMLTextAreaElement), 100);
      return () => {
        if (ref?.current) {
          ref.current.removeEventListener('input', handler);
          ref.current.removeEventListener('drop', handler);
          //eslint-disable-next-line
          ref.current.removeEventListener('paste', handler);
        }
      };
    }
  }, []);

  return <textarea {...props} ref={ref} />;
};

const handleResize = (el: HTMLTextAreaElement) => {
  el.style.height = 'auto';
  el.style.height = `${el.scrollHeight}px`;
};
