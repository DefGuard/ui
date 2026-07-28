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
import { useMemo, useState } from 'react';
import { isPresent } from '../../utils/isPresent';
import { DateInputField } from './components/DateInputField/DateInputField';
import { DateInputFloating } from './components/DateInputFloating/DateInputFloating';
import type { DateInputProps, DateRangeDisplay, DateRangePreview } from './types';

export const DateInput = ({
  value,
  onChange,
  labels,
  placeholder,
  className,
  testId,
  error,
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
      <DateInputField
        {...getReferenceProps()}
        displayed={displayed}
        labels={labels}
        placeholder={placeholder}
        className={className}
        testId={testId}
        error={error}
        size={size}
        disabled={disabled}
        open={floatingOpen}
        boxRef={refs.setReference}
      />
      {floatingOpen && (
        <FloatingPortal>
          <DateInputFloating
            value={value}
            labels={labels}
            ref={refs.setFloating}
            boxProps={{
              ...getFloatingProps({
                style: floatingStyles,
              }),
            }}
            onPreviewChange={setPreview}
            onApply={(range) => {
              onChange(range);
              setFloatingOpen(false);
            }}
            onCancel={() => {
              setFloatingOpen(false);
            }}
          />
        </FloatingPortal>
      )}
    </>
  );
};
