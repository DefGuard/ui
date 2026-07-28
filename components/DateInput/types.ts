import type { Dayjs } from 'dayjs';
import type { HTMLAttributes, HTMLProps, Ref } from 'react';
import type { FieldSize } from '../FieldBox/types';
import type { SelectOption } from '../Select/types';

export type DateRange = {
  start: Date;
  end: Date;
};

export type DateRangeSegment = 'start' | 'end';

export type DayButtonVariant =
  | 'default'
  | 'selected'
  | 'range-start'
  | 'range-end'
  | 'in-range';

export type DateRangePreview = {
  start: Date | null;
  end: Date | null;
  active: DateRangeSegment;
};

export type DateRangeDisplay = {
  start: Date | null;
  end: Date | null;
  active: DateRangeSegment | null;
};

export type DateInputLabels = {
  start: string;
  end: string;
  reset: string;
  cancel: string;
  apply: string;
};

export type DateInputProps = {
  value: DateRange | null;
  onChange: (value: DateRange | null) => void;
  labels: DateInputLabels;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  testId?: string;
  size?: FieldSize;
};

export type DateInputFieldProps = HTMLAttributes<HTMLDivElement> & {
  displayed: DateRangeDisplay | null;
  labels: DateInputLabels;
  placeholder?: string;
  disabled?: boolean;
  testId?: string;
  size?: FieldSize;
  open?: boolean;
  boxRef?: Ref<HTMLDivElement>;
};

export type DateInputFloatingProps = {
  value: DateRange | null;
  labels: DateInputLabels;
  ref?: Ref<HTMLDivElement>;
  boxProps?: HTMLProps<HTMLDivElement>;
  onPreviewChange: (preview: DateRangePreview) => void;
  onApply: (value: DateRange | null) => void;
  onCancel: () => void;
};

export type MonthCalendarProps = {
  month: Dayjs;
  onMonthChange: (month: Dayjs) => void;
  rangeStart: Dayjs | null;
  rangeEnd: Dayjs | null;
  onDayClick: (day: Dayjs) => void;
  monthOptions: SelectOption<number>[];
  yearOptions: SelectOption<number>[];
};

export type DayButtonProps = {
  day: Dayjs;
  onClick: (day: Dayjs) => void;
  variant?: DayButtonVariant;
  today?: boolean;
  outside?: boolean;
};
