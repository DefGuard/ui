import { useStore } from '@tanstack/react-form';
import { useFormContext } from '../../../form';
import { Button } from '../../Button/Button';
import type { FormSubmitButtonProps } from './type';

export const FormSubmitButton = ({ loading, ...props }: FormSubmitButtonProps) => {
  const form = useFormContext();
  const isSubmitting = useStore(form.store, (s) => s.isSubmitting);

  return <Button {...props} type="submit" loading={loading || isSubmitting} />;
};
