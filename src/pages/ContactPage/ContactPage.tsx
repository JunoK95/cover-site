import { colors } from "../../constants/colors";
import { PageLayout } from "../../layouts/PageLayout";

function ContactPage() {
  return (
    <PageLayout
      leftContent={<h1>CONTACT LEFT</h1>}
      leftColor={colors.brown}
      rightContent={<h1>CONTACT RIGHT</h1>}
    />
  );
}

export default ContactPage;
