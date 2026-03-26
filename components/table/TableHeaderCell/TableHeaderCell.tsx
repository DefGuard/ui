import { flexRender, type Header } from '@tanstack/react-table';
import { TableCell } from '../TableCell/TableCell';
import './style.scss';
import {
  autoUpdate,
  FloatingPortal,
  flip,
  offset,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import clsx from 'clsx';
import { useMemo, useRef, useState } from 'react';
import type { SelectionOption } from '../../../../components/SelectionSection/type';
import { isPresent } from '../../../utils/isPresent';
import { Icon } from '../../Icon';
import { IconKind, type IconKindValue } from '../../Icon/icon-types';
import { TableHeaderFilterFloating } from '../TableHeaderFilterFloating/TableHeaderFilterFloating';

type Props<TData> = {
  header: Header<TData, unknown>;
};

export const TableHeaderCell = <TData extends object>({ header }: Props<TData>) => {
  const isDraggingRef = useRef(false);
  const suppressSortOnNextClickRef = useRef(false);
  const isSortable = header.column.columnDef.enableSorting;
  const filterOptions = header.column.columnDef.meta?.filterOptions as
    | SelectionOption<string | number>[]
    | undefined;
  const filterMessages = header.getContext().table.options.meta?.filterMessages;
  const selectedFilters = () => {
    const values = header.column.getFilterValue() as Array<number | string>;
    return new Set(values);
  };
  const isFilterable =
    header.column.columnDef.enableColumnFilter &&
    isPresent(filterOptions) &&
    isPresent(filterMessages);

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

  const [floatOpen, setFloatOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: floatOpen,
    onOpenChange: setFloatOpen,
    whileElementsMounted: autoUpdate,
    placement: 'bottom-end',
    middleware: [
      offset(4),
      shift(),
      flip(),
      size({
        apply({ availableHeight, elements }) {
          elements.floating.style.maxHeight = `${Math.min(500, availableHeight - 10)}px`;
        },
      }),
    ],
  });

  const click = useClick(context, {
    toggle: true,
  });

  const dismiss = useDismiss(context, {
    ancestorScroll: true,
    escapeKey: true,
  });

  const { getFloatingProps, getReferenceProps } = useInteractions([click, dismiss]);

  const resizable = !isEmpty;

  if (isEmpty)
    return (
      <TableCell
        style={{
          width: `calc(var(--col-${header.id}-size) * 1px)`,
        }}
        empty
      />
    );

  return (
    <>
      <TableCell
        style={{
          width: `calc(var(--col-${header.id}-size) * 1px)`,
        }}
        className={clsx('header-cell', {
          clickable: isSortable,
          filterable: isFilterable,
          resizable,
        })}
        onClick={() => {
          if (suppressSortOnNextClickRef.current) {
            suppressSortOnNextClickRef.current = false;
            return;
          }
          if (isSortable && !isDraggingRef.current) {
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
        {isFilterable && (
          <button
            className={clsx('filter-btn', {
              hover: floatOpen,
              active: header.column.getIsFiltered(),
            })}
            ref={refs.setReference}
            {...getReferenceProps()}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!isDraggingRef.current) {
                setFloatOpen((s) => !s);
              }
            }}
          >
            <Icon icon="filtration" size={16} />
          </button>
        )}
        {header.column.getCanResize() && (
          <div
            className={clsx('resize-bar', {
              resizing: header.column.getIsResizing(),
            })}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              suppressSortOnNextClickRef.current = true;
              header.getResizeHandler()(e);
              isDraggingRef.current = true;

              const clearDragging = () => {
                isDraggingRef.current = false;
              };

              window.addEventListener('mouseup', clearDragging, { once: true });
            }}
            onTouchStart={(e) => {
              suppressSortOnNextClickRef.current = true;
              header.getResizeHandler()(e);
              isDraggingRef.current = true;

              const clearDragging = () => {
                isDraggingRef.current = false;
              };

              window.addEventListener('touchend', clearDragging, { once: true });
              window.addEventListener('touchcancel', clearDragging, { once: true });
            }}
          >
            <div className="bar"></div>
          </div>
        )}
      </TableCell>
      {isFilterable && floatOpen && isPresent(filterOptions) && isPresent(filterMessages) && (
        <FloatingPortal>
          <TableHeaderFilterFloating
            options={filterOptions}
            messages={filterMessages}
            title={header.column.columnDef.header as string}
            ref={refs.setFloating}
            selected={selectedFilters()}
            boxProps={{
              ...getFloatingProps({
                style: floatingStyles,
              }),
            }}
            onChange={(newSelection) => {
              header.column.setFilterValue(newSelection);
              setFloatOpen(false);
            }}
          />
        </FloatingPortal>
      )}
    </>
  );
};
