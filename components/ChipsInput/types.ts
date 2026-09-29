import type { FocusEventHandler } from 'react';

export interface ChipsInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  error?: string;
  label?: string;
  helper?: string;
  testId?: string;
  validate?: (value: string) => string | undefined;
  onInputErrorChange?: (error?: string) => void;
}
