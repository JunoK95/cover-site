import HalfCircle from "../../components/HalfCircle/HalfCircle";
import JelloText from "../../components/JelloText/JelloText";
import { PageLayout } from "../../layouts/PageLayout";
import joinClassnames from "../../utils/joinClassnames";
import styles from "./HomePage.module.scss";
import { colors } from "../../constants/colors";

const leftContent = (
  <div className={joinClassnames([styles.left, styles.centered])}>
    <span className={styles.divDecor}>{`<div>`}</span>
    <span className={styles.subtitle}>Hi I'm</span>
    <div className={styles.title}>
      <JelloText>JUNO</JelloText>
    </div>
    <span className={joinClassnames([styles.subtitle, styles.alignRight])}>
      - Frontend Engineer
    </span>
    <span className={styles.divDecor}>{`</div>`}</span>
  </div>
);

const rightContent = (
  <div className={joinClassnames([styles.right, styles.centered])}>
    <p>
      Passionate about building responsive, user-friendly web applications using
      modern JavaScript frameworks. I focus on clean code, performance
      optimization, and creating seamless and creative user experiences that
      engage and delight.
    </p>
    <HalfCircle fill={"#FF5851"} />
  </div>
);

function HomePage() {
  return (
    <PageLayout
      leftContent={leftContent}
      leftColor={colors.red}
      rightContent={rightContent}
    />
  );
}

export default HomePage;
