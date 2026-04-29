import type { PropsWithChildren } from 'react';
import type { ButtonProps } from '../Button/types';

export interface ModalControlsProps extends PropsWithChildren {
  submitProps?: ButtonProps;
  cancelProps?: ButtonProps;
}
