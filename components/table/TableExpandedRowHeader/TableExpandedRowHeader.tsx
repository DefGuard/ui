import type { HTMLProps } from 'react';
import { TableCell } from '../TableCell/TableCell';
import { TableRowContainer } from '../TableRowContainer/TableRowContainer';

export const TableExpandedRowHeader = ({
  headersData: headers,
  canExpand,
  canSelect,
  ...props
}: {
  headersData: string[];
  canExpand: boolean;
  canSelect: boolean;
} & HTMLProps<HTMLDivElement>) => {
  return (
    <TableRowContainer variant="sub-header" {...props}>
      {canExpand && <TableCell empty />}
      {canSelect && <TableCell empty />}
      {headers.map((header, index) => {
        if (header.length) {
          return (
            <TableCell key={header}>
              <span>{header}</span>
            </TableCell>
          );
        }
        return <TableCell key={`empty-${index}`} empty />;
      })}
    </TableRowContainer>
  );
};
