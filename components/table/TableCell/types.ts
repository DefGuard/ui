import type { HTMLProps } from 'react';

export interface TableCellProps extends HTMLProps<HTMLDivElement> {
  empty?: boolean;
  noPadding?: boolean;
  noBorder?: boolean;
  alignContent?: 'center' | 'left' | 'right';
}
