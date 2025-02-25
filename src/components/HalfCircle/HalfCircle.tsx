import styles from "./HalfCircle.module.scss";

type Props = {
  fill: string;
};

export default function HalfCircle({ fill }: Props) {
  return (
    <div className={styles.swinging}>
      <svg width="100" height="100">
        <path d="M0,50 a1,1 0 0,0 100,0" fill={fill} />
      </svg>
    </div>
  );
}
