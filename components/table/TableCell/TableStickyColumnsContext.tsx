import { createContext } from 'react';

export const TableStickyColumnsContext = createContext<Record<string, 'left' | 'right'>>(
  {},
);
