import {
  arrow,
  autoUpdate,
  flip,
  offset,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import React, { useRef, useState } from 'react';

import { FloatingMenuContextOptions, FloatingMenuContextType } from './types';

export const useFloatingMenu = ({
  initialOpen,
  onOpenChange,
  open: controlledOpen,
  placement = 'right',
  disabled,
}: FloatingMenuContextOptions) => {
  const arrowRef = useRef(null);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen ?? false);
  const isOpen = controlledOpen ?? uncontrolledOpen;
  const openChange = onOpenChange ?? setUncontrolledOpen;

  const data = useFloating({
    placement,
    open: !disabled && isOpen,
    onOpenChange: openChange,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(10),
      flip({
        crossAxis: placement.includes('-'),
        fallbackAxisSideDirection: 'start',
        padding: 5,
      }),
      shift({ padding: 5 }),
      arrow({
        element: arrowRef,
        padding: 10,
      }),
    ],
  });

  const floatingContext = data.context;

  const hover = useHover(floatingContext, {
    move: false,
    enabled: controlledOpen == null && !disabled,
    mouseOnly: true,
    restMs: 350,
    handleClose: safePolygon(),
  });

  const click = useClick(floatingContext, {
    ignoreMouse: true,
    enabled: !disabled,
  });
  const focus = useFocus(floatingContext, {
    enabled: controlledOpen == null,
  });
  const dismiss = useDismiss(floatingContext, {
    ancestorScroll: true,
    outsidePress: true,
  });
  const role = useRole(floatingContext, { role: 'tooltip' });

  const interactions = useInteractions([hover, focus, dismiss, role, click]);

  return React.useMemo(
    () => ({
      open: isOpen,
      setOpen: openChange,
      ...interactions,
      ...data,
      arrowRef,
    }),
    [data, interactions, isOpen, openChange],
  );
};

export const FloatingMenuContext = React.createContext<FloatingMenuContextType>(null);

export const useFloatingMenuContext = () => {
  const context = React.useContext(FloatingMenuContext);

  if (context == null) {
    throw new Error('Tooltip components must be wrapped in <Tooltip />');
  }

  return context;
};
