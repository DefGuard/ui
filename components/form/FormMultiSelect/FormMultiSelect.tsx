import {
  isStandardSchemaValidator,
  standardSchemaValidators,
  useStore,
} from '@tanstack/react-form';
import { useFieldContext, useFormContext } from '../../../../form';
import { useFormFieldError } from '../../../hooks/useFormFieldError';
import { isPresent } from '../../../utils/isPresent';
import { MultiSelect } from '../../MultiSelect/MultiSelect';
import type { MultiSelectProps } from '../../MultiSelect/types';

type Props = Omit<MultiSelectProps, 'value' | 'onChange' | 'error'>;

export const FormMultiSelect = (props: Props) => {
  const field = useFieldContext<string[]>();
  const form = useFormContext();
  const error = useFormFieldError();
  const valueError = useStore(
    field.store,
    (state) => state.meta.errorMap.onBlur as string | undefined,
  );

  const validateValue = (value: string) => {
    const schema = form.options.validators?.onSubmit;
    if (!isStandardSchemaValidator(schema)) return true;

    const errors = standardSchemaValidators.validate(
      {
        value: { ...form.state.values, [field.name]: [...field.state.value, value] },
        validationSource: 'form',
      },
      schema,
    );
    const message = errors?.fields[field.name]?.[0]?.message;
    field.setErrorMap({ onBlur: message });
    return !isPresent(message);
  };

  return (
    <MultiSelect
      testId={`field-${field.name}`}
      {...props}
      value={field.state.value}
      onChange={field.handleChange}
      onBlur={field.handleBlur}
      validateValue={validateValue}
      onInputChange={() => {
        if (isPresent(valueError)) {
          field.setErrorMap({ onBlur: undefined });
        }
      }}
      error={valueError ?? error}
    />
  );
};
