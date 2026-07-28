import './style.scss';
import clsx from 'clsx';
import dayjs, { type Dayjs } from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { isPresent } from '../../../../utils/isPresent';
import { Button } from '../../../Button/Button';
import { Divider } from '../../../Divider/Divider';
import { Select } from '../../../Select/Select';
import {
  applyTime,
  dayStartTime,
  monthSelectOptions,
  timeFormat,
  timeSelectOptions,
  timeToOption,
  yearSelectOptions,
} from '../../helpers';
import type { DateInputFloatingProps, DateRange, DateRangeSegment } from '../../types';
import { MonthCalendar } from '../MonthCalendar/MonthCalendar';

type Draft = {
  start: Dayjs | null;
  end: Dayjs | null;
  startTime: string;
  endTime: string;
};

type Months = {
  left: Dayjs;
  right: Dayjs;
};

const previewDate = (day: Dayjs | null, time: string): Date | null => {
  if (!isPresent(day)) {
    return null;
  }
  return applyTime(day, time).toDate();
};

const activeSegment = (draft: Draft): DateRangeSegment => {
  if (isPresent(draft.start) && !isPresent(draft.end)) {
    return 'end';
  }
  return 'start';
};

const deriveDraft = (value: DateRange | null): Draft => {
  if (!isPresent(value)) {
    return {
      start: null,
      end: null,
      startTime: dayStartTime,
      endTime: dayStartTime,
    };
  }
  const start = dayjs(value.start);
  const end = dayjs(value.end);
  return {
    start: start.startOf('day'),
    end: end.startOf('day'),
    startTime: start.format(timeFormat),
    endTime: end.format(timeFormat),
  };
};

const deriveMonths = (value: DateRange | null): Months => {
  if (!isPresent(value)) {
    const currentMonth = dayjs().startOf('month');
    return { left: currentMonth, right: currentMonth.add(1, 'month') };
  }
  const start = dayjs(value.start).startOf('month');
  const end = dayjs(value.end).startOf('month');
  if (end.isSame(start, 'month')) {
    return { left: start, right: start.add(1, 'month') };
  }
  return { left: start, right: end };
};

export const DateInputFloating = ({
  value,
  labels,
  ref,
  boxProps,
  onPreviewChange,
  onApply,
  onCancel,
}: DateInputFloatingProps) => {
  const monthOptions = useMemo(() => monthSelectOptions(), []);
  const yearOptions = useMemo(() => yearSelectOptions(), []);
  const timeOptions = useMemo(() => timeSelectOptions(), []);

  const [draft, setDraft] = useState<Draft>(() => deriveDraft(value));
  const [months, setMonths] = useState<Months>(() => deriveMonths(value));

  // biome-ignore lint/correctness/useExhaustiveDependencies: sideEffect
  useEffect(() => {
    onPreviewChange({
      start: previewDate(draft.start, draft.startTime),
      end: previewDate(draft.end, draft.endTime),
      active: activeSegment(draft),
    });
  }, [draft]);

  const handleDayClick = (day: Dayjs) => {
    const picked = day.startOf('day');
    setDraft((current) => {
      if (!isPresent(current.start) || isPresent(current.end)) {
        return { ...current, start: picked, end: null };
      }
      if (picked.isBefore(current.start, 'day')) {
        return { ...current, start: picked, end: current.start };
      }
      return { ...current, end: picked };
    });
  };

  const isEmpty = !isPresent(draft.start) && !isPresent(draft.end);
  const isComplete = isPresent(draft.start) && isPresent(draft.end);
  const canApply = isEmpty || isComplete;

  const handleReset = () => {
    setDraft(deriveDraft(null));
  };

  const handleApply = () => {
    if (!isPresent(draft.start) || !isPresent(draft.end)) {
      onApply(null);
      return;
    }
    onApply({
      start: applyTime(draft.start, draft.startTime).toDate(),
      end: applyTime(draft.end, draft.endTime).toDate(),
    });
  };

  return (
    <div
      {...boxProps}
      ref={ref}
      className={clsx('date-input-floating', boxProps?.className)}
    >
      <div className="calendars">
        <div className="calendar-column">
          <MonthCalendar
            month={months.left}
            onMonthChange={(month) => {
              setMonths((current) => ({ ...current, left: month }));
            }}
            rangeStart={draft.start}
            rangeEnd={draft.end}
            onDayClick={handleDayClick}
            monthOptions={monthOptions}
            yearOptions={yearOptions}
          />
          <Select
            label={labels.start}
            options={timeOptions}
            value={timeToOption(draft.startTime)}
            onChange={(option) => {
              setDraft((current) => ({ ...current, startTime: option.value }));
            }}
          />
        </div>
        <div className="calendar-column">
          <MonthCalendar
            month={months.right}
            onMonthChange={(month) => {
              setMonths((current) => ({ ...current, right: month }));
            }}
            rangeStart={draft.start}
            rangeEnd={draft.end}
            onDayClick={handleDayClick}
            monthOptions={monthOptions}
            yearOptions={yearOptions}
          />
          <Select
            label={labels.end}
            options={timeOptions}
            value={timeToOption(draft.endTime)}
            onChange={(option) => {
              setDraft((current) => ({ ...current, endTime: option.value }));
            }}
          />
        </div>
      </div>
      <Divider />
      <div className="controls">
        <Button variant="outlined" text={labels.reset} onClick={handleReset} />
        <div className="controls-right">
          <Button variant="secondary" text={labels.cancel} onClick={onCancel} />
          <Button
            variant="primary"
            text={labels.apply}
            disabled={!canApply}
            onClick={handleApply}
          />
        </div>
      </div>
    </div>
  );
};
