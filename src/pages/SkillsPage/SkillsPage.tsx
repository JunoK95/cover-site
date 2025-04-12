import JelloText from "../../components/JelloText/JelloText";
import { colors } from "../../constants/colors";
import { PageLayout } from "../../layouts/PageLayout";
import joinClassnames from "../../utils/joinClassnames";
import styles from "./SkillsPage.module.scss";
// import SkillList from "../../components/SkillList/SkillList";
import CardCarousel from "../../components/CardCarousel/CardCarousel";
import { skillsList } from "@/constants/skillsList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloud,
  faCode,
  faCube,
  faCubes,
  faDroplet,
  faLanguage,
  faPalette,
} from "@fortawesome/free-solid-svg-icons";

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
    "Styling",
    "Core",
    "Cloud",
    "Framework",
  ];

  const skillsIcons = [
    <FontAwesomeIcon icon={faCode} />,
    <FontAwesomeIcon icon={faLanguage} />,
    <FontAwesomeIcon icon={faPalette} />,
    <FontAwesomeIcon icon={faDroplet} />,
    <FontAwesomeIcon icon={faCube} />,
    <FontAwesomeIcon icon={faCloud} />,
    <FontAwesomeIcon icon={faCubes} />,
  ];

  const cards = skillCategories.map((category, index) => {
    const skills = skillKeys.filter((key) =>
      skillsList[key as keyof typeof skillsList].tags.includes(
        category.toLowerCase()
      )
    );

    const skillNames = skills.map(
      (key) => skillsList[key as keyof typeof skillsList].name
    );
    return {
      title: category,
      skills: skillNames.sort((a, b) => a.localeCompare(b)),
      icon: skillsIcons[index],
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
