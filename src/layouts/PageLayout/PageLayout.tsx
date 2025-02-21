import { AnimatePresence, motion, MotionProps } from 'framer-motion';
import React from 'react';
import styles from './PageLayout.module.scss';
import joinClassnames from '../../utils/joinClassnames';

type Props = {
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
};

const leftAnimationProps: Partial<MotionProps> = {
  initial: {
    marginRight: '100vw',
  },
  animate: {
    marginRight: 0,
  },
};

const rightAnimationProps: Partial<MotionProps> = {
  initial: {
    marginRight: '100vw',
  },
  animate: {
    marginRight: 0,
  },
};

function PageLayout({ leftContent, rightContent }: Props) {
  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key='page-layout-section-one'
        className={joinClassnames([styles.section, styles.sectionOne])}
        {...leftAnimationProps}
      >
        {leftContent}
      </motion.div>
      <motion.div
        key='page-layout-section-two'
        className={joinClassnames([styles.section, styles.sectionTwo])}
        {...rightAnimationProps}
      >
        {rightContent}
      </motion.div>
    </AnimatePresence>
  );
}

export default PageLayout;
