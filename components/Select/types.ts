import type { FieldBoxProps } from '../FieldBox/types';

export type SelectOption<T> = {
  key: string | number;
  label: string;
  value: T;
  meta?: unknown;
};

export type SelectSingleValue<T> = SelectOption<T> | null;
export type SelectMultiValue<T> = readonly SelectOption<T>[];

type BaseProps<T> = {
  options: readonly SelectOption<T>[];
  testId?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
} & Pick<FieldBoxProps, 'size'>;

export type SelectSingleProps<T> = BaseProps<T> & {
  multiple?: false | undefined;
  value: SelectSingleValue<T>;
  defaultValue?: SelectSingleValue<T>;
  onChange: (v: SelectSingleValue<T>) => void;
};

export type SelectMultiProps<T> = BaseProps<T> & {
  multiple: true;
  value: SelectMultiValue<T>;
  defaultValue?: SelectMultiValue<T>;
  onChange: (v: SelectMultiValue<T>) => void;
};

export type SelectProps<T, M extends boolean = false> = M extends true
  ? SelectMultiProps<T>
  : SelectSingleProps<T>;
