import clsx from 'clsx';
import './style.scss';

type Props = {
  value: number;
  maxValue: number;
  disableDynamicColor?: boolean;
};

export const ProgressionBar = ({
  value,
  maxValue,
  disableDynamicColor = false,
}: Props) => {
  const percentage =
    maxValue > 0 ? Math.min(100, Math.max(0, Math.ceil((value / maxValue) * 100))) : 0;
  return (
    <div
      className={clsx('progression-bar', {
        warning: !disableDynamicColor && percentage >= 50 && percentage !== 100,
        critical: !disableDynamicColor && percentage === 100,
      })}
    >
      <div
        className="bar"
        style={{
          width: `${percentage}%`,
        }}
      ></div>
    </div>
  );
};
