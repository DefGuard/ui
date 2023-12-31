import './style.scss';

import { motion } from 'framer-motion';

type Props = {
  size?: number;
  color?: string;
};

export const LoaderSpinner = ({ size = 20, color }: Props) => {
  return (
    <motion.div
      className="loader-spinner"
      style={{
        width: size,
        height: size,
      }}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 108 108"
        width={size}
        height={size}
        animate={{
          rotate: 360,
        }}
        transition={{
          repeat: Infinity,
          repeatDelay: 0,
          type: 'tween',
          ease: 'linear',
          duration: 1,
        }}
      >
        <motion.path
          d="M54,6 A48,48 0 0 1 54,102 A48,48 0 0 1 54,6 Z"
          fill="none"
          strokeWidth="5"
          strokeDasharray="300"
          strokeDashoffset="100"
          style={{
            stroke: color ?? undefined,
          }}
          animate={{
            strokeDashoffset: [100, 0, 100],
          }}
          transition={{
            repeat: Infinity,
            repeatDelay: 1,
            type: 'tween',
            ease: 'linear',
            duration: 1,
          }}
        />
      </motion.svg>
    </motion.div>
  );
};
