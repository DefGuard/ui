import type { PropsWithChildren } from 'react';
import './style.scss';

export const TableTop = ({ text, children }: { text: string } & PropsWithChildren) => {
  return (
    <div className="table-top">
      <p className="title">{text}</p>
      <div className="right">{children}</div>
    </div>
  );
};
