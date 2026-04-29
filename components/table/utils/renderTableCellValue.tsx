import type { CellContext } from '@tanstack/react-table';
import { TableCell } from '../TableCell/TableCell';

export const renderTableCellValue = <TData extends object>(
  cell: CellContext<TData, string | number | boolean>,
) => (
  <TableCell>
    <span>{cell.getValue()}</span>
  </TableCell>
);
