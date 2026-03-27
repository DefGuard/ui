import type { FocusEventHandler, HTMLInputAutoCompleteAttribute, Ref } from 'react';
import type { TranslationKey } from '../../types';

type TranslationParams = Record<string, unknown>;

export interface TextareaProps {
  value: string | null;
  label?: TranslationKey;
  labelArgs?: TranslationParams;
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
