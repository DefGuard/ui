import { useMemo } from 'react';
import { ThemeSpacing } from '../../types';
import { SizedBox } from '../SizedBox/SizedBox';
import './style.scss';
import { Tab } from './Tab';
import type { TabsProps } from './types';

export const Tabs = ({ items, disablePadding = false }: TabsProps) => {
  const visibleItems = useMemo(() => items.filter((item) => !item.hidden), [items]);

  return (
    <div className="tabs">
      <div className="track">
        <div className="line" />
        {!disablePadding && <SizedBox height={1} width={ThemeSpacing.Xl2} />}
        {visibleItems.map((item) => (
          <Tab key={item.title} {...item} />
        ))}
        {!disablePadding && <SizedBox height={1} width={ThemeSpacing.Xl2} />}
      </div>
    </div>
  );
};
