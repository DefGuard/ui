import './style.scss';
import clsx from 'clsx';
import { Icon } from '../Icon';
import type { BadgeProps } from './types';

export const Badge = ({
  text,
  className,
  testId,
  ref,
  removeBackground: background = false,
  variant = 'neutral',
  icon = 'status-simple',
  iconSize = 16,
  showIcon = false,
}: BadgeProps) => {
  return (
    <div
      data-testid={testId}
      data-variant={variant}
      className={clsx('badge', className, `variant-${variant}`, {
        bg: background,
        icon: showIcon,
      })}
      ref={ref}
    >
      {showIcon && <Icon icon={icon} size={iconSize} />}
      <span>{text}</span>
    </div>
  );
};
