import './style.scss';

import { isPresent } from '../../../utils/isPresent';
import SvgIconCopy from '../../svg/IconCopy';
import { InteractionBox } from '../InteractionBox/InteractionBox';
import { ListCellText } from '../ListCellText/ListCellText';

type Props = {
  label?: string;
  value: string;
  onCopy: (value: string) => void;
};

export const CopyField = ({ onCopy, value, label }: Props) => {
  return (
    <div className="copy-field spacer">
      {isPresent(label) && label.length > 0 && <p className="label">{label}</p>}
      <div className="box">
        <div className="track">
          <ListCellText placement="bottom" text={value} />
          <div className="copy">
            <InteractionBox
              onClick={() => {
                onCopy(value);
              }}
            >
              <SvgIconCopy />
            </InteractionBox>
          </div>
        </div>
      </div>
    </div>
  );
};
