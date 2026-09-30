import type { FocusEventHandler } from 'react';

export interface MultiSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  error?: string;
  label?: string;
  helper?: string;
  testId?: string;
  validateValue?: (value: string) => boolean;
  onInputChange?: (value: string) => void;
}
