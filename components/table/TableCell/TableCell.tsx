import './style.scss';
import clsx from 'clsx';
import type { TableCellProps } from './types';

export const TableCell = ({
  children,
  className,
  empty,
  noPadding,
  noBorder,
  alignContent = 'left',
  ...props
}: TableCellProps) => {
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
