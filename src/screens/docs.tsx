import { useContext, useEffect } from 'react';
import { Aside } from '../components/widgets/aside';
import { Docs } from '../components/widgets/docs';
import { DataContext } from '../core/contexts/dataProvider';
import { MenuContext } from '../core/contexts/menuProvider';
import { Header } from '../components/layout/header';
import { Container } from '../components/layout/container';
import { DocTests } from '../components/widgets/docTests';
import { TestSelectedContext } from '../core/contexts/testSelectedProvider';
import { useFetchDocsAndSaveContext } from '../core/hooks/useFetchDocsAndSaveContext';
import { Main } from '../components/layout/main';
import { Illustration } from '../components/widgets/illustration';

export default function DocsPage() {
  const { testSelected, setTestSelected } = useContext(TestSelectedContext);
  const { docs, suites } = useContext(DataContext);
  const { setMenuIsOpen } = useContext(MenuContext);
  const { isLoading, error } = useFetchDocsAndSaveContext();

  useEffect(() => {
    setMenuIsOpen(false);
  }, [testSelected.indexSelected, setMenuIsOpen]);

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
  }, [docs?.length, setTestSelected, docs]);

  const hasDocsOrTests: boolean = docs.length !== 0 || suites.length !== 0;

  return (
    <Container>
      <Header />

      <div
        style={{ minHeight: 'calc(100vh - 3.5rem)' }}
        className="grid grid-cols-12 w-full overflow-hidden bg-white dark:bg-dark dark:text-white relative">
        {!hasDocsOrTests ? (
          <div className="col-span-12 flex justify-center">
            <div className="mt-2">
              {isLoading ? (
                <Illustration
                  title={'Searching docs...'}
                  subtitle={'wait here, ok?'}
                  imageSrc="searching.gif"
                  imageAlt="searching image"
                />
              ) : null}

              {error ? (
                <Illustration
                  title={'Error on fetch docs'}
                  subtitle={'Oops, there was a problem loading the documentation, sorry'}
                  imageSrc="Computer troubleshooting-pana.svg"
                  imageAlt="error image"
                  referenceHref="https://storyset.com/people"
                  referenceText="People illustrations by Storyset"
                />
              ) : null}

              {!hasDocsOrTests && !isLoading && !error ? (
                <Illustration
                  title={'Ooooops, nothing here...'}
                  subtitle={`There's nothing here my friend`}
                  imageSrc="homer-simpson-hiding.gif"
                  imageAlt="nothing here image"
                />
              ) : null}
            </div>
          </div>
        ) : null}

        {hasDocsOrTests ? (
          <>
            <Aside />
            <Main>
              <Docs />
              <DocTests />
            </Main>
          </>
        ) : null}
      </div>
    </Container>
  );
}
