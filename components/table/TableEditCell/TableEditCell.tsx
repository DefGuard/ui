import { IconButtonMenu } from '../../IconButtonMenu/IconButtonMenu';
import type { MenuItemsGroup } from '../../Menu/types';
import { tableEditColumnSize } from '../consts';
import { TableCell } from '../TableCell/TableCell';
import type { TableCellProps } from '../TableCell/types';

type Props = {
  menuItems: MenuItemsGroup[];
  disabled?: boolean;
} & TableCellProps;

export const TableEditCell = ({
  menuItems,
  disabled,
  alignContent = 'right',
  style,
  ...cellProps
}: Props) => {
  return (
    <TableCell
      alignContent={alignContent}
      style={{ width: tableEditColumnSize, ...style }}
      {...cellProps}
    >
      <IconButtonMenu icon="menu" menuItems={menuItems} disabled={disabled} />
    </TableCell>
  );
};
