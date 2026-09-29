import { useFieldContext } from '../../../../form';
import { useFormFieldError } from '../../../hooks/useFormFieldError';
import { ChipsInput } from '../../ChipsInput/ChipsInput';
import type { ChipsInputProps } from '../../ChipsInput/types';

type Props = Omit<ChipsInputProps, 'value' | 'onChange' | 'error'>;

export const FormChipsInput = (props: Props) => {
  const field = useFieldContext<string[]>();
  const error = useFormFieldError();

  return (
    <ChipsInput
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
