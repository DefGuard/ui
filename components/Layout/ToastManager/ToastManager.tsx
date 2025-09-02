import './style.scss';

import { reverse } from 'lodash-es';
import { useMemo } from 'react';
import ReactDOM from 'react-dom';
import { useToastsStore } from '../../../hooks/toasts/useToastStore';
import { Toast } from './Toast/Toast';

export const ToastManager = () => {
  const element = useMemo(() => document.getElementById('toasts-root'), []);
  const toasts = useToastsStore((store) => store.toasts);
  if (element === null) return null;
  return ReactDOM.createPortal(
    reverse([...toasts]).map((toast) => {
      if (toast.customComponent) {
        const { customComponent: Component, id, ...rest } = toast;
        return <Component key={id} id={id} {...rest} />;
      } else {
        return <Toast key={toast.id} data={toast} />;
      }
    }),
    element,
  );
};
