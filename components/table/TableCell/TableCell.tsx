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
    }
    return res;
  }, [columnId, empty, flex, outsideStyle?.width, cell]);

  return (
    <div
      className={clsx('table-cell', className, `align-${alignContent}`, {
        'no-padding': noPadding,
        'no-border': noBorder,
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
