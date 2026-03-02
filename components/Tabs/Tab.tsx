import clsx from 'clsx';
import { ThemeVariable } from '../../types';
import { Icon } from '../Icon';
import type { TabProps } from './types';

export const Tab = ({ onClick, title, active, icon }: TabProps) => {
  return (
    <div
      className={clsx('tab', {
        active,
      })}
      onClick={onClick}
    >
      <div className="line"></div>
      <p className="title">
        {icon && <Icon icon={icon} size={18} staticColor={ThemeVariable.FgAttention} />}
        {title}
      </p>
    </div>
  );
};
