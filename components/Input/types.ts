import type {
  HTMLAttributes,
  HTMLInputAutoCompleteAttribute,
  MouseEventHandler,
  Ref,
} from 'react';
import type { FieldBoxProps, FieldSize } from '../FieldBox/types';

type TranslationKey = keyof typeof import('../../../../paraglide/messages').m;
type TranslationParams = Record<string, unknown>;

export type InputProps = {
  value: string | null | number;
  size?: FieldSize;
  type?: 'password' | 'text' | 'search' | 'number';
  ref?: Ref<HTMLInputElement>;
  error?: string | null;
  name?: string;
  label?: TranslationKey;
  labelArgs?: TranslationParams;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  onChange?: (value: string | number | null) => void;
  boxProps?: Partial<FieldBoxProps>;
  autocomplete?: HTMLInputAutoCompleteAttribute;
  testId?: string;
  notNull?: boolean;
} & Pick<HTMLAttributes<HTMLInputElement>, 'onBlur' | 'onFocus'>;

export type FormInputProps = Pick<
  InputProps,
  | 'name'
  | 'placeholder'
  | 'disabled'
  | 'required'
  | 'label'
  | 'labelArgs'
  | 'autocomplete'
  | 'size'
  | 'type'
  | 'notNull'
> & {
  mapError?: (error: string) => string | undefined;
  onDismiss?: MouseEventHandler<HTMLButtonElement>;
};
