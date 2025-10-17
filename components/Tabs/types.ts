export type TabProps = TabsItem;

export interface TabsItem {
  title: string;
  active?: boolean;
  onClick: () => void;
}

export interface TabsProps {
  items: TabsItem[];
}
