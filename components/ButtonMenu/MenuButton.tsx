import {
  autoUpdate,
  FloatingPortal,
  offset,
  type Placement,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import { useState } from 'react';
import { Button } from '../Button/Button';
import type { ButtonProps } from '../Button/types';
import { Menu } from '../Menu/Menu';
import type { MenuItemsGroup } from '../Menu/types';

export const ButtonMenu = ({
  menuItems,
  rotateIconOnOpen = false,
  placement = 'bottom-start',
  ...props
}: Omit<ButtonProps, 'ref'> & {
  menuItems: MenuItemsGroup[];
  placement?: Placement;
  rotateIconOnOpen?: boolean;
}) => {
  const [isOpen, setOpen] = useState(false);
  const effectiveIconRotation = rotateIconOnOpen
    ? { iconRightRotation: isOpen ? ('down' as const) : ('right' as const) }
    : undefined;
  const { refs, context, floatingStyles } = useFloating({
    placement,
    whileElementsMounted: autoUpdate,
    onOpenChange: setOpen,
    open: isOpen,
    middleware: [
      offset(4),
      shift(),
      size({
        apply({ rects, elements, availableHeight }) {
          const refWidth = `${rects.reference.width}px`;
          elements.floating.style.minWidth = refWidth;
          elements.floating.style.maxHeight = `${availableHeight - 10}px`;
        },
      }),
    ],
  });

  const click = useClick(context, {
    toggle: true,
  });

  const dismiss = useDismiss(context, {
    ancestorScroll: true,
    escapeKey: true,
    outsidePress: (event) => !(event.target as HTMLElement).closest('.menu'),
  });

  const { getFloatingProps, getReferenceProps } = useInteractions([click, dismiss]);

  return (
    <>
      <Button
        ref={refs.setReference}
        {...props}
        {...effectiveIconRotation}
        {...getReferenceProps()}
      />
      {isOpen && (
        <FloatingPortal>
          <Menu
            itemGroups={menuItems}
            ref={refs.setFloating}
            style={floatingStyles}
            onClose={() => {
              setOpen(false);
            }}
            {...getFloatingProps()}
          />
        </FloatingPortal>
      )}
    </>
  );
};
