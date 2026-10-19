import type { ButtonHTMLAttributes, HTMLAttributes, Ref } from 'react';

type DefaultButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

type ExternalProviderButtonVariant = 'primary' | 'default';

export type ExternalProviderButtonProps = {
  text: string;
  variant?: ExternalProviderButtonVariant;
  type?: DefaultButtonProps['type'];
  provider: 'microsoft' | 'google' | 'okta' | 'jumpcloud' | 'custom';
  theme?: 'light' | 'dark';
  testId?: string;
  disabled?: boolean;
  loading?: boolean;
  ref?: Ref<HTMLButtonElement>;
} & HTMLAttributes<HTMLElement>;
