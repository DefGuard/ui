import type { FocusEventHandler, Ref } from 'react';
import type { AvailableLocationIP } from '../../../api/types';

export interface SuggestedIPInputProps {
  ref?: Ref<HTMLInputElement>;
  data: AvailableLocationIP;
  value: string | null;
  onChange: (value: string | null) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  error?: string;
  label?: string;
  required?: boolean;
  testId?: string;
}
