import { Checkbox } from '../../Checkbox/Checkbox';
import { TableCell } from '../TableCell/TableCell';

type Props = {
  selected: boolean;
  onClick?: () => void;
};

export const TableSelectionCell = ({ selected, onClick }: Props) => {
  return (
    <TableCell alignContent="center" noBorder>
      <Checkbox active={selected} onClick={onClick} />
    </TableCell>
  );
};
