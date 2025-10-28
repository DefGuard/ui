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
  type ReactElement,
  type RefObject,
  useMemo,
  useRef,
} from 'react';
import { isPresent } from '../../../utils/isPresent';
import { TableExpandedRowHeader } from '../TableExpandedRowHeader/TableExpandedRowHeader';
import { TableHeader } from '../TableHeader/TableHeader';
import { TableHeaderCell } from '../TableHeaderCell/TableHeaderCell';
import { TableRowContainer } from '../TableRowContainer/TableRowContainer';

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
  ) => ReactElement;
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

  const gridColsDef = useMemo(() => {
    const colsLength = table.getAllFlatColumns().length;
    return range(colsLength)
      .map((index) => `var(--grid-column-${index})`)
      .join(' ');
  }, [table.getAllFlatColumns]);

  // map column sizes into css variables
  const gridColsSize = useMemo(() => {
    const cols = table.getAllFlatColumns();
    const res: Record<string, string> = {};
    for (const col of cols) {
      const key = `--grid-column-${col.getIndex()}`;
      const size = col.getSize();
      //@ts-expect-error
      if (col.columnDef.meta?.flex) {
        res[key] = '1fr';
      } else {
        res[key] = `${size}px`;
      }
    }
    return res;
  }, [table.getAllFlatColumns]);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 48,
    getScrollElement: () => scrollParentRef.current,
    overscan: 8,
    paddingStart: tableHeaderHeight,
  });

  return (
    <div
      className={clsx('table', className)}
      style={{
        ...gridColsSize,
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
          width: '100%',
        }}
      >
        <TableHeader
          style={{
            ...gridColsSize,
            gridTemplateColumns: gridColsDef,
          }}
        >
          {table.getHeaderGroups()[0].headers.map((header) => (
            <TableHeaderCell header={header} key={header.id} />
          ))}
        </TableHeader>
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const row = rows[virtualRow.index];
          const isExpanded = row.getIsExpanded();
          const isLast = row.index === rows.length - 1;
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
                width: '100%',
              }}
            >
              <TableRowContainer
                className={clsx({
                  last: isLast && !isExpanded,
                })}
                style={{
                  gridTemplateColumns: gridColsDef,
                }}
              >
                {row.getAllCells().map((cell) => (
                  <Fragment key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Fragment>
                ))}
              </TableRowContainer>
              {isExpanded && isPresent(expandedHeaders) && (
                <TableExpandedRowHeader
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
