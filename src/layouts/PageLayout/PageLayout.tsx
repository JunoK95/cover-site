import { AnimatePresence, motion, MotionProps } from "framer-motion";
import React from "react";
import styles from "./PageLayout.module.scss";
import joinClassnames from "../../utils/joinClassnames";

type Props = {
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
};

const leftAnimationProps: Partial<MotionProps> = {
  initial: {
    opacity: 0,
    marginLeft: 1000,
  },
  animate: {
    opacity: 1,
    marginLeft: 0,
  },
  exit: {
    opacity: 0,
    marginLeft: 1000,
  },
  transition: {
    duration: 2,
  },
};

const rightAnimationProps: Partial<MotionProps> = {};

function PageLayout({ leftContent, rightContent }: Props) {
  return (
    <div className={styles.container}>
      <motion.div
        key="page-layout-section-one"
        className={joinClassnames([styles.section, styles.sectionOne])}
        {...leftAnimationProps}
      >
        {leftContent}
      </motion.div>
      <motion.div
        key="page-layout-section-two"
        className={joinClassnames([styles.section, styles.sectionTwo])}
        {...rightAnimationProps}
      >
        {rightContent}
      </motion.div>
    </div>
  );
}

export default PageLayout;
