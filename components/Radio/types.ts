import type { BadgeProps } from '../Badge/types';

export interface RadioProps {
  text?: string;
  testId?: string;
  active?: boolean;
  disabled?: boolean;
  error?: string;
  onClick?: () => void;
  badgeProps?: BadgeProps;
}
