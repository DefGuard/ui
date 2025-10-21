import { useStore } from '@tanstack/react-form';
import { useMemo } from 'react';
import type z from 'zod';
import { useFieldContext, useFormContext } from '../form';

export const useFormFieldError = () => {
  const field = useFieldContext();
  const form = useFormContext();

  // allows field to show error even if isPristine is true, this is needed in cases as input required or checkbox checked but user just clicked submit
  const wasSubmittedWithFailure = useStore(
    form.store,
    (store) => !store.isSubmitSuccessful && store.submissionAttempts > 0,
  );

  const isPristine = useStore(field.store, (state) => state.meta.isPristine);

  const errorState = useStore(
    field.store,
    // normally this should be ZodIssue but sometime's we want to add some post submit validation and there we probably want to set only error messages
    (state) => state.meta.errors as Array<z.core.$ZodIssue | string>,
  );

  const errorMessage = useMemo(() => {
    // ignore errors unless some touches the field or submit's the form
    if (isPristine && !wasSubmittedWithFailure) return undefined;

    const fieldError = errorState[0];

    if (fieldError) {
      if (typeof fieldError === 'string') {
        return fieldError;
      } else {
        return fieldError.message;
      }
    }
    return undefined;
  }, [errorState[0], isPristine, wasSubmittedWithFailure]);

  return errorMessage;
};
