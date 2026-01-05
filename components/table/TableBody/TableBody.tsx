import { flexRender, type Row, type Table } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import Skeleton from 'react-loading-skeleton';
import './style.scss';
import { useDebounce, useWindowSize } from '@uidotdev/usehooks';
import clsx from 'clsx';
import { range } from 'lodash-es';
import {
  Fragment,
  type HTMLProps,
  type ReactNode,
  type RefObject,
  useMemo,
  useRef,
} from 'react';
import { useInView } from 'react-intersection-observer';
import { isPresent } from '../../../utils/isPresent';
import { tableActionColumnSize } from '../consts';
import { TableCell } from '../TableCell/TableCell';
import { TableCellContext } from '../TableCell/TableCellContext';
import { TableExpandCell } from '../TableExpandCell/TableExpandCell';
import { TableExpandedRowHeader } from '../TableExpandedRowHeader/TableExpandedRowHeader';
import { TableFlexCell } from '../TableFlexCell/TableFlexCell';
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
  hasNextPage?: boolean;
  loadingNextPage?: boolean;
  expandedHeaders?: string[];
  renderExpandedRow?: (row: Row<TData>, isLast?: boolean) => ReactNode;
  onNextPage?: () => void;
} & HTMLProps<HTMLDivElement>;

export const TableBody = <T extends object>({
  table,
  className,
  expandedHeaders,
  renderExpandedRow,
  hasNextPage = false,
  loadingNextPage = false,
  onNextPage,
  ...props
}: Props<T>) => {
  const { ref: loadMoreRowRef } = useInView({
    threshold: 0.5,
    delay: 500,
    trackVisibility: false,
    onChange: (inView) => {
      console.log('in view capture');
      if (inView && isPresent(onNextPage)) {
        console.log({ loadingNextPage, hasNextPage });
        onNextPage();
      }
    },
  });

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
    const canRowsExpand = table.options.enableExpanding;
    const canRowsSelect = table.options.enableRowSelection;
    // assign static sizing to extra columns at the start of the row
    let iterIndex = 0;
    if (canRowsExpand) {
      colSizes['--col-0-size'] = tableActionColumnSize;
      iterIndex += 1;
    }
    if (canRowsSelect) {
      colSizes[`--col-${iterIndex}-size`] = tableActionColumnSize;
      iterIndex += 1;
    }
    for (const header of headers) {
      colSizes[`--col-${iterIndex}-size`] = header.column.getSize();
      colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
      iterIndex += 1;
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
    return Math.max(tableSize);
  }, [canExpand, canSelect, table.getTotalSize()]);

  const virtualizedPaddingBottom = useMemo(() => {
    let result: number = 20 + tableRowHeight;
    if (hasNextPage) {
      result += tableRowHeight;
    }
    console.log(hasNextPage);
    return result;
  }, [hasNextPage]);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 48,
    getScrollElement: () => scrollParentRef.current,
    overscan: 8,
    // paddingStart: tableHeaderHeight,
    paddingEnd: virtualizedPaddingBottom,
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
          minWidth: tableWidth,
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
          {table.options.enableExpanding && <TableCell empty />}
          {table.getHeaderGroups()[0].headers.map((header) => {
            return <TableHeaderCell header={header} key={header.id} />;
          })}
          <TableFlexCell radius />
        </TableHeader>
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const row = rows[virtualRow.index];
          const isExpanded = row.getIsExpanded();
          const canSelect = row.getCanSelect();
          const isLast = virtualRow.index === rows.length - 1 && !hasNextPage;
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
                minWidth: tableWidth,
                width: '100%',
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
                {table.options.enableExpanding && <TableExpandCell row={row} />}
                {row.getAllCells().map((cell) => (
                  <Fragment key={cell.id}>
                    <TableCellContext value={cell}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCellContext>
                  </Fragment>
                ))}
                <TableFlexCell />
              </TableRowContainer>
              {isExpanded && isPresent(expandedHeaders) && (
                <TableExpandedRowHeader
                  canExpand={table.options.enableExpanding ?? false}
                  canSelect={
                    (table.options.enableRowSelection as boolean | undefined) ?? false
                  }
                  headersData={expandedHeaders}
                  style={{
                    gridTemplateColumns: gridColsDef,
                  }}
                />
              )}
              {isExpanded &&
                isPresent(renderExpandedRow) &&
                renderExpandedRow(row, isLast)}
            </div>
          );
        })}
        {hasNextPage && isPresent(onNextPage) && (
          <div className="load-more-row" ref={loadMoreRowRef}>
            <Skeleton />
          </div>
        )}
      </div>
    </div>
  );
};
