import type { PropsWithChildren } from 'react';
import './style.scss';
import { isPresent } from '../../../utils/isPresent';
import { Search } from '../../Search/Search';

type Props = {
  text: string;
  onSearch?: (val: string) => void;
  initialSearch?: string;
  searchPlaceholder?: string;
} & PropsWithChildren;

export const TableTop = ({
  text,
  onSearch,
  initialSearch,
  searchPlaceholder,
  children,
}: Props) => {
  return (
    <div className="table-top">
      <p className="title">{text}</p>
      <div className="right">
        {isPresent(onSearch) && (
          <Search
            initialValue={initialSearch}
            onChange={onSearch}
            placeholder={searchPlaceholder}
          />
        )}
        {children}
      </div>
    </div>
  );
};
