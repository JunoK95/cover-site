import React from 'react';
import styles from './NavigationOverlay.module.scss';
import { Link } from 'react-router-dom';

type Props = {
  children?: React.ReactNode;
};

function NavigationOverlay({ children }: Props) {
  return (
    <div className={styles.container}>
      <header></header>
      <div className={styles.leftBar}></div>
      <div className={styles.content}>{children}</div>
      <div className={styles.rightBar}>
        <Link to={'/'}>Home</Link>
        <Link to={'/skills'}>Skills</Link>
      </div>
      <footer></footer>
    </div>
  );
}

export default NavigationOverlay;
