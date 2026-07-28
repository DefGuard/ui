import './style.scss';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { isPresent } from '../../../../utils/isPresent';
import { FieldBox } from '../../../FieldBox/FieldBox';
import { FieldError } from '../../../FieldError/FieldError';
import type { DateInputFieldProps } from '../../types';

const labelFormat = 'DD/MM/YYYY • HH:mm';

const segmentLabel = (date: Date | null, fallback: string): string => {
  if (!isPresent(date)) {
    return fallback;
  }
  return dayjs(date).format(labelFormat);
};

export const DateInputField = ({
  displayed,
  labels,
  placeholder,
  className,
  testId,
  error,
  boxRef,
  size = 'default',
  disabled = false,
  open = false,
  ...rest
}: DateInputFieldProps) => {
  return (
    <div className="date-input spacer">
      <div className="inner">
        <FieldBox
          {...rest}
          className={clsx(className, {
            open,
          })}
          error={!disabled && isPresent(error)}
          disabled={disabled}
          size={size}
          boxRef={boxRef}
          data-testid={testId}
          iconRight="date"
          forceFocusState={open}
        >
          <div className="range-track">
            {!isPresent(displayed) && isPresent(placeholder) && (
              <span className="placeholder">{placeholder}</span>
            )}
            {isPresent(displayed) && (
              <>
                <span
                  className={clsx('segment', {
                    active: displayed.active === 'start',
                    empty: !isPresent(displayed.start),
                  })}
                >
                  {segmentLabel(displayed.start, labels.start)}
                </span>
                <span className="separator">-</span>
                <span
                  className={clsx('segment', {
                    active: displayed.active === 'end',
                    empty: !isPresent(displayed.end),
                  })}
                >
                  {segmentLabel(displayed.end, labels.end)}
                </span>
              </>
            )}
          </div>
        </FieldBox>
        <FieldError error={disabled ? undefined : error} />
      </div>
    </div>
  );
};
