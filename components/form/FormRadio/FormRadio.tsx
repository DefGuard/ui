import { useMemo } from 'react';
import { useFieldContext } from '../../../form';
import { useFormFieldError } from '../../../hooks/useFormFieldError';
import { Radio } from '../../Radio/Radio';
import type { RadioProps } from '../../Radio/types';

interface Props extends Pick<RadioProps, 'disabled' | 'text'> {
  value: string | boolean | number;
}

export const FormRadio = ({ value, ...rest }: Props) => {
  const field = useFieldContext<string | boolean | number>();

  const errorMessage = useFormFieldError();

  const testId = useMemo(
    () =>
      typeof value === 'string'
        ? `field-${field.name}-${value.toLowerCase()}`
        : `field-${field.name}-${String(value).toLowerCase()}`,
    [field.name, value],
  );

  return (
    <Radio
      active={value === field.state.value}
      testId={testId}
      error={errorMessage}
      onClick={() => {
        field.handleChange(value);
      }}
      {...rest}
    />
  );
};
