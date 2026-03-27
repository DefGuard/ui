import type { FocusEventHandler, Ref } from 'react';
import type { AvailableLocationIP } from '../../../api/types';
import type { TranslationKey } from '../../types';

type TranslationParams = Record<string, unknown>;

export interface SuggestedIPInputProps {
  ref?: Ref<HTMLInputElement>;
  data: Omit<AvailableLocationIP, 'ip'>;
  value: string | null;
  onChange: (value: string | null) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  error?: string;
  label?: TranslationKey;
  labelArgs?: TranslationParams;
  required?: boolean;
  testId?: string;
  loading?: boolean;
}
