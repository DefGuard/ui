import { type HTMLProps, type Ref, useMemo, useState } from 'react';
import './style.scss';
import clsx from 'clsx';
import type { SelectionOption } from '../../../../components/SelectionSection/type';
import { ThemeSpacing } from '../../../types';
import { Button } from '../../Button/Button';
import { Checkbox } from '../../Checkbox/Checkbox';
import { Divider } from '../../Divider/Divider';
import { Search } from '../../Search/Search';
import { SizedBox } from '../../SizedBox/SizedBox';
import type { TableFilterMessages } from '../types';

type Props<T> = {
  title: string;
  ref?: Ref<HTMLDivElement>;
  boxProps?: HTMLProps<HTMLDivElement>;
  selected?: Set<T>;
  options: SelectionOption<T>[];
  messages: TableFilterMessages;
  onChange: (value: Array<T>) => void;
};

export const TableHeaderFilterFloating = <T extends string | number>({
  title,
  ref,
  boxProps,
  options,
  messages,
  onChange,
  selected: initialSelection,
}: Props<T>) => {
  const [search, setSearch] = useState<string>('');
  const [selected, setSelected] = useState<Set<T>>(new Set(initialSelection));

  const visibleOptions = useMemo(() => {
    let result = options;
    const searchLower = search?.trim().toLowerCase();
    if (searchLower?.length) {
      result = result.filter((option) =>
        option.searchFields?.length
          ? option.searchFields.some((searchField) =>
              searchField.toLowerCase().includes(searchLower),
            )
          : option.label.toLowerCase().includes(searchLower),
      );
    }
    return result;
  }, [options, search]);

  return (
    <div
      {...boxProps}
      ref={ref}
      className={clsx('table-header-filter-floating', boxProps?.className)}
    >
      <div className="top">
        <p className="title">{title}</p>
        {selected.size > 0 && (
          <button
            className="clear-btn"
            onClick={() => {
              setSelected(new Set());
              setSearch('');
            }}
          >
            {messages.clearButton}
          </button>
        )}
      </div>
      <Divider spacing={ThemeSpacing.Lg} />
      <Search
        placeholder={messages.searchPlaceholder}
        initialValue={search}
        onChange={setSearch}
        value={search}
      />
      <SizedBox height={ThemeSpacing.Md} />
      {visibleOptions.length > 0 && (
        <>
          <div className="options" role="list">
            {visibleOptions.map((option) => {
              const active = selected.has(option.id);
              return (
                <Checkbox
                  active={active}
                  onClick={() => {
                    if (active) {
                      const clone = new Set(selected);
                      clone.delete(option.id);
                      setSelected(clone);
                    } else {
                      const clone = new Set(selected);
                      clone.add(option.id);
                      setSelected(clone);
                    }
                  }}
                  text={option.label}
                  key={option.id}
                />
              );
            })}
          </div>
          <SizedBox height={ThemeSpacing.Xl} />
          <Button
            text={messages.applyButton}
            variant="primary"
            onClick={() => {
              const converted = Array.from(selected);
              onChange(converted);
            }}
          />
        </>
      )}
      {visibleOptions.length === 0 && <p className="empty">{messages.emptyState}</p>}
    </div>
  );
};
