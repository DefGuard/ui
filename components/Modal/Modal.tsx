import './style.scss';
import clsx from 'clsx';
import { isPresent } from '../../utils/isPresent';
import { IconButton } from '../IconButton/IconButton';
import { ModalFoundation } from '../ModalFoundation/ModalFoundation';
import type { ModalProps } from './types';

export const Modal = ({
  title,
  size,
  onClose,
  children,
  contentClassName,
  ...foundationProps
}: ModalProps) => {
  return (
    <ModalFoundation
      {...foundationProps}
      contentClassName={clsx('modal', `size-${size}`, contentClassName)}
    >
      <div className="modal-header">
        <p className="title">{title}</p>
        {isPresent(onClose) && <IconButton icon="close" onClick={onClose} />}
      </div>
      <div className="modal-content">{children}</div>
    </ModalFoundation>
  );
};
