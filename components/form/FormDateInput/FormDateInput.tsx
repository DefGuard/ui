import { useFieldContext } from '../../../../form';
import { useFormFieldError } from '../../../hooks/useFormFieldError';
import { DateInput } from '../../DateInput/DateInput';
import type { DateInputProps, DateRange } from '../../DateInput/types';

type Props = Omit<DateInputProps, 'value' | 'onChange' | 'error' | 'testId'>;

export const FormDateInput = (props: Props) => {
  const field = useFieldContext<DateRange | null>();
  const errorMessage = useFormFieldError();

  return (
    <DateInput
      testId={`field-${field.name}`}
      error={errorMessage}
      value={field.state.value}
      onChange={field.handleChange}
      {...props}
    />
  );
};
