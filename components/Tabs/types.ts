import type { ThemeVariableValue } from '../../types';
import type { IconKindValue } from '../Icon';

export type TabProps = TabsItem;

export interface TabsItem {
  title: string;
  active?: boolean;
  hidden?: boolean;
  onClick: () => void;
  icon?: IconKindValue;
  iconColor?: ThemeVariableValue;
}

export interface TabsProps {
  items: TabsItem[];
  disablePadding?: boolean;
}
