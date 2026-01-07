import clsx from 'clsx';
import { Icon } from '../Icon';
import './style.scss';

type Props = {
  size?: number;
  variant?: 'empty' | 'primary';
};

export const LoaderSpinner = ({ size = 20, variant = 'empty' }: Props) => {
  return (
    <div className={clsx('loader-spinner', `variant-${variant}`)}>
      <Icon icon="loader" size={size} />
    </div>
  );
};
