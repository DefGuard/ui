import './style.scss';

import millify from 'millify';
import { useMemo } from 'react';

type Props = {
  count: number;
  shorten?: boolean;
};

export const ListItemCount = ({ count, shorten = false }: Props) => {
  const display = useMemo(() => {
    if (shorten) {
      return millify(count, {
        precision: 1,
        lowercase: false,
        space: true,
      });
    }
    return count;
  }, [count, shorten]);

  return (
    <div className="list-item-count">
      <p>{display}</p>
    </div>
  );
};
