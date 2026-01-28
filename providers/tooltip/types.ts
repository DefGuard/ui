import type { Placement } from '@floating-ui/react';
import type { useTooltip } from './useTooltip';

export type TooltipContextType = ReturnType<typeof useTooltip> | null;

export interface TooltipOptions {
  disabled?: boolean;
  initialOpen?: boolean;
  placement?: Placement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
