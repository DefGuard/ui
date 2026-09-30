import { useFieldContext } from '../../../../form';
import { useFormFieldError } from '../../../hooks/useFormFieldError';
import { MultiSelect } from '../../MultiSelect/MultiSelect';
import type { MultiSelectProps } from '../../MultiSelect/types';

type Props = Omit<MultiSelectProps, 'value' | 'onChange' | 'error'>;

export const FormMultiSelect = (props: Props) => {
  const field = useFieldContext<string[]>();
  const error = useFormFieldError();

  return (
    <MultiSelect
      testId={`field-${field.name}`}
      {...props}
      value={field.state.value}
      onChange={field.handleChange}
      onBlur={field.handleBlur}
      onInputErrorChange={(inputError) => {
        field.setErrorMap({ onBlur: inputError });
      }}
      error={error}
    />
  );
};
