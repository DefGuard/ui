import { useMemo, useRef } from 'react';
import { isPresent } from '../../utils/isPresent';
import { FieldBox } from '../FieldBox/FieldBox';
import { FieldError } from '../FieldError/FieldError';
import { FieldLabel } from '../FieldLabel/FieldLabel';
import './style.scss';
import { useElementSize } from '../../hooks/useSize';
import { mergeRefs } from '../../utils/mergeRefs';
import type { SuggestedIPInputProps } from './types';

export const SuggestedIpInput = ({
  data,
  onChange,
  onBlur,
  value,
  error,
  label,
  ref,
  testId,
  required = false,
}: SuggestedIPInputProps) => {
  const hasError = isPresent(error);
  const innerInputRef = useRef<HTMLInputElement>(null);
  const shadowRef = useRef(null);
  const shadowSize = useElementSize(shadowRef);

  const inputWidth = useMemo(() => {
    if (shadowSize) {
      const width = shadowSize.width + 4;
      const res = Math.ceil(Math.max(width, 2));
      return `${res}px`;
    }
    return '1px';
  }, [shadowSize]);

  return (
    <div className="suggested-ip-input">
      {isPresent(label) && <FieldLabel text={label} required={required} />}
      <FieldBox
        error={hasError}
        onClick={() => {
          innerInputRef.current?.focus();
        }}
      >
        <span className="prefix">{data.network_part}</span>
        <div className="input-track">
          {/* Order here matters */}
          <span className="input-shadow" ref={shadowRef}>
            {value ?? ''}
          </span>
          <input
            data-testid={testId}
            style={{
              width: inputWidth,
            }}
            ref={mergeRefs([ref, innerInputRef])}
            type="text"
            value={value ?? ''}
            onBlur={onBlur}
            onChange={(e) => {
              const targetValue = e.target.value;
              if (targetValue === '') {
                onChange(null);
                return;
              }
              onChange(targetValue);
            }}
          />
        </div>
        <span className="suffix">/{data.network_prefix}</span>
      </FieldBox>
      <FieldError error={error} />
    </div>
  );
};
