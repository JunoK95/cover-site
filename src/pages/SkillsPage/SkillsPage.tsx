import { colors } from "../../constants/colors";
import { PageLayout } from "../../layouts/PageLayout";

function SkillsPage() {
  return (
    <PageLayout
      leftContent={<h1>SKILL LEFT</h1>}
      leftColor={colors.purple}
      rightContent={<h1>SKILL RIGHT</h1>}
    />
  );
}

export default SkillsPage;
