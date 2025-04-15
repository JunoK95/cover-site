import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import JelloText from "../../components/JelloText/JelloText";
import { colors } from "../../constants/colors";
import { PageLayout } from "../../layouts/PageLayout";
import joinClassnames from "../../utils/joinClassnames";
import styles from "./ContactPage.module.scss";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const leftContent = (
  <div className={joinClassnames([styles.left, styles.centered])}>
    <div className={styles.title}>
      <JelloText>Contact</JelloText>
    </div>
  </div>
);

const rightContent = (
  <div className={styles.right}>
    <a
      href={`mailto:${import.meta.env.VITE_EMAIL}`}
      className={styles.contactItem}
    >
      <FontAwesomeIcon icon={faEnvelope} />
      <p>{import.meta.env.VITE_EMAIL}</p>
    </a>
    <a href={import.meta.env.VITE_GITHUB} className={styles.contactItem}>
      <FontAwesomeIcon icon={faGithub} />
      <p>Github</p>
    </a>
    <a href={import.meta.env.VITE_LINKEDIN} className={styles.contactItem}>
      <FontAwesomeIcon icon={faLinkedin} />
      <p>LinkedIn</p>
    </a>
  </div>
);

function ContactPage() {
  return (
    <PageLayout
      leftContent={leftContent}
      leftColor={colors.brown}
      rightContent={rightContent}
    />
  );
}

export default ContactPage;
