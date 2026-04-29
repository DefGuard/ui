import { TableCell } from '../TableCell/TableCell';

export const renderTableSimpleHeader = (header: string) => (
  <TableCell>
    <span>{header}</span>
  </TableCell>
);
