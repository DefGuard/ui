import type { HTMLProps, MouseEventHandler } from 'react';
import './style.scss';
import clsx from 'clsx';
import { isPresent } from '../../utils/isPresent';
import { Icon } from '../Icon';

interface Props extends Omit<HTMLProps<HTMLDivElement>, 'size'> {
  text: string;
  size?: 'sm' | 'lg';
  onDismiss?: MouseEventHandler<HTMLDivElement>;
}

export const Chip = ({
  text,
  className,
  size = 'sm',
  onDismiss,
  ...containerProps
}: Props) => {
  const dismissible = isPresent(onDismiss);
  return (
    <div
      className={clsx('chip', className, `size-${size}`, {
        dismiss: dismissible,
      })}
      {...containerProps}
    >
      <span>{text}</span>
      {dismissible && (
        <div className="dismiss-track" onClick={onDismiss}>
          <Icon icon="clear" />
        </div>
      )}
    </div>
  );
};
