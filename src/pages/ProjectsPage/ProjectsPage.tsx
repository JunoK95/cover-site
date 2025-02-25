import { PageLayout } from "../../layouts/PageLayout";

function ProjectsPage() {
  return (
    <PageLayout
      leftContent={<h1>PROJECTS LEFT</h1>}
      rightContent={<h1>PROJECTS RIGHT</h1>}
    />
  );
}

export default ProjectsPage;
