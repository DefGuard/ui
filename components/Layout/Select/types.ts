import { Key } from 'react';

export interface SelectOption<T> {
  value: T;
  label: string;
  disabled?: boolean;
  key: Key;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta?: any;
}

export enum SelectSizeVariant {
  STANDARD = 'STANDARD',
  SMALL = 'SMALL',
}

export type SelectSelectedValue = {
  key: string | number;
  displayValue: string;
};

export interface SelectProps<T> {
  options: SelectOption<T>[];
  onChangeSingle?: (result: T) => void;
  onChangeArray?: (result: T[]) => void;
  // needs to be provided when T is an object, should return value that is unique so option can be indentify
  identify?: (val: T) => string | number;
  selected?: T | T[];
  // used to filter out values in form, can be used to trigger side effects
  onRemove?: (removedValue: T, selected: T[]) => T[] | void;
  // optional, designed to use when API calls are needed in order to search for new options
  onSearch?: (value?: string) => void;
  // used before onSearch fires to filter out options that are present it is requied if searchable flag is present
  searchFilter?: (searchValue: string, options: SelectOption<T>[]) => SelectOption<T>[];
  onCreate?: () => void;
  // Function that translates value into displayable object for rendering tags inside multi select.
  renderSelected?: (value: T) => SelectSelectedValue;
  invalid?: boolean;
  errorMessage?: string;
  searchMinLength?: number;
  searchDebounce?: number;
  searchable?: boolean;
  placeholder?: string;
  loading?: boolean;
  disabled?: boolean;
  label?: string;
  disableLabelColon?: boolean;
  inForm?: boolean;
  disableOpen?: boolean;
  sizeVariant?: SelectSizeVariant;
  addOptionLabel?: string;
  'data-testid'?: string;
}

export type SelectFloatingOption<T> = SelectOption<T> & {
  selected: boolean;
};
