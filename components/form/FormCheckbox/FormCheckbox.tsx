import { useFieldContext } from '../../../form';
import { useFormFieldError } from '../../../hooks/useFormFieldError';
import { Checkbox } from '../../Checkbox/Checkbox';
import type { CheckboxProps } from '../../Checkbox/types';

type Props = Pick<CheckboxProps, 'text' | 'disabled'>;

export const FormCheckbox = ({ disabled, text }: Props) => {
  const field = useFieldContext<boolean>();
  const errorMessage = useFormFieldError();

  return (
    <Checkbox
      testId={`field-${field.name}`}
      active={field.state.value}
      disabled={disabled}
      text={text}
      error={errorMessage}
    />
  );
};
