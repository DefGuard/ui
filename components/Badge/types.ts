import type { Ref } from 'react';
import type { IconKindValue } from '../Icon/icon-types';

export const BadgeVariant = {
  Neutral: 'neutral',
  Success: 'success',
  Critical: 'critical',
  Warning: 'warning',
} as const;

export type BadgeVariantValue = (typeof BadgeVariant)[keyof typeof BadgeVariant];

export interface BadgeProps {
  text: string;
  removeBackground?: boolean;
  variant?: BadgeVariantValue;
  className?: string;
  testId?: string;
  ref?: Ref<HTMLDivElement>;
  icon?: IconKindValue;
  iconSize?: number;
  showIcon?: boolean;
}
