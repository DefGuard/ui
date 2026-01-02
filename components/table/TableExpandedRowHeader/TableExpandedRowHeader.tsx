import { type HTMLProps, useCallback } from 'react';
import { TableCell } from '../TableCell/TableCell';
import { TableFlexCell } from '../TableFlexCell/TableFlexCell';
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
  const getColumnId = useCallback(
    (index: number) => {
      let res = index;
      if (canSelect) {
        res++;
      }
      if (canExpand) {
        res++;
      }
      return res.toString();
    },
    [canExpand, canSelect],
  );

  return (
    <TableRowContainer variant="sub-header" {...props}>
      {canSelect && <TableCell empty columnId="0" />}
      {canExpand && <TableCell empty columnId={canSelect ? '1' : '0'} />}
      {headers.map((header, index) => {
        const columnId = getColumnId(index);
        if (header.length) {
          return (
            <TableCell key={header} columnId={columnId}>
              <span>{header}</span>
            </TableCell>
          );
        }
        return <TableCell key={`empty-${index}`} empty columnId={columnId} />;
      })}
      <TableFlexCell />
    </TableRowContainer>
  );
};
