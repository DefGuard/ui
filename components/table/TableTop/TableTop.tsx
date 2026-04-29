import type { PropsWithChildren } from 'react';
import './style.scss';

type Props = {
  text: string;
} & PropsWithChildren;

export const TableTop = ({ text, children }: Props) => {
  return (
    <div className="table-top">
      <p className="title">{text}</p>
      <div className="right">{children}</div>
    </div>
  );
};
