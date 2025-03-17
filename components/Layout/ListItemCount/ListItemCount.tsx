import './style.scss';

type Props = {
  count: number;
};

export const ListItemCount = ({ count }: Props) => {
  return (
    <div className="list-item-count">
      <p>{count}</p>
    </div>
  );
};
