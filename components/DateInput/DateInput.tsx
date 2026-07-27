import './style.scss';
import {
  autoUpdate,
  FloatingPortal,
  flip,
  size as floatingSize,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { isPresent } from '../../utils/isPresent';
import { FieldBox } from '../FieldBox/FieldBox';
import { DateInputPanel } from './components/DateInputPanel';
import type { DateInputProps, DateRangeDisplay, DateRangePreview } from './types';

const labelFormat = 'DD/MM/YYYY • HH:mm';

const segmentLabel = (date: Date | null, fallback: string): string => {
  if (!isPresent(date)) {
    return fallback;
  }
  return dayjs(date).format(labelFormat);
};

export const DateInput = ({
  value,
  onChange,
  labels,
  placeholder,
  className,
  testId,
  size = 'default',
  disabled = false,
}: DateInputProps) => {
  const [floatingOpen, setFloatingOpen] = useState(false);
  const [preview, setPreview] = useState<DateRangePreview | null>(null);

  const { refs, context, floatingStyles } = useFloating({
    open: floatingOpen,
    onOpenChange: setFloatingOpen,
    placement: 'bottom-start',
    middleware: [
      offset(4),
      flip(),
      shift(),
      floatingSize({
        apply({ availableHeight, elements }) {
          elements.floating.style.maxHeight = `${availableHeight - 10}px`;
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context, {
    toggle: true,
    enabled: !disabled,
  });

  const dismiss = useDismiss(context, {
    ancestorScroll: true,
    escapeKey: true,
    outsidePress: (event) => !(event.target as HTMLElement).closest('.select-floating'),
  });

  const { getFloatingProps, getReferenceProps } = useInteractions([click, dismiss]);

  const displayed = useMemo((): DateRangeDisplay | null => {
    if (floatingOpen && isPresent(preview)) {
      return preview;
    }
    if (isPresent(value)) {
      return { start: value.start, end: value.end, active: null };
    }
    return null;
  }, [floatingOpen, preview, value]);

  return (
    <>
      <div className="date-input spacer">
        <div className="inner">
          <FieldBox
            className={clsx(className, {
              open: floatingOpen,
            })}
            disabled={disabled}
            size={size}
            boxRef={refs.setReference}
            data-testid={testId}
            iconRight="date"
            forceFocusState={floatingOpen}
            {...getReferenceProps()}
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
        </div>
      </div>
      {floatingOpen && (
        <FloatingPortal>
          <div
            className="date-input-floating"
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            <DateInputPanel
              value={value}
              labels={labels}
              onPreviewChange={setPreview}
              onApply={(range) => {
                onChange(range);
                setFloatingOpen(false);
              }}
              onCancel={() => {
                setFloatingOpen(false);
              }}
            />
          </div>
        </FloatingPortal>
      )}
    </>
  );
};
