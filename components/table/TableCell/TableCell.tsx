import type { HTMLProps } from 'react';
import './style.scss';
import clsx from 'clsx';

type Props = HTMLProps<HTMLDivElement> & {
  empty?: boolean;
  noPadding?: boolean;
  noBorder?: boolean;
  alignContent?: 'center' | 'left' | 'right';
};

export const TableCell = ({
  children,
  className,
  empty,
  noPadding,
  noBorder,
  alignContent = 'left',
  ...props
}: Props) => {
  return (
    <div
      className={clsx('table-cell', className, `align-${alignContent}`, {
        'no-padding': noPadding,
        'no-border': noBorder,
        empty,
      })}
      {...props}
    >
      {children}
    </div>
  );
};
