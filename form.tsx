import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { FormCheckbox } from './components/form/FormCheckbox/FormCheckbox';
import { FormInput } from './components/form/FormInput/FormInput';
import { FormRadio } from './components/form/FormRadio/FormRadio';
import { FormSubmitButton } from './components/form/FormSubmitButton/FormSubmitButton';
import { FormSuggestedIPInput } from './components/form/FormSuggestedIPInput/FormSuggestedIPInput';
import { FormToggle } from './components/form/FormToggle/FormToggle';

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withFieldGroup, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    FormInput,
    FormCheckbox,
    FormRadio,
    FormToggle,
    FormSuggestedIPInput,
  },
  formComponents: {
    FormSubmitButton,
  },
});
