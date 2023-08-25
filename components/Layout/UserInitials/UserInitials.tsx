import './style.scss';

import classNames from 'classnames';
import { HTMLMotionProps, motion } from 'framer-motion';

import { extractInitials } from '../../../../utils/extractInitials';

type Props = HTMLMotionProps<'div'> & {
  first_name: string;
  last_name: string;
};

/**
 * Displays styled semi avatar box with user initials as a content.
 * @param first_name first name from User type
 * @param last_name last name from User type
 */
export const UserInitials = ({ first_name, last_name, className, ...rest }: Props) => {
  const cn = classNames('user-initials-box', className);
  return (
    <motion.span className={cn} {...rest}>
      <motion.span>{extractInitials(`${first_name} ${last_name}`)}</motion.span>
    </motion.span>
  );
};
