import type { PropsWithChildren, ReactNode } from 'react';

export interface CheckboxProps extends PropsWithChildren {
  testId?: string;
  active?: boolean;
  error?: string;
  disabled?: boolean;
  text?: string;
  onClick?: () => void;
  helperBlock?: ReactNode;
}
