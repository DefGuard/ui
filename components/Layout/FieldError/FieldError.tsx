import './style.scss';

import { AnimatePresence, motion } from 'framer-motion';

import { isPresent } from '../../../utils/isPresent';

type Props = {
  errorMessage?: string;
  disabled?: boolean;
};

export const FieldError = ({ errorMessage, disabled = false }: Props) => {
  return (
    <AnimatePresence>
      {!disabled && isPresent(errorMessage) && (
        <motion.span
          className="field-error"
          initial={{
            x: 0,
            opacity: 0,
          }}
          animate={{
            x: 20,
            opacity: 1,
          }}
          exit={{
            opacity: 0,
            x: 0,
          }}
        >
          {errorMessage}
        </motion.span>
      )}
    </AnimatePresence>
  );
};
