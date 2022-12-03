import { useContext, useEffect, ReactElement } from 'react';
import { Aside } from './components/widgets/aside';
import { DataContext } from './core/contexts/dataProvider';
import { MenuContext } from './core/contexts/menuProvider';
import { Header } from './components/layout/header';
import { Container } from './components/layout/container';
import { DocSelectedContext } from './core/contexts/docSelectedProvider';
import { useFetchDocsAndSaveContext } from './core/hooks/useFetchDocsAndSaveContext';
import { Main } from './components/layout/main';
import { DocTests } from './components/widgets/docTests';

const App = (): ReactElement => {
  const { docSelected, setDocSelected } = useContext(DocSelectedContext);
  const { docs } = useContext(DataContext);
  const { setMenuIsOpen } = useContext(MenuContext);

  useFetchDocsAndSaveContext();

  useEffect(() => {
    setMenuIsOpen(false);
  }, [docSelected.idContent]);

  useEffect(() => {
    if (docs?.length) {
      const setFirstDoc = (): void => {
        setDocSelected({
          tests: [],
          idContent: `${docs[0]?.title}${docs[0]?.docs?.[0]?.title}`,
          title: '',
          description: '',
        });
      };
      setFirstDoc();
    }
  }, [docs?.length]);

  return (
    <Container>
      <Header />

      <div
        style={{ height: 'calc(100vh - 3.5rem)' }}
        className="grid grid-cols-12 w-full overflow-hidden bg-white dark:bg-dark dark:text-white relative">
        <Aside />
        <Main>
          <DocTests />
        </Main>
      </div>
    </Container>
  );
};

export default App;
