import { ThemeSpacing } from '../../types';
import { SizedBox } from '../SizedBox/SizedBox';
import './style.scss';
import { Tab } from './Tab';
import type { TabsProps } from './types';

export const Tabs = ({ items }: TabsProps) => {
  return (
    <div className="tabs">
      <div className="track">
        <div className="line" />
        <SizedBox height={1} width={ThemeSpacing.Xl2} />
        {items.map((item) => (
          <Tab key={item.title} {...item} />
        ))}
        <SizedBox height={1} width={ThemeSpacing.Xl2} />
      </div>
    </div>
  );
};
