import './style.scss';
import type { ReactNode } from 'react';
import React from 'react';
import { TooltipContent } from '../../providers/tooltip/TooltipContent';
import { TooltipProvider } from '../../providers/tooltip/TooltipContext';
import { TooltipTrigger } from '../../providers/tooltip/TooltipTrigger';
import type { ToolTipContentProps } from '../../providers/tooltip/types';
import { ThemeVariable } from '../../types';
import { Icon, IconKind } from '../Icon';

interface Props {
  children: ReactNode;
  tooltipProps?: ToolTipContentProps;
  size?: number;
}

export const Helper = ({ children, tooltipProps, size = 20 }: Props) => {
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
          <Icon icon={IconKind.Help} size={size} staticColor={ThemeVariable.FgMuted} />
        </div>
      </TooltipTrigger>
      <TooltipContent {...tooltipProps}>
        {typeof children === 'string' && <p>{children}</p>}
        {React.isValidElement(children) && children}
      </TooltipContent>
    </TooltipProvider>
  );
};
