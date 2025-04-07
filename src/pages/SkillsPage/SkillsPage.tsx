import JelloText from "../../components/JelloText/JelloText";
import { colors } from "../../constants/colors";
import { PageLayout } from "../../layouts/PageLayout";
import joinClassnames from "../../utils/joinClassnames";
import styles from "./SkillsPage.module.scss";
// import SkillList from "../../components/SkillList/SkillList";
import CardCarousel from "../../components/CardCarousel/CardCarousel";

const leftContent = (
  <div className={joinClassnames([styles.left, styles.centered])}>
    <div className={styles.title}>
      <JelloText>SKILLS</JelloText>
    </div>
  </div>
);

const rightContent = (
  <div className={styles.right}>
    <CardCarousel />
    {/* <SkillList title={"Development"} skills={["hello", "world"]} />
    <SkillList title={"Language"} skills={["hello", "world"]} />
    <SkillList title={"Design"} skills={["hello", "world"]} />
    <SkillList title={"Core"} skills={["hello", "world"]} />
    <SkillList title={"Cloud"} skills={["hello", "world"]} />
    <SkillList title={"Framework"} skills={["hello", "world"]} /> */}
  </div>
);

function SkillsPage() {
  return (
    <PageLayout
      leftContent={leftContent}
      leftColor={colors.purple}
      rightContent={rightContent}
    />
  );
}

export default SkillsPage;
