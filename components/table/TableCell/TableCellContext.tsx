import type { Cell } from '@tanstack/react-table';
import { createContext } from 'react';

// biome-ignore lint/suspicious/noExplicitAny: doesn't matter
export const TableCellContext = createContext<Cell<any, unknown> | null>(null);
