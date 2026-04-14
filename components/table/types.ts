import type { SelectionOption } from '../../../components/SelectionSection/type';

export type TableFilterMessages = {
  searchPlaceholder: string;
  clearButton: string;
  applyButton: string;
  emptyState: string;
};

// Extend TanStack Table's ColumnMeta with custom fields
declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    flex?: boolean;
    filterOptions?: SelectionOption<string | number>[];
    sticky?: boolean;
  }
}
