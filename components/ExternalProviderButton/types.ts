import type { ButtonHTMLAttributes, HTMLAttributes, Ref } from 'react';

type DefaultButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonVariant = 'primary' | 'default';

export type ExternalProviderButtonProps = {
  text: string;
  variant?: ButtonVariant;
  type?: DefaultButtonProps['type'];
  provider: 'microsoft' | 'google' | 'okta' | 'jumpcloud' | 'custom';
  testId?: string;
  disabled?: boolean;
  loading?: boolean;
  ref?: Ref<HTMLButtonElement>;
} & HTMLAttributes<HTMLElement>;
