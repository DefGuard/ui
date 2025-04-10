import './floating.scss';

import { FloatingPortal, useMergeRefs } from '@floating-ui/react';
import clsx from 'clsx';
import React from 'react';

import { FloatingMenuArrow } from './FloatingMenuArrow';
import { useFloatingMenuContext } from './useFloatingMenuContext';

export const FloatingMenu = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
  // eslint-disable-next-line react/prop-types
>(function TooltipContent({ style, children, ...props }, propRef) {
  const context = useFloatingMenuContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  if (!context.open) return null;

  return (
    <FloatingPortal>
      <div
        ref={ref}
        style={{
          ...context.floatingStyles,
          ...style,
        }}
        {...context.getFloatingProps(props)}
        className={clsx('floating-menu', props.className)}
      >
        <div className="floating-menu-inner">{children}</div>
        <div
          className="floating-menu-arrow-positioner"
          ref={context.arrowRef}
          style={{
            position: 'absolute',
            left: context.middlewareData.arrow?.x,
            top: context.middlewareData.arrow?.y,
          }}
        >
          <FloatingMenuArrow placement={context.placement} />
        </div>
      </div>
    </FloatingPortal>
  );
});
