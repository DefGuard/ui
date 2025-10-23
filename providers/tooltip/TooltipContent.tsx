import { FloatingPortal, useMergeRefs } from '@floating-ui/react';
import { AnimatePresence } from 'motion/react';
import type { HTMLProps, Ref } from 'react';
import { Tooltip } from '../../components/Tooltip/Tooltip';
import { useTooltipContext } from './TooltipContext';

type Props = HTMLProps<HTMLDivElement> & {
  ref?: Ref<HTMLDivElement>;
};

export const TooltipContent = ({ style, ref: propRef, children, ...props }: Props) => {
  const context = useTooltipContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);
  return (
    <AnimatePresence mode="wait">
      {context.open && (
        <FloatingPortal>
          <Tooltip
            ref={ref}
            style={{
              ...context.floatingStyles,
              ...style,
            }}
            {...context.getFloatingProps(props)}
          >
            {children}
          </Tooltip>
        </FloatingPortal>
      )}
    </AnimatePresence>
  );
};
