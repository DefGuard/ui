import { isUndefined } from 'lodash-es';
import { useEffect, useMemo } from 'react';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';

import { Input } from '../../Layout/Input/Input';
import { InputFloatingErrors, InputProps } from '../../Layout/Input/types';

interface Props<T extends FieldValues> extends Omit<InputProps, 'floatingErrors'> {
  controller: UseControllerProps<T>;
  floatingErrors?: {
    title?: string;
    errorMessages?: string[];
  };
}
export const FormInput = <T extends FieldValues>({
  controller,
  floatingErrors,
  ...rest
}: Props<T>) => {
  const {
    field,
    fieldState: { isDirty, isTouched, error },
    formState: { isSubmitted },
  } = useController(controller);

  const isInvalid = useMemo(() => {
    if (
      (!isUndefined(error) && (isDirty || isTouched)) ||
      (!isUndefined(error) && isSubmitted)
    ) {
      return true;
    }
    return false;
  }, [error, isDirty, isSubmitted, isTouched]);

  const floatingErrorsData = useMemo((): InputFloatingErrors | undefined => {
    if (floatingErrors && floatingErrors.title && error && error.types && isInvalid) {
      let errors: string[] = [];
      for (const val of Object.values(error.types)) {
        if (typeof val === 'string') {
          errors.push(val);
        }
        if (Array.isArray(val)) {
          errors = [...errors, ...val];
        }
      }
      if (floatingErrors.errorMessages && floatingErrors.errorMessages.length) {
        errors = [...errors, ...floatingErrors.errorMessages];
      }
      return {
        title: floatingErrors.title,
        errorMessages: errors,
      };
    }
    return undefined;
  }, [error, floatingErrors, isInvalid]);

  useEffect(() => console.log(error), [error]);

  return (
    <Input
      data-testid={`field-${controller.name}`}
      {...rest}
      {...field}
      invalid={isInvalid}
      errorMessage={error?.message}
      floatingErrors={floatingErrorsData}
    />
  );
};
