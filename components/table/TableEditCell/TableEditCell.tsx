import { IconButtonMenu } from '../../IconButtonMenu/IconButtonMenu';
import type { MenuItemsGroup } from '../../Menu/types';
import { TableCell } from '../TableCell/TableCell';

export const TableEditCell = (props: { menuItems: MenuItemsGroup[] }) => {
  return (
    <TableCell flex alignContent="right">
      <IconButtonMenu icon="menu" menuItems={props.menuItems} />
    </TableCell>
  );
};
