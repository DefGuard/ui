export enum ToastType {
  INFO = 'info',
  WARNING = 'warning',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface ToastProps {
  data: ToastOptions;
}

export interface ToastOptions {
  id: number;
  message: string;
  type: ToastType;
  subMessage?: string;
  // int in seconds, defaults to 5 if not set, set to negative to make toast permanent until clicked by user
  lifetime?: number;
}
