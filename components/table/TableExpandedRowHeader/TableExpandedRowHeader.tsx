import type { HTMLProps } from 'react';
import { TableCell } from '../TableCell/TableCell';
import { TableRowContainer } from '../TableRowContainer/TableRowContainer';

export const TableExpandedRowHeader = ({
  headersData: headers,
  ...props
}: { headersData: string[] } & HTMLProps<HTMLDivElement>) => {
  return (
    <TableRowContainer variant="sub-header" {...props}>
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
