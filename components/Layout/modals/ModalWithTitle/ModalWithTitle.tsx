import './style.scss';

import clsx from 'clsx';
import { useEffect } from 'react';

import SvgIconX from '../../../svg/IconX';
import { Modal } from '../Modal/Modal';
import type { ModalProps } from '../Modal/types';

export interface ModalWithTitleProps extends ModalProps {
  title?: string;
  includeDefaultStyles?: boolean;
}

export const ModalWithTitle = ({
  children,
  title,
  className,
  isOpen,
  onClose,
  setIsOpen,
  disableClose = false,
  includeDefaultStyles = false,
  ...rest
}: ModalWithTitleProps) => {
  useEffect(() => {
    return () => {
      rest.afterClose?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal
      onClose={onClose}
      setIsOpen={setIsOpen}
      className={clsx('titled', className, {
        'default-styles': includeDefaultStyles,
      })}
      isOpen={isOpen}
      disableClose={disableClose}
      {...rest}
    >
      {!disableClose && (
        <button
          className="close"
          onClick={() => {
            onClose?.();
            setIsOpen?.(false);
          }}
        >
          <SvgIconX />
        </button>
      )}
      {title && title.length > 0 && (
        <div className="header">
          <p className="title">{title}</p>
        </div>
      )}
      {children && <div className="content">{children}</div>}
    </Modal>
  );
};
