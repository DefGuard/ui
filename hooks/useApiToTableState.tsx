import type { SortDirection, SortingState } from '@tanstack/react-table';
import { useMemo } from 'react';
import type { PaginationParams, RequestSortParams } from '../../api/types';
import { isPresent } from '../utils/isPresent';

type Props<T> = RequestSortParams<T> &
  PaginationParams & {
    defaultSortingKey: keyof T;
  };

const apiToTableSortDirection = (direction: SortDirection): boolean =>
  direction === 'desc';

export const useApiToTableState = <T,>({
  sort_by,
  sort_order,
  defaultSortingKey,
}: Props<T>) => {
  const sortingState = useMemo((): SortingState => {
    if (isPresent(sort_by) && isPresent(sort_order)) {
      return [
        {
          desc: apiToTableSortDirection(sort_order),
          id: String(sort_by),
        },
      ];
    }
    return [
      {
        id: String(defaultSortingKey),
        desc: false,
      },
    ];
  }, [defaultSortingKey, sort_by, sort_order]);

  return {
    sortingState,
  };
};
