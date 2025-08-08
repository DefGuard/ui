import './style.scss';

import {
  autoUpdate,
  FloatingPortal,
  safePolygon,
  useFloating,
  useHover,
  useInteractions,
} from '@floating-ui/react';
import clsx from 'clsx';
import { getTextWidth } from 'get-text-width';
import { AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

import { FloatingBox } from '../FloatingBox/FloatingBox';

type Props = {
  text: string;
  className?: string;
  floatingClassName?: string;
  testId?: string;
  otherContent?: React.ReactNode;
};

export const LimitedText = ({
  text,
  className,
  floatingClassName,
  testId,
  otherContent,
}: Props) => {
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
    handleClose: safePolygon({
      requireIntent: false,
    }),
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);
  const estimatedWidth = getTextWidth(text);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Runs check only on mount
  useEffect(() => {
    if (refs.reference.current) {
      const refWidth = refs.reference.current.getBoundingClientRect().width;
      if (estimatedWidth >= refWidth) {
        setEnabled(true);
      }
    }
  }, [refs.reference]);

  return (
    <>
      <div
        className={clsx('text-limited', className)}
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        <p className="text" data-testid={testId}>
          {text}
        </p>
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
              {otherContent}
            </FloatingBox>
          </FloatingPortal>
        )}
      </AnimatePresence>
    </>
  );
};
