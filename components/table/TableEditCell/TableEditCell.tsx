import './style.scss';
import { IconButtonMenu } from '../../IconButtonMenu/IconButtonMenu';
import type { MenuItemsGroup } from '../../Menu/types';
import { tableEditColumnSize } from '../consts';
import { TableCell } from '../TableCell/TableCell';

type Props = {
  menuItems: MenuItemsGroup[];
  disabled?: boolean;
};

export const TableEditCell = ({ menuItems, disabled }: Props) => {
  return (
    <TableCell
      flex
      alignContent="right"
      className="edit-cell"
      style={{ minWidth: tableEditColumnSize - 2 }}
    >
      <IconButtonMenu icon="menu" menuItems={menuItems} disabled={disabled} />
    </TableCell>
  );
};
