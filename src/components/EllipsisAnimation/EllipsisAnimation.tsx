import styles from "./EllipsisAnimation.module.scss";

function EllipsisAnimation() {
  return (
    <span className={styles.bouncingDots}>
      <span className={styles.dot}>.</span>
      <span className={styles.dot}>.</span>
      <span className={styles.dot}>.</span>
    </span>
  );
}

export default EllipsisAnimation;
