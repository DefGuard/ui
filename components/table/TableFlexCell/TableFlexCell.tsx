import { TableCell } from '../TableCell/TableCell';

type Props = {
  radius?: boolean;
};

export const TableFlexCell = ({ radius = false }: Props) => {
  return <TableCell radius={radius} empty flex />;
};
