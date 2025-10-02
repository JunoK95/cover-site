import React, { useState } from "react";
import { AnimatePresence, motion, MotionProps } from "framer-motion";

interface SkillListProps {
  title: string;
  skills: string[];
}

const listAnimationProps: Partial<MotionProps> = {
  initial: {
    opacity: 0,
    height: 0,
  },
  animate: {
    opacity: 1,
    height: "auto",
  },
  exit: {
    opacity: 0,
    height: 0,
  },
  transition: {
    duration: 0.4,
    ease: "easeInOut",
  },
};

const SkillList: React.FC<SkillListProps> = ({ title, skills }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <AnimatePresence>
      <div>
        <h3 onClick={toggleAccordion} style={{ cursor: "pointer" }}>
          {title} {isExpanded ? "▲" : "▼"}
        </h3>
        {isExpanded && (
          <motion.div {...listAnimationProps}>
            <ul>
              {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
};

export default SkillList;
