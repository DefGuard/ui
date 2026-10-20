import type { HTMLProps, Ref } from 'react';
import type { IconKindValue } from '../Icon/icon-types';

export const BadgeVariant = {
  Neutral: 'neutral',
  Success: 'success',
  Critical: 'critical',
  Warning: 'warning',
  Default: 'default',
  Additional: 'additional',
  Plan: 'plan',
  Outlined: 'outlined',
} as const;

export type BadgeVariantValue = (typeof BadgeVariant)[keyof typeof BadgeVariant];

export const BadgeSize = {
  Primary: 'primary',
  Compact: 'compact',
} as const;

export type BadgeSizeValue = (typeof BadgeSize)[keyof typeof BadgeSize];

export interface BadgeProps extends Omit<HTMLProps<HTMLDivElement>, 'size'> {
  text: string;
  removeBackground?: boolean;
  variant?: BadgeVariantValue;
  size?: BadgeSizeValue;
  className?: string;
  testId?: string;
  ref?: Ref<HTMLDivElement>;
  icon?: IconKindValue;
  iconSize?: number;
  showIcon?: boolean;
}
