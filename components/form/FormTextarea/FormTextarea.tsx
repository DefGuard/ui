import { useFieldContext } from '../../../../form';
import { useFormFieldError } from '../../../hooks/useFormFieldError';
import { Textarea } from '../../Textarea/Textarea';
import type { TextareaProps } from '../../Textarea/types';

type Props = Omit<TextareaProps, 'value' | 'onChange' | 'error'>;

export const FormTextarea = (props: Props) => {
  const field = useFieldContext<string | null>();
  const error = useFormFieldError();

  return (
    <Textarea
      {...props}
      value={field.state.value}
      onChange={field.handleChange}
      onBlur={field.handleBlur}
      error={error}
    />
  );
};
