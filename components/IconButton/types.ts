import type { MouseEventHandler, Ref } from 'react';
import type { Direction } from '../../types';
import type { IconKindValue } from '../Icon/icon-types';

export type IconButtonProps = {
  icon: IconKindValue;
  iconRotation?: Direction;
  disabled?: boolean;
  ref?: Ref<HTMLDivElement>;
  onClick?: MouseEventHandler<HTMLDivElement>;
};
