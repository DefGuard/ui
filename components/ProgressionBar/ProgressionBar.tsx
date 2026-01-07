import './style.scss';

type Props = {
  value: number;
  maxValue: number;
};

export const ProgressionBar = ({ value, maxValue }: Props) => {
  const percentage =
    maxValue > 0 ? Math.min(100, Math.max(0, Math.ceil((value / maxValue) * 100))) : 0;
  return (
    <div className="progression-bar">
      <div
        className="bar"
        style={{
          width: `${percentage}%`,
        }}
      ></div>
    </div>
  );
};
