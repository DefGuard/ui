import { ToastType } from '../../components/Layout/ToastManager/Toast/types';
import { useToastsStore } from './useToastStore';

type ToastConfig = {
  subMessage?: string;
  lifetime?: number;
};

type ToastHookMethod = (message: string, config?: ToastConfig) => void;

type UseToaster = {
  success: ToastHookMethod;
  info: ToastHookMethod;
  warning: ToastHookMethod;
  error: ToastHookMethod;
};

export const useToaster = (): UseToaster => {
  const addToast = useToastsStore((store) => store.addToast);

  const success: ToastHookMethod = (message, config) =>
    addToast({
      type: ToastType.SUCCESS,
      message,
      subMessage: config?.subMessage,
      lifetime: config?.lifetime,
    });

  const info: ToastHookMethod = (message, config) =>
    addToast({
      type: ToastType.INFO,
      message,
      subMessage: config?.subMessage,
      lifetime: config?.lifetime,
    });

  const warning: ToastHookMethod = (message, config) =>
    addToast({
      type: ToastType.WARNING,
      message,
      subMessage: config?.subMessage,
      lifetime: config?.lifetime,
    });

  const error: ToastHookMethod = (message, config) =>
    addToast({
      type: ToastType.ERROR,
      message,
      subMessage: config?.subMessage,
      lifetime: config?.lifetime,
    });

  return { success, info, warning, error };
};
