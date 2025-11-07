export type SelectionSectionKey = string | number;

export type SelectionSectionOption<T> = {
  id: T;
  label: string;
  meta?: unknown;
  // if there is a need to search in more then label itself
  searchFields?: string[];
};

export interface SelectionSectionProps<T extends SelectionSectionKey> {
  selection: Set<T>;
  onChange: (value: Set<T>) => void;
  options: SelectionSectionOption<T>[];
  selectedOnlyText?: string;
  itemHeight?: number;
  itemGap?: number;
  selectAllText?: string;
  searchPlaceholder?: string;
  className?: string;
  id?: string;
}
