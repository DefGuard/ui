import { Checkbox } from '../../Checkbox/Checkbox';
import { TableCell } from '../TableCell/TableCell';

type Props = {
  selected: boolean;
  onClick?: () => void;
};

export const TableSelectionCell = ({ selected, onClick }: Props) => {
  return (
    <TableCell
      sticky
      alignContent="center"
      noBorder
      style={{
        width: `calc(var(--col-0-size) * 1px)`,
        left: 'calc(var(--selection-sticky-offset) * 1px - var(--table-inline-padding))',
      }}
    >
      <Checkbox active={selected} onClick={onClick} />
    </TableCell>
  );
};
