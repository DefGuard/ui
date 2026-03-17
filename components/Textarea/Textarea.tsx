import './style.scss';
import { useEffect, useId, useRef } from 'react';
import { isPresent } from '../../utils/isPresent';
import { mergeRefs } from '../../utils/mergeRefs';
import { FieldBox } from '../FieldBox/FieldBox';
import { FieldError } from '../FieldError/FieldError';
import { FieldLabel } from '../FieldLabel/FieldLabel';
import type { TextareaProps } from './types';

export const Textarea = ({
  value,
  label,
  error,
  placeholder,
  maxHeight = 80,
  minHeight = 80,
  onChange,
  onBlur,
  ref: outerRef,
  required = false,
  disabled = false,
  notNull = false,
  autoComplete = 'off',
}: TextareaProps) => {
  const localRef = useRef<HTMLTextAreaElement>(null);
  const labelId = useId();

  useEffect(() => {
    const resize = () => {
      if (localRef.current) {
        const scrollHeight = localRef.current.scrollHeight;
        const nextHeight = Math.min(scrollHeight, maxHeight);
        localRef.current.style.height = `${nextHeight}px`;
        localRef.current.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden';
      }
    };
    localRef.current?.addEventListener('input', resize);
    resize();
    return () => {
      localRef.current?.removeEventListener('input', resize);
    };
  }, [maxHeight]);

  return (
    <div className="textarea spacer">
      <div className="inner">
        {isPresent(label) && (
          <FieldLabel
            required={required}
            text={label}
            id={labelId}
            onClick={() => {
              localRef.current?.focus();
            }}
          />
        )}
        <FieldBox
          error={!disabled && isPresent(error)}
          disabled={disabled}
          size="default"
          onClick={() => {
            if (
              localRef.current !== null &&
              document.activeElement !== localRef.current
            ) {
              localRef.current?.focus();
            }
          }}
        >
          <textarea
            aria-labelledby={labelId}
            autoComplete={autoComplete}
            disabled={disabled}
            ref={mergeRefs([outerRef, localRef])}
            value={value ?? ''}
            placeholder={placeholder}
            style={{
              maxHeight,
              minHeight,
            }}
            onBlur={onBlur}
            onChange={(e) => {
              const targetValue = e.target.value;
              if (!targetValue.length && !notNull) {
                onChange(null);
              } else {
                onChange(targetValue);
              }
            }}
          />
        </FieldBox>
        {!disabled && <FieldError error={error} />}
      </div>
    </div>
  );
};
