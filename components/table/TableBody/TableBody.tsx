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
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { useInView } from 'react-intersection-observer';
import { isPresent } from '../../../utils/isPresent';
import { Checkbox } from '../../Checkbox/Checkbox';
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
      if (inView && isPresent(onNextPage)) {
        onNextPage();
      }
    },
  });

  const { rows } = table.getRowModel();
  const scrollParentRef = useRef<HTMLDivElement>(null);
  const tableVirtualBodyRef = useRef<HTMLDivElement>(null);
  const hasAppliedInitialFlexSizing = useRef(false);
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
  }, [table]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: needs to recalculate on sizing changes
  const columnSizeVars = useMemo(() => {
    const headers = table.getFlatHeaders();
    const colSizes: { [key: string]: number } = {};
    const canRowsExpand = table.options.enableExpanding;
    const canRowsSelect = table.options.enableRowSelection;
    // assign static sizing to extra columns at the start of the row
    // in the same order as they are rendered: selection -> expand -> data columns
    let iterIndex = 0;
    let cumulativeStickyOffset = 0;
    if (canRowsSelect) {
      colSizes['--selection-sticky-offset'] = cumulativeStickyOffset;
      colSizes[`--col-${iterIndex}-size`] = tableActionColumnSize;
      cumulativeStickyOffset += tableActionColumnSize;
      iterIndex += 1;
    }
    if (canRowsExpand) {
      colSizes['--expand-sticky-offset'] = cumulativeStickyOffset;
      colSizes[`--col-${iterIndex}-size`] = tableActionColumnSize;
      cumulativeStickyOffset += tableActionColumnSize;
      iterIndex += 1;
    }
    // Data columns - sticky ones use the cumulative offset
    for (const header of headers) {
      const isSticky = header.column.columnDef.meta?.sticky ?? false;
      colSizes[`--col-${iterIndex}-size`] = header.column.getSize();
      colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
      // Calculate sticky offset for this column
      if (isSticky) {
        colSizes[`--col-${header.column.id}-sticky-left-offset`] = cumulativeStickyOffset;
        cumulativeStickyOffset += header.column.getSize();
      }
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

  useEffect(() => {
    if (hasAppliedInitialFlexSizing.current) return;
    let mounted = true;
    let frame = 0;
    let attempts = 0;

    const applyInitialFlexSizing = () => {
      if (!mounted) return;
      const width = tableVirtualBodyRef.current?.clientWidth ?? 0;
      if (!width) {
        if (attempts < 10 && mounted) {
          attempts += 1;
          frame = requestAnimationFrame(applyInitialFlexSizing);
        }
        return;
      }

      const columns = table.getVisibleLeafColumns();
      const flexColumns = columns.filter((column) => column.columnDef.meta?.flex);

      hasAppliedInitialFlexSizing.current = true;
      if (!flexColumns.length) return;

      const actionColumnsWidth =
        (table.options.enableExpanding ? tableActionColumnSize : 0) +
        (table.options.enableRowSelection ? tableActionColumnSize : 0);

      let fixedColumnsWidth = 0;
      let flexBaseWidth = 0;
      for (const column of columns) {
        if (column.columnDef.meta?.flex) {
          flexBaseWidth += column.getSize();
        } else {
          fixedColumnsWidth += column.getSize();
        }
      }

      const availableFlexWidth = width - actionColumnsWidth - fixedColumnsWidth;
      if (availableFlexWidth <= flexBaseWidth) return;

      const totalFlexBase = flexBaseWidth || flexColumns.length;
      if (!mounted) return;
      table.setColumnSizing((prev) => {
        const next = { ...prev };
        let changed = false;

        for (const column of flexColumns) {
          const baseSize = flexBaseWidth ? column.getSize() : 1;
          const nextSize = Math.round((baseSize / totalFlexBase) * availableFlexWidth);
          const minSize = column.columnDef.minSize ?? 20;
          const maxSize = column.columnDef.maxSize;
          const clampedSize = Math.max(
            minSize,
            isPresent(maxSize) ? Math.min(maxSize, nextSize) : nextSize,
          );

          if (next[column.id] !== clampedSize) {
            next[column.id] = clampedSize;
            changed = true;
          }
        }

        return changed ? next : prev;
      });
    };

    frame = requestAnimationFrame(applyInitialFlexSizing);
    return () => {
      mounted = false;
      cancelAnimationFrame(frame);
    };
  }, [table]);

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
        ref={tableVirtualBodyRef}
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: 'relative',
          minWidth: tableWidth,
        }}
      >
        <TableHeader>
          {table.options.enableRowSelection && (
            <TableCell
              sticky
              className="header-cell"
              alignContent="center"
              noBorder
              style={{
                width: 'calc(var(--col-0-size) * 1px)',
                left: 'calc(var(--selection-sticky-offset) * 1px - var(--table-inline-padding))',
              }}
            >
              <Checkbox
                active={table.getIsAllRowsSelected()}
                onClick={() => {
                  table.toggleAllRowsSelected();
                }}
              />
            </TableCell>
          )}
          {table.options.enableExpanding && (
            <TableCell
              sticky
              className="header-cell table-expand-cell"
              noPadding
              empty
              style={{
                width: `calc(var(--col-${canSelect ? 1 : 0}-size) * 1px)`,
                left: 'calc(var(--expand-sticky-offset) * 1px - var(--table-inline-padding))',
              }}
            />
          )}
          {table.getHeaderGroups()[0].headers.map((header) => {
            return <TableHeaderCell header={header} key={header.id} />;
          })}
        </TableHeader>
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const row = rows[virtualRow.index];
          const isExpanded = row.getIsExpanded() && row.getCanExpand();
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
                {table.options.enableExpanding && (
                  <TableExpandCell row={row} hasSelectionColumn={canSelect} />
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
