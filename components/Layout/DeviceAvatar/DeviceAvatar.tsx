import './style.scss';

import { HTMLMotionProps, motion, Variants } from 'framer-motion';
import { useMemo } from 'react';

import SvgAvatar01Blue from '../../../../components/svg/Avatar01Blue';
import SvgAvatar01Gray from '../../../../components/svg/Avatar01Gray';
import SvgAvatar02Blue from '../../../../components/svg/Avatar02Blue';
import SvgAvatar02Gray from '../../../../components/svg/Avatar02Gray';
import SvgAvatar03Blue from '../../../../components/svg/Avatar03Blue';
import SvgAvatar03Gray from '../../../../components/svg/Avatar03Gray';
import SvgAvatar04Blue from '../../../../components/svg/Avatar04Blue';
import SvgAvatar04Gray from '../../../../components/svg/Avatar04Gray';
import SvgAvatar05Blue from '../../../../components/svg/Avatar05Blue';
import SvgAvatar05Gray from '../../../../components/svg/Avatar05Gray';
import SvgAvatar06Blue from '../../../../components/svg/Avatar06Blue';
import SvgAvatar06Gray from '../../../../components/svg/Avatar06Gray';
import SvgAvatar07Blue from '../../../../components/svg/Avatar07Blue';
import SvgAvatar07Gray from '../../../../components/svg/Avatar07Gray';
import SvgAvatar08Blue from '../../../../components/svg/Avatar08Blue';
import SvgAvatar08Gray from '../../../../components/svg/Avatar08Gray';
import SvgAvatar09Blue from '../../../../components/svg/Avatar09Blue';
import SvgAvatar09Gray from '../../../../components/svg/Avatar09Gray';
import SvgAvatar10Blue from '../../../../components/svg/Avatar10Blue';
import SvgAvatar10Gray from '../../../../components/svg/Avatar10Gray';
import SvgAvatar11Blue from '../../../../components/svg/Avatar11Blue';
import SvgAvatar11Gray from '../../../../components/svg/Avatar11Gray';
import SvgAvatar12Blue from '../../../../components/svg/Avatar12Blue';
import SvgAvatar12Gray from '../../../../components/svg/Avatar12Gray';
import { ColorsRGB } from '../../../../constants';
import { DeviceAvatarVariants } from './types';
import { getDeviceAvatar } from './utils/getDeviceAvatar';

interface Props extends HTMLMotionProps<'div'> {
  active?: boolean;
  styleVariant?: DeviceAvatarVariants;
  deviceId?: number;
}

// NOTE: This matter should be discussed later.
// Each avatar contains 12 svg parts that when displayed together makes whole shape.
// Each device should have some identifier that will determinate the shape of it's avatar.

const blue: JSX.Element[] = [
  <SvgAvatar01Blue key={1} />,
  <SvgAvatar02Blue key={2} />,
  <SvgAvatar03Blue key={3} />,
  <SvgAvatar04Blue key={4} />,
  <SvgAvatar05Blue key={5} />,
  <SvgAvatar06Blue key={6} />,
  <SvgAvatar07Blue key={7} />,
  <SvgAvatar08Blue key={8} />,
  <SvgAvatar09Blue key={9} />,
  <SvgAvatar10Blue key={10} />,
  <SvgAvatar11Blue key={11} />,
  <SvgAvatar12Blue key={12} />,
];
const gray: JSX.Element[] = [
  <SvgAvatar01Gray key={1} />,
  <SvgAvatar02Gray key={2} />,
  <SvgAvatar03Gray key={3} />,
  <SvgAvatar04Gray key={4} />,
  <SvgAvatar05Gray key={5} />,
  <SvgAvatar06Gray key={6} />,
  <SvgAvatar07Gray key={7} />,
  <SvgAvatar08Gray key={8} />,
  <SvgAvatar09Gray key={9} />,
  <SvgAvatar10Gray key={10} />,
  <SvgAvatar11Gray key={11} />,
  <SvgAvatar12Gray key={12} />,
];

/**
 * Displays avatar for user devices.
 * @param active Determinate style variant.
 */
export const DeviceAvatar = ({
  active = true,
  styleVariant = DeviceAvatarVariants.BLANK,
  deviceId,
  ...props
}: Props) => {
  const deviceAvatar = useMemo(() => {
    if (deviceId) {
      const elements = getDeviceAvatar(deviceId);
      const result: JSX.Element[] = blue.filter((el) => {
        if (!elements.includes(Number(el.key))) {
          return true;
        }
      });
      return result as JSX.Element[];
    }
  }, [deviceId]);

  const avatar = useMemo(() => {
    if (active) {
      if (deviceId && deviceAvatar) {
        return deviceAvatar;
      } else {
        return blue;
      }
    } else {
      return gray;
    }
  }, [active, deviceAvatar, deviceId]);

  const getClassName = useMemo(() => {
    const res = ['avatar-icon'];
    if (active) {
      res.push('active');
    }
    res.push(styleVariant.valueOf());
    return res.join(' ');
  }, [active, styleVariant]);

  const getAnimate = useMemo(() => {
    return styleVariant.valueOf();
  }, [styleVariant]);

  return (
    <motion.div
      {...props}
      variants={containerVariants}
      className={getClassName}
      initial={false}
      animate={getAnimate}
    >
      {avatar}
    </motion.div>
  );
};

const containerVariants: Variants = {
  blank: {
    backgroundColor: 'transparent',
    borderRadius: '0px',
  },
  grayBox: {
    backgroundColor: ColorsRGB.BgLight,
    borderRadius: '10px',
  },
};
