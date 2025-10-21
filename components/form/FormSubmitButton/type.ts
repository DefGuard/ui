import type { ButtonProps } from '../../Button/types';

export type FormSubmitButtonProps = Pick<
  ButtonProps,
  'testId' | 'size' | 'loading' | 'disabled' | 'text'
>;
