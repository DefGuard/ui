import { flexRender, type Row, type Table } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import './style.scss';
import { useDebounce, useWindowSize } from '@uidotdev/usehooks';
import clsx from 'clsx';
import { range } from 'lodash-es';
import {
  type CSSProperties,
  Fragment,
  type HTMLProps,
  type ReactNode,
  type RefObject,
  useMemo,
  useRef,
} from 'react';
import { isPresent } from '../../../utils/isPresent';
import { tableActionColumnSize } from '../consts';
import { TableCell } from '../TableCell/TableCell';
import { TableCellContext } from '../TableCell/TableCellContext';
import { TableExpandCell } from '../TableExpandCell/TableExpandCell';
import { TableExpandedRowHeader } from '../TableExpandedRowHeader/TableExpandedRowHeader';
import { TableHeader } from '../TableHeader/TableHeader';
import { TableHeaderCell } from '../TableHeaderCell/TableHeaderCell';
import { TableRowContainer } from '../TableRowContainer/TableRowContainer';
import { TableSelectionCell } from '../TableSelectionCell/TableSelectionCell';

const tableHeaderHeight = 36;
const tableRowHeight = 48;

const minimalTableHeight = tableHeaderHeight + tableRowHeight * 8;

const useTableHeight = (tableRef: RefObject<HTMLDivElement | null>) => {
  const windowSizing = useWindowSize();
  const windowHeight = useDebounce(windowSizing.height, 150);

  const maxHeight = useMemo(() => {
    if (!windowHeight || !tableRef.current) return null;
    const rect = tableRef.current.getBoundingClientRect();
    const height = windowHeight - rect.top;
    return Math.max(minimalTableHeight, height);
  }, [tableRef.current, windowHeight]);

  return maxHeight;
};

type Props<TData> = {
  table: Table<TData>;
  expandedHeaders?: string[];
  renderExpandedRow?: (
    row: Row<TData>,
    rowStyle: CSSProperties,
    isLast?: boolean,
  ) => ReactNode;
} & HTMLProps<HTMLDivElement>;

export const TableBody = <T extends object>({
  table,
  className,
  expandedHeaders,
  renderExpandedRow,
  ...props
}: Props<T>) => {
  const { rows } = table.getRowModel();
  const scrollParentRef = useRef<HTMLDivElement>(null);
  const maxTableHeight = useTableHeight(scrollParentRef);

  const canExpand = table.options.enableExpanding;
  const canSelect = table.options.enableRowSelection;

  const gridColsDef = useMemo(() => {
    let colsLength = table.getAllFlatColumns().length;
    const canRowsExpand = table.options.enableExpanding;
    const canRowsSelect = table.options.enableRowSelection;
    if (canRowsExpand) {
      colsLength++;
    }
    if (canRowsSelect) {
      colsLength++;
    }
    return range(colsLength)
      .map((index) => `var(--grid-column-${index})`)
      .join(' ');
  }, [
    table.getAllFlatColumns,
    table.options.enableExpanding,
    table.options.enableRowSelection,
  ]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: needs to recalculate on sizing changes
  const columnSizeVars = useMemo(() => {
    const headers = table.getFlatHeaders();
    const colSizes: { [key: string]: number } = {};
    for (const header of headers) {
      // cuz we only support flat headers we only need columns
      colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
    }
    return colSizes;
  }, [
    table.getState().columnSizingInfo,
    table.getState().columnSizing,
    table.getFlatHeaders,
  ]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: needs to be like this
  const tableWidth = useMemo(() => {
    let tableSize = table.getTotalSize();
    if (canExpand) {
      tableSize += tableActionColumnSize;
    }
    if (canSelect) {
      tableSize += tableActionColumnSize;
    }
    return tableSize;
  }, [canExpand, canSelect, table.getTotalSize()]);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 48,
    getScrollElement: () => scrollParentRef.current,
    overscan: 8,
    // paddingStart: tableHeaderHeight,
    paddingEnd: 20 + 36,
  });

  return (
    <div
      className={clsx('table', className)}
      style={{
        ...columnSizeVars,
        maxHeight: maxTableHeight ?? undefined,
        overflow: 'auto',
      }}
      ref={scrollParentRef}
      {...props}
    >
      <div
        className="table-virtual-body"
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: 'relative',
          width: tableWidth,
        }}
      >
        <TableHeader>
          {table.options.enableRowSelection && (
            <TableSelectionCell
              selected={table.getIsAllRowsSelected()}
              onClick={() => {
                table.toggleAllRowsSelected();
              }}
            />
          )}
          {table.options.enableExpanding && (
            <TableCell style={{ width: tableActionColumnSize }} empty />
          )}
          {table.getHeaderGroups()[0].headers.map((header) => (
            <TableHeaderCell header={header} key={header.id} />
          ))}
        </TableHeader>
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const row = rows[virtualRow.index];
          const canExpand = row.getCanExpand();
          const isExpanded = row.getIsExpanded();
          const canSelect = row.getCanSelect();
          const isLast = virtualRow.index === rows.length - 1;
          return (
            <div
              ref={(node) => rowVirtualizer.measureElement(node)}
              data-index={virtualRow.index}
              className={clsx('virtual-row', {
                expanded: isExpanded && !isLast,
              })}
              key={row.id}
              style={{
                position: 'absolute',
                transform: `translateY(${virtualRow.start}px)`,
                width: tableWidth,
              }}
            >
              <TableRowContainer
                className={clsx({
                  last: isLast && !isExpanded,
                })}
              >
                {canSelect && (
                  <TableSelectionCell
                    selected={row.getIsSelected()}
                    onClick={() => {
                      row.toggleSelected();
                    }}
                  />
                )}
                {canExpand && <TableExpandCell row={row} />}
                {!canExpand && table.options.enableExpanding && (
                  <TableCell style={{ width: tableActionColumnSize }} empty />
                )}
                {row.getAllCells().map((cell) => (
                  <Fragment key={cell.id}>
                    <TableCellContext value={cell}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCellContext>
                  </Fragment>
                ))}
              </TableRowContainer>
              {isExpanded && isPresent(expandedHeaders) && (
                <TableExpandedRowHeader
                  canExpand={table.options.enableExpanding as boolean}
                  canSelect={table.options.enableRowSelection as boolean}
                  headersData={expandedHeaders}
                  style={{
                    gridTemplateColumns: gridColsDef,
                  }}
                />
              )}
              {isExpanded &&
                isPresent(renderExpandedRow) &&
                renderExpandedRow(row, { gridTemplateColumns: gridColsDef }, isLast)}
            </div>
          );
        })}
      </div>
    </div>
  );
};
