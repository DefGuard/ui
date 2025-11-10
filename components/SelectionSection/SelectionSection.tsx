import { useCallback, useMemo, useState } from 'react';
import './style.scss';
import { useDebounce } from '@uidotdev/usehooks';
import clsx from 'clsx';
import { orderBy } from 'lodash-es';
import { ThemeSpacing } from '../../types';
import { Checkbox } from '../Checkbox/Checkbox';
import { Divider } from '../Divider/Divider';
import { Input } from '../Input/Input';
import { SizedBox } from '../SizedBox/SizedBox';
import type {
  SelectionSectionKey,
  SelectionSectionOption,
  SelectionSectionProps,
} from './type';

//TODO: virtualize items
export const SelectionSection = <T extends SelectionSectionKey>({
  onChange,
  options,
  selection,
  className,
  id,
  searchPlaceholder,
  selectedOnlyText,
  selectAllText,
  itemGap = 8,
  itemHeight = 24,
}: SelectionSectionProps<T>) => {
  const [onlySelected, setOnlySelected] = useState(false);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 200);

  const visibleOptions = useMemo(() => {
    let res = options;
    if (onlySelected) {
      res = res.filter((o) => selection.has(o.id));
    }
    const trimmedSearch = debouncedSearch?.trim().toLowerCase();
    if (trimmedSearch) {
      res = res.filter((option) => {
        if (option.searchFields) {
          return option.searchFields.some((val) =>
            val.toLowerCase().includes(trimmedSearch),
          );
        }
        return option.label.toLowerCase().includes(trimmedSearch);
      });
    }
    return res;
  }, [options, onlySelected, selection, debouncedSearch]);

  const handleSelect = useCallback(
    (option: SelectionSectionOption<T>, selected: boolean, selection: Set<T>) => {
      const clone = new Set(selection);
      if (selected) {
        clone.delete(option.id);
      } else {
        clone.add(option.id);
      }
      onChange(clone);
    },
    [onChange],
  );

  const maxHeight = useMemo(() => itemHeight * 10 + itemGap * 9, [itemGap, itemHeight]);

  return (
    <div className={clsx('selection-section', className)} id={id}>
      <Input
        placeholder={searchPlaceholder}
        value={search}
        type="search"
        onChange={setSearch}
      />
      <SizedBox height={ThemeSpacing.Xl} />
      <div className="actions">
        <Checkbox text={selectAllText} disabled />
        <div className="right">
          <div
            className="selected-filter"
            role="button"
            onClick={() => {
              setOnlySelected((s) => !s);
            }}
          >
            <span>{selectedOnlyText}</span>
          </div>
        </div>
      </div>
      <Divider spacing={ThemeSpacing.Md} />
      <div
        className="items-box"
        style={{
          height: maxHeight,
          maxHeight,
        }}
      >
        <div
          className="inner"
          style={{
            rowGap: itemGap,
          }}
        >
          {orderBy(
            visibleOptions,
            (item) => item.label.toLowerCase().replaceAll(' ', ''),
            ['asc'],
          ).map((option) => {
            const selected = selection.has(option.id);
            return (
              <div
                className="item"
                key={option.id}
                style={{
                  minHeight: itemHeight,
                }}
              >
                <Checkbox
                  active={selected}
                  text={option.label}
                  onClick={() => {
                    handleSelect(option, selected, selection);
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
