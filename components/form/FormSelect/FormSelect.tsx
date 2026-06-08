import { useMemo } from 'react';
import { useFieldContext } from '../../../../form';
import { useFormFieldError } from '../../../hooks/useFormFieldError';
import { Select } from '../../Select/Select';
import type { SelectSingleProps, SelectSingleValue } from '../../Select/types';

type AllowedValues = number | string;

type Props = Pick<
  SelectSingleProps<AllowedValues>,
  'label' | 'helper' | 'required' | 'options' | 'disabled'
>;

export const FormSelect = ({ options, label, helper, required, disabled }: Props) => {
  const field = useFieldContext<number | string>();
  const errorMessage = useFormFieldError();

  const selectedOption = useMemo(
    () => options.find((o) => o.key === field.state.value),
    [options, field.state.value],
  );

  return (
    <Select
      testId={`field-${field.name}`}
      error={errorMessage}
      options={options}
      required={required}
      label={label}
      helper={helper}
      disabled={disabled}
      value={selectedOption as SelectSingleValue<AllowedValues>}
      onChange={(option) => {
        field.handleChange(option.value);
      }}
    />
  );
};
