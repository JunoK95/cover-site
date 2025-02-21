import { PageLayout } from '../../layouts/PageLayout';

function HomePage() {
  return (
    <PageLayout
      leftContent={<div>Home Left</div>}
      rightContent={<div>Home Right</div>}
    />
  );
}

export default HomePage;
