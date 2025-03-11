import JelloText from "../../components/JelloText/JelloText";
import { colors } from "../../constants/colors";
import { PageLayout } from "../../layouts/PageLayout";
import joinClassnames from "../../utils/joinClassnames";
import styles from "./ProjectsPage.module.scss";

const leftContent = (
  <div className={joinClassnames([styles.left, styles.centered])}>
    <div className={styles.title}>
      <JelloText>Projects</JelloText>
    </div>
  </div>
);

function ProjectsPage() {
  return (
    <PageLayout
      leftContent={leftContent}
      leftColor={colors.turquois}
      rightContent={<h1>PROJECTS RIGHT</h1>}
    />
  );
}

export default ProjectsPage;
