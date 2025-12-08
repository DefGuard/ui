import type { HTMLProps } from 'react';

type VariantOption = 'radio' | 'checkbox' | 'toggle';

export interface InteractiveBlockProps extends Omit<HTMLProps<HTMLDivElement>, 'value'> {
  title: string;
  value: boolean;
  content?: string;
  variant?: VariantOption;
  disabled?: boolean;
}
