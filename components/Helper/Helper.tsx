import './style.scss';
import type { HTMLProps, ReactNode } from 'react';
import React from 'react';
import { TooltipContent } from '../../providers/tooltip/TooltipContent';
import { TooltipProvider } from '../../providers/tooltip/TooltipContext';
import { TooltipTrigger } from '../../providers/tooltip/TooltipTrigger';
import { ThemeVariable } from '../../types';
import { Icon, IconKind } from '../Icon';

interface Props {
  children: ReactNode;
  tooltipProps?: HTMLProps<HTMLDivElement>;
}

export const Helper = ({ children, tooltipProps }: Props) => {
  return (
    <TooltipProvider>
      <TooltipTrigger>
        <div className="helper">
          <Icon icon={IconKind.Help} size={20} staticColor={ThemeVariable.FgMuted} />
        </div>
      </TooltipTrigger>
      <TooltipContent {...tooltipProps}>
        {typeof children === 'string' && <p>{children}</p>}
        {React.isValidElement(children) && children}
      </TooltipContent>
    </TooltipProvider>
  );
};
