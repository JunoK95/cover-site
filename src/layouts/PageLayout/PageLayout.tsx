import { motion, MotionProps } from "framer-motion";
import React from "react";
import styles from "./PageLayout.module.scss";
import joinClassnames from "../../utils/joinClassnames";
import { useLocation } from "react-router-dom";

type Props = {
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
};

const leftAnimationProps: Partial<MotionProps> = {
  initial: {
    top: 0,
    left: "55%",
    zIndex: -1,
  },
  animate: {
    left: 0,
  },
  exit: {
    opacity: 0,
    top: "105%",
  },
  transition: {
    duration: 0.4,
  },
};

const rightAnimationProps: Partial<MotionProps> = {
  initial: {
    zIndex: 1,
  },
  animate: {
    zIndex: [1, 0, 0],
  },
  exit: {
    zIndex: -1,
  },
  transition: {
    duration: 0.4,
    times: [0, 0.5, 1],
  },
};

function PageLayout({ leftContent, rightContent }: Props) {
  const location = useLocation();

  return (
    <motion.div className={styles.container}>
      <motion.div
        key={`page-layout-section-one-${location.pathname}`}
        className={joinClassnames([styles.section, styles.sectionOne])}
        {...leftAnimationProps}
      >
        <motion.div></motion.div>
        {leftContent}
      </motion.div>
      <motion.div
        key={`page-layout-section-two-${location.pathname}`}
        className={joinClassnames([styles.section, styles.sectionTwo])}
        {...rightAnimationProps}
      >
        {rightContent}
      </motion.div>
    </motion.div>
  );
}

export default PageLayout;
