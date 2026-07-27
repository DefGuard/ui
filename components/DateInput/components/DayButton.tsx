import clsx from 'clsx';
import type { DayButtonProps } from '../types';

export const DayButton = ({
  day,
  onClick,
  variant = 'default',
  today = false,
  outside = false,
}: DayButtonProps) => {
  return (
    <div
      data-variant={variant}
      className={clsx('day', `variant-${variant}`, {
        today,
        outside,
      })}
    >
      <button
        type="button"
        className="day-button"
        onClick={() => {
          onClick(day);
        }}
      >
        <span>{day.date()}</span>
      </button>
    </div>
  );
};
