import React from "react";
import styles from "./NavigationOverlay.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faEnvelope,
  faGraduationCap,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";

type Props = {
  children?: React.ReactNode;
};

function NavigationOverlay({ children }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.leftBar}></div>
      <div className={styles.content}>{children}</div>
      <div className={styles.rightBar}>
        <nav>
          <Link to={"/"}>
            <FontAwesomeIcon icon={faHouse} />
          </Link>
          <Link to={"/skills"}>
            <FontAwesomeIcon icon={faGraduationCap} />
          </Link>
          <Link to={"/projects"}>
            <FontAwesomeIcon icon={faBook} />
          </Link>
          <Link to={"/contact"}>
            <FontAwesomeIcon icon={faEnvelope} />
          </Link>
        </nav>
      </div>
      <header>
        <h1>JUNO</h1>
      </header>
      <footer></footer>
    </div>
  );
}

export default NavigationOverlay;
