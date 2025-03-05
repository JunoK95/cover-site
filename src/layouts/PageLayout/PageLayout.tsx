import { motion, MotionProps } from "framer-motion";
import React from "react";
import styles from "./PageLayout.module.scss";
import joinClassnames from "../../utils/joinClassnames";
import { useLocation } from "react-router-dom";

type Props = {
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  leftColor?: string;
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
    ease: "easeOut",
  },
};

const contentAnimationProps: Partial<MotionProps> = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.25,
      delay: 0,
    },
  },
  transition: {
    duration: 0.25,
    delay: 0.6,
  },
};

function PageLayout({ leftContent, rightContent, leftColor }: Props) {
  const location = useLocation();

  return (
    <motion.div className={styles.container}>
      <motion.div
        key={`page-layout-section-one-${location.pathname}`}
        className={joinClassnames([styles.section, styles.sectionOne])}
        style={{ backgroundColor: leftColor }}
        {...leftAnimationProps}
      >
        <motion.div {...contentAnimationProps}>{leftContent}</motion.div>
      </motion.div>
      <motion.div
        key={`page-layout-section-two-${location.pathname}`}
        className={joinClassnames([styles.section, styles.sectionTwo])}
        {...rightAnimationProps}
      >
        <motion.div {...contentAnimationProps}>{rightContent}</motion.div>
      </motion.div>
    </motion.div>
  );
}

export default PageLayout;
