import { isUndefined } from 'lodash-es';
import { useMemo } from 'react';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { Select } from '../../Layout/Select/Select';
import { SelectProps } from '../../Layout/Select/types';

interface Props<T extends FieldValues> extends Omit<SelectProps<T>, 'onChange'> {
  controller: UseControllerProps<T>;
}

export const FormSelect = <T extends FieldValues>({ controller, ...rest }: Props<T>) => {
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

  return (
    <Select<T>
      {...rest}
      selected={field.value}
      invalid={isInvalid}
      errorMessage={error?.message}
      onChangeSingle={(res) => field.onChange(res)}
      onChangeArray={(res) => field.onChange(res)}
      inForm={true}
    />
  );
};
