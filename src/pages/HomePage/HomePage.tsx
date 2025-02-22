import { PageLayout } from "../../layouts/PageLayout";

function HomePage() {
  return (
    <PageLayout
      leftContent={<h1>Home Left</h1>}
      rightContent={<h1>Home Right</h1>}
    />
  );
}

export default HomePage;
