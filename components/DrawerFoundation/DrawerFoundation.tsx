import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motionTransitionStandard } from '../../consts';
import { lockRootScroll, unlockRootScroll } from '../../utils/scrollLock';
import type { ModalBase } from '../ModalFoundation/types';

const portalTarget = document.getElementById('modals-root') as HTMLElement;

export const DrawerFoundation = ({
  children,
  isOpen,
  afterClose,
  contentClassName,
  hideBackdrop,
  id,
  positionerClassName,
}: Omit<ModalBase, 'onClose'>) => {
  const openRef = useRef(isOpen);

  useEffect(() => {
    if (isOpen) {
      lockRootScroll();
    } else {
      unlockRootScroll();
    }
    return () => {
      unlockRootScroll();
    };
  }, [isOpen]);

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div className="modal-root">
          {!hideBackdrop && (
            <motion.div
              className="backdrop"
              style={{
                backgroundColor: '#000000',
              }}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 0.45,
              }}
              exit={{
                opacity: 0,
              }}
              transition={motionTransitionStandard}
            ></motion.div>
          )}
          <motion.div className={clsx('modal-positioner', positionerClassName)}>
            <motion.div
              id={id}
              className={contentClassName}
              initial={{
                x: '100%',
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: '100%',
              }}
              onAnimationComplete={(target: { x?: string | number }) => {
                if (!openRef.current && target.x === '100%') {
                  afterClose?.();
                }
              }}
              transition={motionTransitionStandard}
            >
              {children}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    portalTarget,
  );
};
