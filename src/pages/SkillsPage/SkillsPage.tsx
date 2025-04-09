import JelloText from "../../components/JelloText/JelloText";
import { colors } from "../../constants/colors";
import { PageLayout } from "../../layouts/PageLayout";
import joinClassnames from "../../utils/joinClassnames";
import styles from "./SkillsPage.module.scss";
// import SkillList from "../../components/SkillList/SkillList";
import CardCarousel from "../../components/CardCarousel/CardCarousel";
import { skillsList } from "@/constants/skillsList";

const leftContent = (
  <div className={joinClassnames([styles.left, styles.centered])}>
    <div className={styles.title}>
      <JelloText>SKILLS</JelloText>
    </div>
  </div>
);

const rightContent = () => {
  const skillKeys = Object.keys(skillsList);
  const skillCategories = [
    "Development",
    "Language",
    "Design",
    "Core",
    "Cloud",
    "Framework",
  ];
  const cards = skillCategories.map((category) => {
    const skills = skillKeys.filter((key) =>
      skillsList[key as keyof typeof skillsList].tags.includes(
        category.toLowerCase()
      )
    );
    return {
      title: category,
      skills,
    };
  });

  return (
    <div className={styles.right}>
      <CardCarousel cards={cards} />
    </div>
  );
};

function SkillsPage() {
  return (
    <PageLayout
      leftContent={leftContent}
      leftColor={colors.purple}
      rightContent={rightContent()}
    />
  );
}

export default SkillsPage;
