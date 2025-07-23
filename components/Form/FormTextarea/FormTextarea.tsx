import { useMemo } from 'react';
import {
  type FieldValues,
  type UseControllerProps,
  useController,
} from 'react-hook-form';

import { Textarea } from '../../Layout/Textarea/Textarea';
import type { TextareaProps } from '../../Layout/Textarea/types';

type Props<T extends FieldValues> = {
  controller: UseControllerProps<T>;
} & Omit<TextareaProps, 'onChange' | 'value'>;

export const FormTextarea = <T extends FieldValues>({
  controller,
  ...textareaProps
}: Props<T>) => {
  const {
    field: { value, onChange },
    fieldState: { error, isDirty, isTouched },
    formState: { isSubmitted },
  } = useController(controller);

  const errorMessage = useMemo(() => {
    if ((error && (isDirty || isTouched)) || (!error && isSubmitted)) {
      return error?.message;
    }
    return undefined;
  }, [error, isDirty, isSubmitted, isTouched]);

  return (
    <Textarea
      {...textareaProps}
      onChange={(value) => {
        onChange(value);
      }}
      value={value}
      errorMessage={errorMessage}
    />
  );
};
