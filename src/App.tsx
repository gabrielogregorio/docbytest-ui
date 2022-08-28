import { useContext, useEffect } from 'react';
import { RenderAside } from './components/widgets/renderAside';
import { RenderDocs } from './components/widgets/renderDocs';
import { DataContext } from './core/contexts/dataProvider';
import { MenuContext } from './core/contexts/menuProvider';
import { Header } from './components/layout/header';
import { Container } from './components/layout/container';
import { RenderAllTests } from './components/widgets/renderAllTests';
import { TestSelectedContext } from './core/contexts/testSelectedProvider';
import { useFetchDocsAndSaveContext } from './core/hooks/useFetchDocsAndSaveContext';

import { Main } from './components/layout/main';

const App = () => {
  const { testSelected, setTestSelected } = useContext(TestSelectedContext);
  const { docs } = useContext(DataContext);
  const { setMenuIsOpen } = useContext(MenuContext);

  useFetchDocsAndSaveContext();

  useEffect(() => {
    setMenuIsOpen(false);
  }, [testSelected.indexSelected]);

  useEffect(() => {
    if (docs?.length) {
      const firstDoc = docs[0];
      const firstItemFromDoc = `${firstDoc?.title}${firstDoc?.docs?.[0]?.title}`;
      setTestSelected({
        tests: [],
        indexSelected: firstItemFromDoc,
        titleBase: '',
        descriptionBase: '',
      });
    }
  }, [docs?.length]);

  return (
    <Container>
      <Header />

      <div
        style={{ height: 'calc(100vh - 3.5rem)' }}
        className="grid grid-cols-12 w-full overflow-hidden bg-white dark:bg-dark dark:text-white relative">
        <RenderAside />
        <Main>
          <RenderDocs />
          <RenderAllTests />
        </Main>
      </div>
    </Container>
  );
};

export default App;
