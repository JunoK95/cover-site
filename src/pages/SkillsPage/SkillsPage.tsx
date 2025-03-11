import JelloText from "../../components/JelloText/JelloText";
import { colors } from "../../constants/colors";
import { PageLayout } from "../../layouts/PageLayout";
import joinClassnames from "../../utils/joinClassnames";
import styles from "./SkillsPage.module.scss";

const leftContent = (
  <div className={joinClassnames([styles.left, styles.centered])}>
    <div className={styles.title}>
      <JelloText>SKILLS</JelloText>
    </div>
  </div>
);

function SkillsPage() {
  return (
    <PageLayout
      leftContent={leftContent}
      leftColor={colors.purple}
      rightContent={<h1>SKILL RIGHT</h1>}
    />
  );
}

export default SkillsPage;
