import type { Ref } from 'react';
import type { ButtonProps } from '../Button/types';

export type EmptyStateProps = {
  ref?: Ref<HTMLDivElement>;
  title?: string;
  subtitle?: string;
  icon?: 'apps' | 'authentication' | 'api-token' | 'search' | 'webhook';
  className?: string;
  testId?: string;
  id?: string;
  primaryAction?: ButtonProps;
  secondaryAction?: () => void;
  secondaryActionText?: string;
};
