import './style.scss';
import clsx from 'clsx';
import { type CSSProperties, useContext, useMemo } from 'react';
import { TableCellContext } from './TableCellContext';
import type { TableCellProps } from './types';

export const TableCell = ({
  children,
  className,
  empty,
  noPadding,
  noBorder,
  alignContent = 'left',
  style: outsideStyle,
  ...props
}: TableCellProps) => {
  const cell = useContext(TableCellContext);

  const style = useMemo((): CSSProperties => {
    const res: CSSProperties = {};
    if (cell) {
      res.width = `calc(var(--col-${cell.column.id}-size) * 1px)`;
    }
    return res;
  }, [cell]);

  return (
    <div
      className={clsx('table-cell', className, `align-${alignContent}`, {
        'no-padding': noPadding,
        'no-border': noBorder,
        empty,
      })}
      style={{ ...outsideStyle, ...style }}
      {...props}
    >
      {children}
    </div>
  );
};
