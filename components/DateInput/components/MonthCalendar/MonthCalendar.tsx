import './style.scss';
import type { Dayjs } from 'dayjs';
import { useMemo } from 'react';
import { isPresent } from '../../../../utils/isPresent';
import { Select } from '../../../Select/Select';
import {
  buildMonthGrid,
  calendarWeekdays,
  monthToOption,
  yearToOption,
} from '../../helpers';
import type { DayButtonVariant, MonthCalendarProps } from '../../types';
import { DayButton } from '../DayButton/DayButton';

export const MonthCalendar = ({
  month,
  onMonthChange,
  rangeStart,
  rangeEnd,
  onDayClick,
  monthOptions,
  yearOptions,
}: MonthCalendarProps) => {
  const weekdays = calendarWeekdays();
  const days = useMemo(() => buildMonthGrid(month), [month]);

  const hasRange =
    isPresent(rangeStart) && isPresent(rangeEnd) && !rangeStart.isSame(rangeEnd, 'day');

  const dayVariant = (day: Dayjs): DayButtonVariant => {
    const isStart = isPresent(rangeStart) && day.isSame(rangeStart, 'day');
    const isEnd = isPresent(rangeEnd) && day.isSame(rangeEnd, 'day');
    if (hasRange && isStart) return 'range-start';
    if (hasRange && isEnd) return 'range-end';
    if (isStart || isEnd) return 'selected';
    if (
      isPresent(rangeStart) &&
      isPresent(rangeEnd) &&
      day.isBetween(rangeStart, rangeEnd, 'day', '()')
    ) {
      return 'in-range';
    }
    return 'default';
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <Select
          options={monthOptions}
          value={monthToOption(month.month())}
          onChange={(option) => {
            onMonthChange(month.month(option.value));
          }}
        />
        <Select
          options={yearOptions}
          value={yearToOption(month.year())}
          onChange={(option) => {
            onMonthChange(month.year(option.value));
          }}
        />
      </div>
      <div className="week">
        <div className="weekdays">
          {weekdays.map((weekday) => (
            <span className="weekday" key={weekday}>
              {weekday}
            </span>
          ))}
        </div>
        <div className="days">
          {days.map((day) => (
            <DayButton
              key={day.format('YYYY-MM-DD')}
              day={day}
              onClick={onDayClick}
              variant={dayVariant(day)}
              today={day.isToday()}
              outside={!day.isSame(month, 'month')}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
