import './style.scss';

import { autoUpdate, offset, useFloating } from '@floating-ui/react';
import { useVirtualizer } from '@tanstack/react-virtual';
import classNames from 'classnames';
import { detect } from 'detect-browser';
import { motion, type Variants } from 'framer-motion';
import { isUndefined } from 'lodash-es';
import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { useBreakpoint } from 'use-breakpoint';

import { deviceBreakpoints } from '../../../../constants';
import type { ListHeader } from './types';
import { ListSortDirection, type VirtualizedListProps } from './types';
import { VirtualizedListSortIcon } from './VirtualizedListSortIcon';

export const VirtualizedList = <T extends object>({
  className,
  id,
  headers,
  rowSize,
  data,
  cells,
  customRowRender,
  mobile,
  padding,
  headerPadding,
  onDefaultRowClick,
}: VirtualizedListProps<T>) => {
  const listRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => listRef.current,
    estimateSize: () => rowSize,
  });

  const cn = useMemo(
    () =>
      classNames('virtualized-list-container', className, {
        'with-headers': !isUndefined(headers),
      }),
    [className, headers],
  );

  const { breakpoint } = useBreakpoint(deviceBreakpoints);
  /**
   *  Chromium based browsers are injecting scroll onto elements that overflow and that scrollbar is making layout shift by scroll width.
   *  While firefox and safari make their scrolls float above website.
   *  Padding on scroll-container is handled by css rule scroll-gutter: stable but it only affects chromium browsers so there should be no 4px padding on header when site is outside of chromium.
   *  **/
  const shouldAddScrollPadding = useMemo(() => {
    const browser = detect(navigator.userAgent);
    if (!browser) return false;
    switch (browser.name) {
      case 'ios':
        return false;
      case 'ios-webview':
        return false;
      case 'chrome':
        return true;
      case 'chromium-webview':
        return true;
      case 'edge-chromium':
        return true;
      default:
        return false;
    }
  }, []);

  const renderRow = (
    value: T,
    onDefaultRowClick?: (context: T) => void,
    index?: number,
  ) => {
    if (breakpoint !== 'desktop' && mobile?.enabled && mobile.renderer) {
      return mobile.renderer(value, index);
    }
    if (customRowRender) {
      return customRowRender(value, index);
    }
    return (
      <DefaultRowRender
        onClick={() => {
          onDefaultRowClick?.(value);
        }}
      >
        {cells?.map(({ render, onClick }, index) => (
          <div
            className={`cell-${index}`}
            key={index}
            onClick={() => {
              if (onClick) {
                onClick(value);
              }
            }}
          >
            {render(value)}
          </div>
        ))}
      </DefaultRowRender>
    );
  };

  const getRowPadding = useMemo(() => {
    let rightPadding = padding?.right || 0;
    if (shouldAddScrollPadding) {
      if (rightPadding > 9) {
        rightPadding = rightPadding - 9;
      } else {
        rightPadding = 0;
      }
    } else {
      if (rightPadding > 5) {
        rightPadding = rightPadding - 5;
      } else {
        rightPadding = 0;
      }
    }
    const res = {
      paddingBottom: padding?.bottom || 0,
      paddingTop: padding?.top || 0,
      paddingLeft: padding?.left || 0,
      paddingRight: rightPadding,
    };
    return res;
  }, [
    padding?.bottom,
    padding?.left,
    padding?.right,
    padding?.top,
    shouldAddScrollPadding,
  ]);

  const rowWidth = useMemo(() => {
    const { paddingLeft, paddingRight } = getRowPadding;
    if (paddingLeft || paddingRight) {
      let res = 0;
      res = +paddingLeft;
      res += paddingRight;
      return `calc(100% - ${res}px)`;
    }
    return '100%';
  }, [getRowPadding]);

  return (
    <div className={cn} id={id}>
      {headers && headers.length > 0 && (
        <div
          className="headers"
          style={{
            paddingBottom: headerPadding?.bottom || 0,
            paddingTop: headerPadding?.top || 0,
            paddingLeft: (getRowPadding.paddingLeft || 0) + (headerPadding?.left || 0),
            paddingRight:
              (getRowPadding?.paddingRight || 0) +
              (headerPadding?.right || 0) +
              (shouldAddScrollPadding ? 4 : 0),
          }}
        >
          {headers.map((header) =>
            header.customRender ? (
              header.customRender()
            ) : (
              <ListHeaderComponent {...header} key={header.key} />
            ),
          )}
        </div>
      )}
      <div
        className="scroll-container"
        ref={listRef}
        style={{
          overflow: 'auto',
          marginRight: 5,
        }}
      >
        <div
          className="rows-container"
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
            ...getRowPadding,
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualItem, index) => (
            <div
              className="virtual-row"
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: rowWidth,
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px) translateX(${
                  padding?.left || 0
                }px)`,
              }}
            >
              {renderRow(data[virtualItem.index], onDefaultRowClick, index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ListHeaderComponent = ({
  text,
  onClick,
  sortDirection,
  active = false,
  sortable = true,
}: ListHeader) => {
  const { x, y, strategy, refs, update } = useFloating({
    placement: 'right',
    middleware: [offset(5)],
    whileElementsMounted: autoUpdate,
  });

  const getIconAnimate = useMemo(() => {
    if (active) {
      switch (sortDirection) {
        case ListSortDirection.ASC:
          return 'asc';
        case ListSortDirection.DESC:
          return 'desc';
        default:
          return 'desc';
      }
    }
    return 'idle';
  }, [active, sortDirection]);

  const clickable = useMemo(() => !isUndefined(onClick), [onClick]);

  const cn = useMemo(
    () =>
      classNames('header', {
        active,
        clickable,
        sortable,
      }),
    [active, clickable, sortable],
  );

  // needs to update position of an element when navigation is expanding
  // TODO Make sure this is not causing any significant impact on UX, update is called around 100+ times per navigation action
  useEffect(() => {
    const element = document.querySelector('.page-content');
    if (element) {
      const observer = new ResizeObserver(() => {
        update();
      });
      observer.observe(element);
      return () => {
        observer?.unobserve(element);
      };
    }
  }, [update]);

  return (
    <div
      className={cn}
      onClick={() => {
        if (onClick && active) {
          onClick();
        }
      }}
    >
      <span ref={refs.setReference}>{text}</span>
      <div
        className="floating-header-icon"
        ref={refs.setFloating}
        style={{
          position: strategy,
          top: y ?? 0,
          left: x ?? 0,
          width: 'max-content',
        }}
      >
        <VirtualizedListSortIcon
          className={getIconAnimate}
          animate={getIconAnimate}
          variants={headerSortIconVariants}
          initial={false}
        />
      </div>
    </div>
  );
};

type DefaultRowRenderProps = {
  children?: ReactNode;
  onClick?: () => void;
};

const DefaultRowRender = ({ children, onClick }: DefaultRowRenderProps) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      variants={defaultRowContainerVariants}
      className="default-row"
      initial={false}
      animate={hovered ? 'hovered' : 'idle'}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

const defaultRowContainerVariants: Variants = {
  idle: {
    boxShadow: '5px 10px 20px rgba(0,0,0,0)',
  },
  hovered: {
    boxShadow: '5px 10px 20px rgba(0,0,0,0.1)',
  },
};

const headerSortIconVariants: Variants = {
  idle: {
    opacity: 0,
    rotateZ: 0,
  },
  asc: {
    opacity: 1,
    rotateZ: 180,
  },
  desc: {
    opacity: 1,
    rotateZ: 0,
  },
};
