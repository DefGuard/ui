import { useFieldContext } from '../../../../form';
import { useFormFieldError } from '../../../hooks/useFormFieldError';
import { SuggestedIpInput } from '../../SuggestedIPInput/SuggestedIPInput';
import type { SuggestedIPInputProps } from '../../SuggestedIPInput/types';

type Props = Omit<SuggestedIPInputProps, 'onChange' | 'value' | 'ref' | 'error'>;

export const FormSuggestedIPInput = ({ data, label, required }: Props) => {
  const field = useFieldContext<string | null>();
  const errorMessage = useFormFieldError();

  return (
    <SuggestedIpInput
      data={data}
      label={label}
      required={required}
      value={field.state.value}
      testId={`field-${field.name}`}
      error={errorMessage}
      onChange={(value) => {
        field.handleChange(value);
      }}
      onBlur={field.handleBlur}
    />
  );
};
