import { IconButton } from '../../IconButton/IconButton';
import './style.scss';
import type { Row } from '@tanstack/react-table';
import clsx from 'clsx';
import { tableActionColumnSize } from '../consts';
import { TableCell } from '../TableCell/TableCell';

type Props<T extends object> = {
  row: Row<T>;
};

export const TableExpandCell = <T extends object>({ row }: Props<T>) => {
  const expanded = row.getIsExpanded();
  const canExpand = row.getCanExpand();
  return (
    <TableCell
      className="table-expand-cell"
      noPadding
      empty={!canExpand}
      style={{ width: tableActionColumnSize }}
    >
      {canExpand && (
        <IconButton
          className={clsx({
            active: expanded,
          })}
          icon="arrow-small"
          iconRotation={expanded ? 'down' : 'right'}
          onClick={() => {
            row.toggleExpanded();
          }}
        />
      )}
    </TableCell>
  );
};
