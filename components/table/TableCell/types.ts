import type { HTMLProps } from 'react';

export interface TableCellProps extends HTMLProps<HTMLDivElement> {
  empty?: boolean;
  noPadding?: boolean;
  noBorder?: boolean;
  flex?: boolean;
  radius?: boolean;
  columnId?: string;
  ignoreStyleAssign?: boolean;
  alignContent?: 'center' | 'left' | 'right';
  sticky?: boolean;
}
