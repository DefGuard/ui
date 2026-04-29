import './style.scss';
import { ThemeVariable } from '../../types';
import { Icon, type IconKindValue } from '../Icon';

interface Props {
  icon: IconKindValue;
}

export const SectionMarker = ({ icon }: Props) => {
  return (
    <div className="section-marker">
      <div className="bg"></div>
      <Icon icon={icon} size={20} staticColor={ThemeVariable.FgAction} />
    </div>
  );
};
