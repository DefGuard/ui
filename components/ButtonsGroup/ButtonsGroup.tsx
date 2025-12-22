import type { PropsWithChildren } from 'react';
import './style.scss';

export const ButtonsGroup = ({ children }: PropsWithChildren) => {
  return <div className="buttons-group">{children}</div>;
};
