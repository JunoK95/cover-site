import React from "react";
import styles from "./JelloText.module.scss";

type Props = {
  children: React.ReactNode;
};

function JelloText({ children }: Props) {
  return <div className={styles.jelloText}>{children}</div>;
}

export default JelloText;
