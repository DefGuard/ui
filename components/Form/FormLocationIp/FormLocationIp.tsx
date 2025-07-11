import './style.scss';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import mergeRefs from 'merge-refs';
import { useId, useMemo, useRef, useState } from 'react';
import {
  type FieldValues,
  type UseControllerProps,
  useController,
} from 'react-hook-form';

import { useElementSize } from '../../../hooks/useSize';
import { isPresent } from '../../../utils/isPresent';
import type { FormLocationIpData } from './type';

interface Props<T extends FieldValues> {
  controller: UseControllerProps<T>;
  data: FormLocationIpData;
  label?: string;
  disabled?: boolean;
}

export const FormLocationIp = <T extends FieldValues>({
  controller,
  data,
  disabled = false,
  label,
}: Props<T>) => {
  const fieldId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const shadowRef = useRef<HTMLDivElement | null>(null);
  const shadowSizing = useElementSize(shadowRef);
  const [focused, setFocus] = useState(false);
  const {
    field: { value, name, onBlur, onChange, ref, disabled: formFieldDisabled },
    fieldState: { isDirty, isTouched, error },
    formState: { isSubmitted, isSubmitting },
  } = useController(controller);

  const isInvalid = useMemo(() => {
    if (
      (isPresent(error) && (isDirty || isTouched)) ||
      (isPresent(error) && isSubmitted)
    ) {
      return true;
    }
    return false;
  }, [error, isDirty, isSubmitted, isTouched]);

  // const suffixWidth = useMemo(
  //   () => getTextWidth(data.networkPrefix),
  //   [data.networkPrefix],
  // );

  // const prefixWidth = useMemo(() => getTextWidth(data.networkPart), [data.networkPart]);

  // const estimatedInputValue = useMemo(() => Math.max(getTextWidth(value), 5), [value]);

  const inputWidth = useMemo(() => {
    if (shadowSizing) {
      const width = shadowSizing.width + 8;
      const res = Math.ceil(Math.max(width, 2));
      return `${res}px`;
    }
    return '1px';
  }, [shadowSizing]);

  return (
    <div className="form-location-ip">
      {isPresent(label) && (
        <div className="label-track">
          <label htmlFor={fieldId}>{label}</label>
        </div>
      )}
      <div
        className={clsx('card', {
          invalid: isInvalid,
          disabled: disabled || formFieldDisabled,
        })}
        onClick={() => {
          if (!focused) {
            inputRef.current?.focus();
          }
        }}
      >
        <div
          className="track"
          // style={{
          //   gridTemplateColumns: `${prefixWidth}px ${estimatedInputValue}px ${suffixWidth}px`,
          // }}
        >
          <span className="prefix">{data.networkPart}</span>
          <div className="input-sizer">
            <span className="input-shadow" ref={shadowRef}>
              {value}
            </span>
            <input
              style={{ width: inputWidth }}
              data-test-id={`field-${controller.name.toLowerCase().replaceAll('_', '-')}`}
              id={fieldId}
              type="text"
              ref={mergeRefs(ref, inputRef)}
              disabled={isSubmitting || disabled || formFieldDisabled}
              name={name}
              value={value}
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              onBlur={(_e) => {
                setFocus(false);
                onBlur();
              }}
              onChange={(e) => {
                onChange(e);
              }}
              onFocus={() => {
                setFocus(true);
              }}
            />
          </div>
          <span className="suffix">/{data.networkPrefix}</span>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {isPresent(error) && isInvalid && (
          <div className="error-message">
            <motion.p
              className="message"
              initial={{
                x: 0,
                opacity: 0,
              }}
              animate={{
                x: 20,
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                x: 0,
              }}
            >
              {error.message}
            </motion.p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
