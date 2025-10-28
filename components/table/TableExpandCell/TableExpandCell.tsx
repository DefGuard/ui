import { IconButton } from '../../IconButton/IconButton';
import './style.scss';
import type { Row } from '@tanstack/react-table';
import { Icon } from '../../Icon';
import { TableCell } from '../TableCell/TableCell';

type Props<T extends object> = {
  row: Row<T>;
};

export const TableExpandCell = <T extends object>({ row }: Props<T>) => {
  const expanded = row.getIsExpanded();
  const canExpand = row.getCanExpand();
  return (
    <TableCell className="table-expand-cell" noPadding>
      {canExpand && (
        <IconButton
          icon="arrow-small"
          iconRotation={expanded ? 'down' : 'right'}
          onClick={() => {
            row.toggleExpanded();
          }}
        />
      )}
      {!canExpand && <Icon icon="enter" />}
    </TableCell>
  );
};
