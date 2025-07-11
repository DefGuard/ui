import './arrow.scss';

import type { Placement } from '@floating-ui/react';
import clsx from 'clsx';
import { useMemo } from 'react';

import { useTheme } from '../../../hooks/theme/useTheme';

type ArrowIconProps = {
  className?: string;
  placement: Placement;
};

type Direction = 'left' | 'right' | 'top' | 'bottom';

export const FloatingMenuArrow = ({ placement, className }: ArrowIconProps) => {
  const { colors } = useTheme();
  const direction = useMemo(
    (): Direction => placementToDirection(placement),
    [placement],
  );

  return (
    <svg
      className={clsx('floating-menu-arrow', `placement--${direction}`, className)}
      width="8"
      height="14"
      viewBox="0 0 8 14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0 L8 7 L0 14 Z" fill={colors.borderPrimary} />
    </svg>
  );
};

const placementToDirection = (
  placement: Placement,
): 'top' | 'right' | 'bottom' | 'left' => {
  if (placement.startsWith('top')) return 'bottom';
  if (placement.startsWith('bottom')) return 'top';
  if (placement.startsWith('left')) return 'right';
  if (placement.startsWith('right')) return 'left';

  // fallback
  return 'right';
};
