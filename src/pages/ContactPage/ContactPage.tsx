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
    <div className={styles.contactItem}>
      <FontAwesomeIcon icon={faEnvelope} />
      <p>junokimemail@gmail.com</p>
    </div>
    <div className={styles.contactItem}>
      <FontAwesomeIcon icon={faGithub} />
      <p>junokimemail@gmail.com</p>
    </div>
    <div className={styles.contactItem}>
      <FontAwesomeIcon icon={faLinkedin} />
      <p>junokimemail@gmail.com</p>
    </div>
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
