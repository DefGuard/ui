import './style.scss';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motionTransitionStandard } from '../../consts';
import { isPresent } from '../../utils/isPresent';
import { IconButton } from '../IconButton/IconButton';
import type { ModalProps } from './types';

const portalTarget = document.getElementById('modals-root') as HTMLElement;
const rootElement = document.getElementById('root') as HTMLElement;

export const Modal = ({
  id,
  isOpen,
  contentClassName,
  positionerClassName,
  hideBackdrop,
  title,
  children,
  size,
  afterClose,
  onClose,
}: ModalProps) => {
  const openRef = useRef(isOpen);

  useEffect(() => {
    if (isOpen) {
      rootElement.setAttribute('aria-hidden', 'true');
      rootElement.style.overflowY = 'hidden';
    } else {
      rootElement.removeAttribute('aria-hidden');
      rootElement.style.overflowY = 'auto';
    }
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
              className={clsx('modal', contentClassName, `size-${size}`)}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onAnimationComplete={(target: { opacity: number }) => {
                if (!openRef.current && target.opacity === 0) {
                  afterClose?.();
                }
              }}
              transition={motionTransitionStandard}
            >
              <div className="modal-header">
                <p className="title">{title}</p>
                {isPresent(onClose) && <IconButton icon="close" onClick={onClose} />}
              </div>
              <div className="modal-content">{children}</div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    portalTarget,
  );
};
