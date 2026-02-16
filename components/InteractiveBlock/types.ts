import type { HTMLProps } from 'react';
import type { BadgeVariantValue } from '../Badge/types';

type VariantOption = 'radio' | 'checkbox' | 'toggle';

export interface InteractiveBlockProps extends Omit<HTMLProps<HTMLDivElement>, 'value'> {
  title: string;
  value: boolean;
  content?: string;
  variant?: VariantOption;
  disabled?: boolean;
  badge?: {
    text: string;
    variant: BadgeVariantValue;
  };
}
