import { flexRender, type Header } from '@tanstack/react-table';
import { TableCell } from '../TableCell/TableCell';
import './style.scss';
import clsx from 'clsx';
import { useMemo } from 'react';
import { Icon } from '../../Icon';
import { IconKind, type IconKindValue } from '../../Icon/icon-types';

type Props<TData> = {
  header: Header<TData, unknown>;
};

export const TableHeaderCell = <TData extends object>({ header }: Props<TData>) => {
  const isSortable = header.column.columnDef.enableSorting;

  const headerSorting = header.column.getIsSorted();

  const isEmpty =
    typeof header.column.columnDef.header === 'string' &&
    header.column.columnDef.header.length === 0;

  const sortingIcon = useMemo((): IconKindValue => {
    if (!headerSorting) return IconKind.Sortable;
    switch (headerSorting) {
      case 'asc':
        return IconKind.ArrowBig;
      case 'desc':
        return IconKind.ArrowBig;
    }
  }, [headerSorting]);

  if (isEmpty) return <TableCell empty />;

  return (
    <TableCell
      className={clsx('header-cell', {
        clickable: isSortable,
      })}
      onClick={() => {
        if (isSortable) {
          header.column.toggleSorting();
        }
      }}
    >
      <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
      {isSortable && (
        <Icon
          icon={sortingIcon}
          rotationDirection={headerSorting === 'asc' ? 'up' : 'down'}
        />
      )}
    </TableCell>
  );
};
