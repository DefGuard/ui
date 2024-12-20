import './style.scss';

import {
  autoUpdate,
  FloatingPortal,
  useFloating,
  useHover,
  useInteractions,
} from '@floating-ui/react';
import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';
import { getTextWidth } from 'get-text-width';
import { useEffect, useState } from 'react';

import { FloatingBox } from '../FloatingBox/FloatingBox';

type Props = {
  text: string;
  className?: string;
  floatingClassName?: string;
};

export const LimitedText = ({ text, className, floatingClassName }: Props) => {
  const [enabled, setEnabled] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    placement: 'top',
  });
  const hover = useHover(context, {
    restMs: 500,
    enabled: enabled,
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);
  const estimatedWidth = getTextWidth(text);

  useEffect(() => {
    if (refs.reference.current) {
      const refWidth = refs.reference.current.getBoundingClientRect().width;
      if (estimatedWidth >= refWidth) {
        setEnabled(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refs.reference]);

  return (
    <>
      <div
        className={clsx('text-limited', className)}
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        <p className="text">{text}</p>
      </div>
      <AnimatePresence mode="wait">
        {isOpen && (
          <FloatingPortal>
            <FloatingBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              ref={refs.setFloating}
              className={clsx('text-limited-floating', floatingClassName)}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              <p>{text}</p>
            </FloatingBox>
          </FloatingPortal>
        )}
      </AnimatePresence>
    </>
  );
};
