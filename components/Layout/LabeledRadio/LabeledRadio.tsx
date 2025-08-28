import './style.scss';
import clsx from 'clsx';
import { isPresent } from '../../../utils/isPresent';

type Props = {
  active: boolean;
  onClick?: () => void;
  label?: string;
  reverseOrder?: boolean;
  disabled?: boolean;
};

export const LabeledRadio = ({
  active,
  label,
  onClick,
  reverseOrder = false,
  disabled = false,
}: Props) => {
  return (
    <div className="labeled-radio spacer">
      <div
        className={clsx('inner', {
          reverse: reverseOrder,
          disabled,
        })}
        onClick={() => {
          if (!disabled) {
            onClick?.();
          }
        }}
      >
        <div className="icon">
          {active && <ActiveIcon />}
          {!active && <InactiveIcon />}
        </div>
        {isPresent(label) && <p>{label}</p>}
      </div>
    </div>
  );
};

const ActiveIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      fill="none"
      viewBox="0 0 18 18"
    >
      <rect
        width={16}
        height={16}
        x={1}
        y={1}
        style={{ stroke: 'var(--surface-main-primary)' }}
        strokeWidth={2}
        rx={8}
      />
      <path
        d="M5 9a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z"
        style={{ fill: 'var(--surface-main-primary)' }}
      />
    </svg>
  );
};

const InactiveIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      fill="none"
      viewBox="0 0 20 20"
    >
      <rect
        width={18}
        height={18}
        x={1}
        y={1}
        style={{ fill: 'var(--surface-button)' }}
        rx={9}
      />
      <rect
        width={18}
        height={18}
        x={1}
        y={1}
        rx={9}
        style={{ stroke: 'var(--border-primary)' }}
      />
    </svg>
  );
};
