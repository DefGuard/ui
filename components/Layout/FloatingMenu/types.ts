import type { Placement } from '@floating-ui/react';

import type { useFloatingMenu } from './useFloatingMenuContext';

export type FloatingMenuContextOptions = {
  initialOpen?: boolean;
  placement?: Placement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
};

export type FloatingMenuContextType = ReturnType<typeof useFloatingMenu> | null;
