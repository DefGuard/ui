import { clone } from 'lodash-es';
import type { ComponentType } from 'react';
import { createWithEqualityFn } from 'zustand/traditional';
import type { ToastOptions } from '../../components/Layout/ToastManager/Toast/types';

// how many toast's can be shown at once regardless of what the toast is
const toastLimit = 5;

export type ToastManagerItem = ToastOptions & {
  customComponent?: ComponentType<ToastOptions>;
};

export interface ToastStore {
  toastLastId: number;
  toasts: ToastManagerItem[];
  addToast: (props: Omit<ToastManagerItem, 'id'>) => void;
  removeToast: (id: number) => void;
}

export const useToastsStore = createWithEqualityFn<ToastStore>(
  (set) => ({
    toastLastId: 0,
    toasts: [],
    addToast: (data) =>
      set((state) => {
        const newId = state.toastLastId + 1;
        const newToast = { ...data, id: newId };
        const originalData = clone(state.toasts);
        const sliceValue = toastLimit * -1;
        return { toasts: [...originalData, newToast].slice(sliceValue) };
      }),
    removeToast: (id) =>
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
  }),
  Object.is,
);
