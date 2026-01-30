import './style.scss';
import clsx from 'clsx';
import { useCallback } from 'react';
import { useFieldContext } from '../../../../form';
import { useFormFieldError } from '../../../hooks/useFormFieldError';
import { isPresent } from '../../../utils/isPresent';
import { CheckboxIndicator } from '../../CheckboxIndicator/CheckboxIndicator';
import { FieldError } from '../../FieldError/FieldError';

type Id = string | number;

type Props<T extends Id> = {
  values: T[];
  getLabel: (value: T) => string;
};

export const FormCheckboxGroup = <T extends Id>({ values, getLabel }: Props<T>) => {
  const field = useFieldContext<Set<T>>();
  const error = useFormFieldError();

  const handleChange = useCallback(
    (value: T, present: boolean) => {
      const clone = new Set(field.store.state.value);
      if (!present) {
        clone.add(value);
      } else {
        clone.delete(value);
      }
      field.handleChange(clone);
    },
    [field.handleChange, field.store],
  );

  return (
    <div className="form-checkbox-group">
      <div className="values-tack">
        {values.map((value) => {
          const checked = field.state.value.has(value);
          const testId = `field-${field.name}-${String(value)}`;
          const hasError = isPresent(error);
          return (
            <div
              className={clsx('item', {
                error: hasError,
              })}
              data-testid={testId}
              data-value={checked}
              key={value}
              onClick={() => {
                handleChange(value, checked);
              }}
            >
              <CheckboxIndicator active={checked} error={hasError} />
              <p>{getLabel(value)}</p>
            </div>
          );
        })}
      </div>
      <FieldError error={error} />
    </div>
  );
};
