import type { TextareaHTMLAttributes } from 'react';

export type TextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'onChange' | 'value' | 'disabled'
> & {
  value: string;
  onChange: (value: string) => void;
  errorMessage?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
};
