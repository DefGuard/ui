import './style.scss';
import clsx from 'clsx';
import type { PropsWithChildren } from 'react';
import { Icon } from '../Icon';
import type { BadgeProps } from './types';

export const Badge = ({
  text,
  className,
  testId,
  ref,
  children,
  removeBackground: background = false,
  variant = 'neutral',
  icon = 'status-simple',
  iconSize = 16,
  showIcon = false,
  ...containerProps
}: BadgeProps & PropsWithChildren) => {
  return (
    <div
      data-testid={testId}
      data-variant={variant}
      className={clsx('badge', className, `variant-${variant}`, {
        bg: background,
        icon: showIcon,
      })}
      ref={ref}
      {...containerProps}
    >
      {showIcon && <Icon icon={icon} size={iconSize} />}
      <span>{text}</span>
      {children}
    </div>
  );
};
