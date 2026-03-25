import type { HTMLProps } from 'react';
import type { BadgeProps } from '../Badge/types';

type VariantOption = 'radio' | 'checkbox' | 'toggle' | 'static';

export interface InteractiveBlockProps extends Omit<HTMLProps<HTMLDivElement>, 'value'> {
  title: string;
  value: boolean;
  content?: string;
  variant?: VariantOption;
  disabled?: boolean;
  badge?: BadgeProps;
}
