import type { HTMLProps } from 'react';

export interface RadioBlockProps extends Omit<HTMLProps<HTMLDivElement>, 'value'> {
  title: string;
  content?: string;
  value: boolean;
}
