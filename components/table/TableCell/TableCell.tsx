import './style.scss';
import clsx from 'clsx';
import { type CSSProperties, useContext, useMemo } from 'react';
import { isPresent } from '../../../utils/isPresent';
import { tableActionColumnSize } from '../consts';
import { TableCellContext } from './TableCellContext';
import type { TableCellProps } from './types';

export const TableCell = ({
  children,
  className,
  empty,
  noPadding,
  noBorder,
  columnId,
  alignContent = 'left',
  flex = false,
  radius = false,
  style: outsideStyle,
  ...props
}: TableCellProps) => {
  const cell = useContext(TableCellContext);

  const isSticky = cell?.column.columnDef.meta?.sticky ?? false;

  const style = useMemo((): CSSProperties => {
    const res: CSSProperties = {};
    if (outsideStyle?.width) return res;
    const id = columnId ?? cell?.column.id;
    const hasId = isPresent(id);
    if (flex) {
      return res;
    }
    if (empty && !hasId) {
      res.width = tableActionColumnSize;
      return res;
    }
    if (hasId) {
      res.width = `calc(var(--col-${id}-size) * 1px)`;
      // Set sticky offset if this is a sticky column
      if (isSticky) {
        res.left = `calc(var(--col-${id}-sticky-left-offset) * 1px)`;
      }
    }
    return res;
  }, [columnId, empty, flex, outsideStyle?.width, cell, isSticky]);

  return (
    <div
      className={clsx('table-cell', className, `align-${alignContent}`, {
        'no-padding': noPadding,
        'no-border': noBorder,
        sticky: isSticky,
        empty,
        flex,
        radius,
      })}
      style={{ ...outsideStyle, ...style }}
      {...props}
    >
      {children}
    </div>
  );
};
