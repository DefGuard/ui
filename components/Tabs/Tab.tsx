import clsx from 'clsx';
import { ThemeVariable } from '../../types';
import { isPresent } from '../../utils/isPresent';
import { Icon } from '../Icon';
import type { TabProps } from './types';

export const Tab = ({ onClick, title, active, icon, iconColor }: TabProps) => {
  return (
    <div
      className={clsx('tab', {
        active,
      })}
      onClick={onClick}
    >
      <div className="line"></div>
      <div className="title">
        {isPresent(icon) && (
          <Icon
            icon={icon}
            size={16}
            staticColor={iconColor ?? ThemeVariable.FgAttention}
          />
        )}
        <span>{title}</span>
      </div>
    </div>
  );
};
