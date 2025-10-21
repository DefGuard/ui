import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { FormInput } from './components/form/FormInput/FormInput';
import { FormSubmitButton } from './components/form/FormSubmitButton/FormSubmitButton';

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withFieldGroup, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    FormInput,
  },
  formComponents: {
    FormSubmitButton,
  },
});
