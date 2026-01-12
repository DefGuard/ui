import type { FocusEventHandler, HTMLInputAutoCompleteAttribute, Ref } from 'react';

export interface TextareaProps {
  value: string | null;
  label?: string;
  disabled?: boolean;
  error?: string;
  ref?: Ref<HTMLTextAreaElement>;
  notNull?: boolean;
  placeholder?: string;
  maxHeight?: number;
  minHeight?: number;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
  onChange: (value: string | null) => void;
}
