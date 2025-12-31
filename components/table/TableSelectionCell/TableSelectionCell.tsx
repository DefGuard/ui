import { Checkbox } from '../../Checkbox/Checkbox';
import { tableActionColumnSize } from '../consts';
import { TableCell } from '../TableCell/TableCell';

type Props = {
  selected: boolean;
  onClick?: () => void;
};

export const TableSelectionCell = ({ selected, onClick }: Props) => {
  return (
    <TableCell
      alignContent="center"
      noBorder
      style={{
        width: tableActionColumnSize,
      }}
    >
      <Checkbox active={selected} onClick={onClick} />
    </TableCell>
  );
};
