import { motion, type SVGMotionProps } from 'framer-motion';

import { useTheme } from '../../../hooks/theme/useTheme';

type Props = SVGMotionProps<SVGSVGElement>;

export const VirtualizedListSortIcon = (props: Props) => {
  const { colors } = useTheme();
  return (
    <motion.svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} {...props}>
      <motion.g transform="rotate(-90 11 11)">
        <rect
          width={8}
          height={2}
          rx={1}
          transform="rotate(45 -7.4 14.862)"
          fill={colors.textBodyPrimary}
        />
        <rect
          width={8}
          height={2}
          rx={1}
          transform="rotate(135 5.672 6.106)"
          fill={colors.textBodyPrimary}
        />
      </motion.g>
    </motion.svg>
  );
};
