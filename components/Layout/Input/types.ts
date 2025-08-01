import type { HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

export type InputFloatingErrors = {
  title: string;
  errorMessages: string[];
};

export interface InputProps extends HTMLMotionProps<'input'> {
  labelExtras?: ReactNode;
  required?: boolean;
  invalid?: boolean;
  label?: string | ReactNode;
  disableOuterLabelColon?: boolean;
  errorMessage?: string;
  floatingErrors?: InputFloatingErrors;
  disposable?: boolean;
  disposeHandler?: (v?: unknown) => void;
}
