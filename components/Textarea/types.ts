import type { FocusEventHandler, HTMLInputAutoCompleteAttribute, Ref } from 'react';

export interface TextareaProps {
  value: string | null;
  label?: string;
  helper?: string;
  disabled?: boolean;
  error?: string;
  ref?: Ref<HTMLTextAreaElement>;
  notNull?: boolean;
  required?: boolean;
  placeholder?: string;
  maxHeight?: number;
  minHeight?: number;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
  onChange: (value: string | null) => void;
}
