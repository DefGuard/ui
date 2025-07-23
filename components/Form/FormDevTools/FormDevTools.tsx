import './style.scss';

import { DevTool } from '@hookform/devtools';
import ReactDOM from 'react-dom';
import type { Control } from 'react-hook-form';

interface Props {
  // biome-ignore lint/suspicious/noExplicitAny: It's devtools
  control: Control<any, object>;
}

export const DevTools: React.FC<Props> = ({ control }: Props) => {
  const element = document.querySelector('#root');
  if (!element) return null;
  return ReactDOM.createPortal(
    <div className="dev-tools">
      <DevTool control={control} />
    </div>,
    element,
  );
};
