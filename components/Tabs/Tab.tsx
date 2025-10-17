import clsx from 'clsx';
import type { TabProps } from './types';

export const Tab = ({ onClick, title, active }: TabProps) => {
  return (
    <div
      className={clsx('tab', {
        active,
      })}
      onClick={onClick}
    >
      <div className="line"></div>
      <p className="title">{title}</p>
    </div>
  );
};
