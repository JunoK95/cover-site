import React from "react";
import styles from "./NavigationOverlay.module.scss";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import joinClassnames from "../../utils/joinClassnames";
import { navigationList } from "../../constants/navigationList";

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
      <div role="button">
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
          {navigationList.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              label={item.label}
              icon={item.icon}
              color={item.color}
            />
          ))}
        </nav>
      </div>
      <header>
        <h1>JUNO</h1>
      </header>
      <footer>
        <nav>
          {navigationList.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              label={item.label}
              icon={item.icon}
              color={item.color}
            />
          ))}
        </nav>
      </footer>
    </div>
  );
}

export default NavigationOverlay;
