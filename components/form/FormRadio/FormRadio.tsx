import { useFieldContext } from '../../../form';
import { useFormFieldError } from '../../../hooks/useFormFieldError';
import { Radio } from '../../Radio/Radio';
import type { RadioProps } from '../../Radio/types';

interface Props extends Pick<RadioProps, 'disabled' | 'text'> {
  value: string;
}

export const FormRadio = ({ value, ...rest }: Props) => {
  const field = useFieldContext<string>();

  const errorMessage = useFormFieldError();

  return (
    <Radio
      active={value === field.state.value}
      testId={`field-${field.name}-${value.toLowerCase()}`}
      error={errorMessage}
      onClick={() => {
        field.handleChange(value);
      }}
      {...rest}
    />
  );
};
