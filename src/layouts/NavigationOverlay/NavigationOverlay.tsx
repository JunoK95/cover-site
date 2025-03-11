import React from "react";
import styles from "./NavigationOverlay.module.scss";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faEnvelope,
  faGraduationCap,
  faHouse,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../constants/colors";
import joinClassnames from "../../utils/joinClassnames";

type NavItemProps = {
  to: string;
  icon: IconDefinition;
  label: string;
  color: string;
};

const NavItem = ({ to, icon, label }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        joinClassnames([styles[label], isActive ? styles.active : ""])
      }
    >
      <div>
        <FontAwesomeIcon icon={icon} />
        <label>{label}</label>
      </div>
    </NavLink>
  );
};

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
          <NavItem to={"/"} label="home" icon={faHouse} color={colors.red} />
          <NavItem
            to={"/skills"}
            label="skills"
            icon={faGraduationCap}
            color={colors.purple}
          />
          <NavItem
            to={"/projects"}
            label="projects"
            icon={faBook}
            color={colors.turquois}
          />
          <NavItem
            to={"/contact"}
            label="contact"
            icon={faEnvelope}
            color={colors.brown}
          />
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
