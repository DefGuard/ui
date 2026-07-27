import dayjs, { type Dayjs } from 'dayjs';
import type { SelectOption } from '../Select/types';

const daysInWeek = 7;
const weeksInGrid = 6;
const yearSpan = 10;
const hoursInDay = 24;
const dateFormat = 'YYYY-MM-DD';

export const timeFormat = 'HH:mm';
export const dayStartTime = '00:00';

export const calendarWeekdays = (): string[] => {
  const weekStart = dayjs().startOf('isoWeek');
  return Array.from({ length: daysInWeek }, (_, index) =>
    weekStart.add(index, 'day').format('ddd'),
  );
};

export const buildMonthGrid = (month: Dayjs): Dayjs[] => {
  const gridStart = month.startOf('month').startOf('isoWeek');
  return Array.from({ length: weeksInGrid * daysInWeek }, (_, index) =>
    gridStart.add(index, 'day'),
  );
};

export const monthToOption = (month: number): SelectOption<number> => ({
  key: month,
  label: dayjs.months()[month],
  value: month,
});

export const monthSelectOptions = (): SelectOption<number>[] =>
  dayjs.months().map((_, index) => monthToOption(index));

export const yearToOption = (year: number): SelectOption<number> => ({
  key: year,
  label: year.toString(),
  value: year,
});

export const yearSelectOptions = (): SelectOption<number>[] => {
  const firstYear = dayjs().year() - yearSpan;
  return Array.from({ length: yearSpan * 2 + 1 }, (_, index) =>
    yearToOption(firstYear + index),
  );
};

export const timeToOption = (time: string): SelectOption<string> => ({
  key: time,
  label: time,
  value: time,
});

export const timeSelectOptions = (): SelectOption<string>[] => {
  const dayStart = dayjs().startOf('day');
  return Array.from({ length: hoursInDay }, (_, index) =>
    timeToOption(dayStart.add(index, 'hour').format(timeFormat)),
  );
};

export const applyTime = (date: Dayjs, time: string): Dayjs =>
  dayjs(`${date.format(dateFormat)} ${time}`, `${dateFormat} ${timeFormat}`);
