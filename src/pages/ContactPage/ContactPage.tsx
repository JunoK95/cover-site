import JelloText from "../../components/JelloText/JelloText";
import { colors } from "../../constants/colors";
import { PageLayout } from "../../layouts/PageLayout";
import joinClassnames from "../../utils/joinClassnames";
import styles from "./ContactPage.module.scss";

const leftContent = (
  <div className={joinClassnames([styles.left, styles.centered])}>
    <div className={styles.title}>
      <JelloText>Contact</JelloText>
    </div>
  </div>
);

function ContactPage() {
  return (
    <PageLayout
      leftContent={leftContent}
      leftColor={colors.brown}
      rightContent={<h1>CONTACT RIGHT</h1>}
    />
  );
}

export default ContactPage;
