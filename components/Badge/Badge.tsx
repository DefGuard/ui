import './style.scss';
import clsx from 'clsx';
import { Icon } from '../Icon';
import type { BadgeProps } from './types';

export const Badge = ({
  text,
  className,
  testId,
  ref,
  icon = false,
  removeBackground: background = false,
  variant = 'neutral',
}: BadgeProps) => {
  return (
    <div
      data-testid={testId}
      data-variant={variant}
      className={clsx('badge', className, `variant-${variant}`, {
        bg: background,
        icon,
      })}
      ref={ref}
    >
      {icon && <Icon icon="status-simple" size={20} />}
      <span>{text}</span>
    </div>
  );
};
