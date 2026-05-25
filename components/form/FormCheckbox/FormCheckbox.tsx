import { useMemo } from 'react';
import { useFieldContext } from '../../../../form';
import { useFormFieldError } from '../../../hooks/useFormFieldError';
import { isPresent } from '../../../utils/isPresent';
import { Checkbox } from '../../Checkbox/Checkbox';
import type { CheckboxProps } from '../../Checkbox/types';

type Props = Pick<CheckboxProps, 'text' | 'disabled' | 'helper'> & {
  value?: number | string;
};

export const FormCheckbox = ({ disabled, text, value, helper }: Props) => {
  const field = useFieldContext<boolean | Set<number | string>>();
  const errorMessage = useFormFieldError();

  const fieldValue = field.state.value;

  const active = useMemo(() => {
    if (typeof fieldValue === 'boolean') {
      return fieldValue;
    } else {
      if (isPresent(value)) {
        return fieldValue.has(value);
      }
    }
    return false;
  }, [fieldValue, value]);

  return (
    <Checkbox
      testId={`field-${field.name}`}
      data-value={value}
      active={active}
      disabled={disabled}
      text={text}
      helper={helper}
      error={errorMessage}
      onClick={() => {
        if (typeof fieldValue === 'boolean') {
          field.handleChange(!field.state.value);
        } else {
          if (isPresent(value)) {
            const clone = new Set(fieldValue);
            if (active) {
              clone.delete(value);
            } else {
              clone.add(value);
            }
            field.handleChange(clone);
          }
        }
      }}
    />
  );
};
