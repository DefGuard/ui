import './style.scss';
import clsx from 'clsx';
import type { Ref } from 'react';
import { Icon } from '../Icon';
import type { BadgeVariantValue } from './types';

type Props = {
  text: string;
  background?: boolean;
  variant?: BadgeVariantValue;
  className?: string;
  testId?: string;
  ref?: Ref<HTMLDivElement>;
  icon?: boolean;
};

export const Badge = ({
  text,
  className,
  testId,
  ref,
  icon = false,
  background = false,
  variant = 'neutral',
}: Props) => {
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
