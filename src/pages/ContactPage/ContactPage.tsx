import { PageLayout } from "../../layouts/PageLayout";

function ContactPage() {
  return (
    <PageLayout
      leftContent={<h1>CONTACT LEFT</h1>}
      rightContent={<h1>CONTACT RIGHT</h1>}
    />
  );
}

export default ContactPage;
