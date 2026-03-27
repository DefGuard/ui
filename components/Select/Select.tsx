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
import { type JSX, type Key, useCallback, useId, useMemo, useState } from 'react';
import { isPresent } from '../../utils/isPresent';
import { FieldBox } from '../FieldBox/FieldBox';
import { FieldError } from '../FieldError/FieldError';
import { FieldLabel } from '../FieldLabel/FieldLabel';
import type {
  SelectMultiProps,
  SelectOption,
  SelectProps,
  SelectSingleProps,
} from './types';

export function Select<T>(props: SelectSingleProps<T>): JSX.Element;
export function Select<T>(props: SelectMultiProps<T>): JSX.Element;

export function Select<T>(props: SelectProps<T, boolean>) {
  const labelId = useId();

  const {
    label,
    labelArgs,
    options,
    className,
    placeholder,
    testId,
    error,
    size = 'default',
    disabled = false,
    required = false,
  } = props;

  const [floatingOpen, setFloatingOpen] = useState(false);

  const { refs, context, floatingStyles } = useFloating({
    open: floatingOpen,
    onOpenChange: setFloatingOpen,
    middleware: [
      offset(4),
      flip(),
      shift(),
      floatingSize({
        apply({ rects, elements, availableHeight }) {
          const refWidth = `${rects.reference.width}px`;
          elements.floating.style.minWidth = refWidth;
          elements.floating.style.maxHeight = `${availableHeight - 10}px`;
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const isMulti = props.multiple;

  const selectedLabel = useMemo(() => {
    if (isMulti) return null;
    return (props as SelectSingleProps<T>).value?.label ?? null;
  }, [isMulti, props.value, props]);

  const selectedKeys = useMemo((): Set<Key> => {
    if (isMulti) return new Set();
    return new Set([props.value.key]);
  }, [isMulti, props.value]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: onChange
  const handleChange = useCallback(
    (option: SelectOption<T>, isSelected: boolean) => {
      if (isMulti) return;
      if (isSelected) return;
      (props as SelectSingleProps<T>).onChange(option);
      setFloatingOpen(false);
    },
    [isMulti, props.onChange, setFloatingOpen],
  );

  const click = useClick(context, {
    toggle: true,
    enabled: !disabled,
  });

  const dismiss = useDismiss(context, {
    ancestorScroll: true,
    escapeKey: true,
    outsidePress: true,
  });

  const { getFloatingProps, getReferenceProps } = useInteractions([click, dismiss]);

  return (
    <>
      <div className="select spacer">
        <div className="inner">
          {isPresent(label) && (
            <FieldLabel
              required={required}
              id={labelId}
              label={label}
              labelArgs={labelArgs}
            />
          )}
          <FieldBox
            className={className}
            disabled={disabled}
            size={size}
            boxRef={refs.setReference}
            data-testid={testId}
            iconRight="arrow-small"
            forceFocusState={floatingOpen}
            aria-labelledby={labelId}
            {...getReferenceProps()}
          >
            <div className="box-track">
              {isPresent(placeholder) && !isPresent(selectedLabel) && (
                <span className="placeholder">{placeholder}</span>
              )}
              {isPresent(selectedLabel) && <span className="value">{selectedLabel}</span>}
            </div>
          </FieldBox>
          <FieldError error={error} />
        </div>
      </div>
      {floatingOpen && (
        <FloatingPortal>
          <div
            role="list"
            className="select-floating"
            ref={refs.setFloating}
            style={{
              position: 'absolute',
              ...floatingStyles,
            }}
            {...getFloatingProps()}
          >
            {options.map((option) => {
              const isSelected = selectedKeys.has(option.key);
              return (
                <div
                  className={clsx('select-option', {
                    selected: isSelected,
                  })}
                  key={option.key}
                  onClick={() => {
                    handleChange(option, isSelected);
                  }}
                  role="listitem"
                >
                  <span>{option.label}</span>
                </div>
              );
            })}
          </div>
        </FloatingPortal>
      )}
    </>
  );
}
