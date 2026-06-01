import './style.scss';
import type { ReactNode } from 'react';
import React from 'react';
import { TooltipContent } from '../../providers/tooltip/TooltipContent';
import { TooltipProvider } from '../../providers/tooltip/TooltipContext';
import { TooltipTrigger } from '../../providers/tooltip/TooltipTrigger';
import type { ToolTipContentProps } from '../../providers/tooltip/types';
import { ThemeVariable, type ThemeVariableValue } from '../../types';
import { Icon, IconKind, type IconKindValue } from '../Icon';

interface Props {
  children: ReactNode;
  tooltipProps?: ToolTipContentProps;
  size?: number;
  icon?: IconKindValue;
  color?: ThemeVariableValue | null;
}

export const Helper = ({
  children,
  tooltipProps,
  icon = IconKind.Help,
  size = 20,
  color = ThemeVariable.FgMuted,
}: Props) => {
  return (
    <TooltipProvider>
      <TooltipTrigger>
        <div
          className="helper"
          style={{
            width: size,
            height: size,
          }}
        >
          <Icon icon={icon} size={size} staticColor={color ? color : undefined} />
        </div>
      </TooltipTrigger>
      <TooltipContent {...tooltipProps}>
        {typeof children === 'string' && <p>{children}</p>}
        {React.isValidElement(children) && children}
      </TooltipContent>
    </TooltipProvider>
  );
};
