import type { IconKindValue } from '../Icon';

export type TabProps = TabsItem;

export interface TabsItem {
  title: string;
  active?: boolean;
  hidden?: boolean;
  onClick: () => void;
  icon?: IconKindValue;
}

export interface TabsProps {
  items: TabsItem[];
  disablePadding?: boolean;
}
