import './style.scss';
import clsx from 'clsx';
import { isPresent } from '../../utils/isPresent';
import { DrawerFoundation } from '../DrawerFoundation/DrawerFoundation';
import { IconButton } from '../IconButton/IconButton';
import type { ModalBase } from '../ModalFoundation/types';

interface DrawerModalProps extends ModalBase {
  title: string;
}

export const DrawerModal = ({
  title,
  onClose,
  children,
  contentClassName,
  ...foundationProps
}: DrawerModalProps) => {
  return (
    <DrawerFoundation
      {...foundationProps}
      contentClassName={clsx('drawer-modal', contentClassName)}
      positionerClassName="drawer-positioner"
    >
      <div className="modal-header">
        <p className="title">{title}</p>
        {isPresent(onClose) && <IconButton icon="close" onClick={onClose} />}
      </div>
      <div className="modal-content">{children}</div>
    </DrawerFoundation>
  );
};
