import './style.scss';
import clsx from 'clsx';
import { type CSSProperties, useContext, useMemo } from 'react';
import { isPresent } from '../../../utils/isPresent';
import { tableActionColumnSize } from '../consts';
import { TableCellContext } from './TableCellContext';
import { TableStickyColumnsContext } from './TableStickyColumnsContext';
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
  sticky = false,
  style: outsideStyle,
  ...props
}: TableCellProps) => {
  const cell = useContext(TableCellContext);
  const stickyColumns = useContext(TableStickyColumnsContext);

  const isStickyFromMeta = cell?.column.columnDef.meta?.sticky ?? false;
  const isSticky = sticky || isStickyFromMeta;

  const style = useMemo((): CSSProperties => {
    const res: CSSProperties = {};
    const id = columnId ?? cell?.column.id;
    const hasId = isPresent(id);

    if (!outsideStyle?.width) {
      if (flex) {
        return res;
      }
      if (empty && !hasId) {
        res.width = tableActionColumnSize;
        return res;
      }
      if (hasId) {
        res.width = `calc(var(--col-${id}-size) * 1px)`;
      }
    }

    if (hasId && isSticky) {
      const stickySide = stickyColumns[id];
      if (stickySide === 'left') {
        res.left = `calc(var(--col-${id}-sticky-left-offset) * 1px - var(--table-inline-padding))`;
      }
      if (stickySide === 'right') {
        res.right = `calc(var(--col-${id}-sticky-right-offset) * 1px - var(--table-inline-padding))`;
      }
    }

    return res;
  }, [columnId, empty, flex, outsideStyle?.width, cell, isSticky, stickyColumns]);

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
