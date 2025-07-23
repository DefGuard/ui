import { sort } from 'radash';
import type { ComponentType } from 'react';
import { createWithEqualityFn } from 'zustand/traditional';

import type { ToastOptions } from '../../components/Layout/ToastManager/Toast/types';

export type ToastManagerItem = ToastOptions & {
  customComponent?: ComponentType<ToastOptions>;
};

export interface ToastStore {
  toasts: ToastManagerItem[];
  addToast: (props: Omit<ToastManagerItem, 'id'>) => void;
  removeToast: (id: number) => void;
}

export const useToastsStore = createWithEqualityFn<ToastStore>(
  (set) => ({
    toasts: [],
    addToast: (data) =>
      set((state) => {
        const nextId = sort(state.toasts, (t) => t.id, true)[0]?.id + 1 || 1;
        const toast: ToastOptions = { ...data, id: nextId };
        return { toasts: [...state.toasts, toast] };
      }),
    removeToast: (id) =>
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
  }),
  Object.is,
);
