import { IconButtonMenu } from '../../IconButtonMenu/IconButtonMenu';
import type { MenuItemsGroup } from '../../Menu/types';
import { TableCell } from '../TableCell/TableCell';

type Props = {
  menuItems: MenuItemsGroup[];
  disabled?: boolean;
};

export const TableEditCell = ({ menuItems, disabled }: Props) => {
  return (
    <TableCell flex alignContent="right">
      <IconButtonMenu icon="menu" menuItems={menuItems} disabled={disabled} />
    </TableCell>
  );
};
