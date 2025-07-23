import './style.scss';

import type { Placement } from '@floating-ui/react';
import useResizeObserver from '@react-hook/resize-observer';
import clsx from 'clsx';
import { useCallback, useRef, useState } from 'react';
import { useClipboard } from '../../../../hooks/useClipboard';
import { ActionButton } from '../ActionButton/ActionButton';
import { ActionButtonVariant } from '../ActionButton/types';
import { FloatingMenu } from '../FloatingMenu/FloatingMenu';
import { FloatingMenuProvider } from '../FloatingMenu/FloatingMenuProvider';
import { FloatingMenuTrigger } from '../FloatingMenu/FloatingMenuTrigger';

type Props = {
  text: string;
  withCopy?: boolean;
  placement?: Placement;
};

export const ListCellText = ({ text, withCopy, placement = 'left' }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [overflows, setOverflows] = useState(false);

  const { writeToClipboard } = useClipboard();

  const handleResize = useCallback(() => {
    if (containerRef.current) {
      setOverflows(containerRef.current.scrollWidth > containerRef.current.clientWidth);
    }
  }, []);

  useResizeObserver(containerRef, handleResize);
  return (
    <FloatingMenuProvider disabled={!overflows} placement={placement}>
      <div
        className={clsx('list-cell-text', {
          overflows,
        })}
        ref={containerRef}
      >
        <FloatingMenuTrigger asChild>
          <p>{text}</p>
        </FloatingMenuTrigger>
      </div>
      <FloatingMenu
        className={clsx('list-cell-text-floating', {
          copy: withCopy,
        })}
      >
        <p>{text}</p>
        {withCopy && (
          <ActionButton
            variant={ActionButtonVariant.COPY}
            onClick={() => {
              void writeToClipboard(text);
            }}
          />
        )}
      </FloatingMenu>
    </FloatingMenuProvider>
  );
};
