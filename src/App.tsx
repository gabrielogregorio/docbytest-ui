import { ReactElement, useContext, useEffect, useState } from 'react';
import { MenuContext } from './core/contexts/menuProvider';
import { Aside } from './components/layout/aside';
import { Header } from './components/layout/header';
import { Container } from './components/layout/container';
import { SidebarBaseItemMenu } from './components/sidebarBaseItemMenu';
import { SidebarBaseMenu } from './components/sidebarBaseMenu';
import { GroupSuits } from './components/widgets/groupSuits';
import { renderAllTests } from './components/widgets/renderAllTests';
import { TestSelectedContext } from './core/contexts/testSelectedProvider';
import { useFetchDocumentation } from './core/hooks/useFetchDocumentation';
import { apiDocsType, apiResponseFileTypes, docItemType } from './core/interfaces/api';
import { InterpreterMarkdown } from './components/interpreterMarkdown';
import { reInterpreterDefault } from './core/handlers/default/reInterpreter';
import { renderHandlerMarkdownDocbytest } from './core/handlers/docbytest/renderHtmlMarkdow';
import { Main } from './components/layout/main';

const RenderDocs = ({ docs }: { docs: apiDocsType[] }): ReactElement => {
  const { testSelected } = useContext(TestSelectedContext);

  function renderItems() {
    return docs.map((doc: apiDocsType) => {
      const folderDocNotHasSelected = !testSelected.indexSelected.startsWith(doc.title);
      if (folderDocNotHasSelected) {
        return null;
      }

      return doc.docs.map((docItem: docItemType) => {
        const docNotHasSelected = !testSelected.indexSelected.endsWith(docItem.title);
        if (docNotHasSelected) {
          return null;
        }
        return (
          <InterpreterMarkdown
            text={docItem.text}
            reInterpreter={reInterpreterDefault}
            renderHandlerMarkdown={renderHandlerMarkdownDocbytest}
          />
        );
      });
    });
  }

  const notExistsSelectedTests = testSelected.tests.length === 0;
  if (!notExistsSelectedTests) {
    <div />;
  }

  return <>{renderItems()}</>;
};

const GroupDocs = ({ docs }: { docs: apiDocsType[] }) => {
  const { testSelected, setTestSelected } = useContext(TestSelectedContext);

  function renderItems() {
    return docs.map((doc: apiDocsType) => {
      return (
        <SidebarBaseMenu title={doc.title}>
          {doc.docs.map((docItem: docItemType) => {
            const indexTitleAndTest = `${doc.title}${docItem.title}`;
            return (
              <SidebarBaseItemMenu
                isSelected={testSelected.indexSelected === indexTitleAndTest}
                onClick={() =>
                  setTestSelected({
                    tests: [],
                    indexSelected: indexTitleAndTest,
                    titleBase: '',
                    descriptionBase: '',
                  })
                }
                localMethod="docs"
                title={docItem.title}
                method=""
              />
            );
          })}
        </SidebarBaseMenu>
      );
    });
  }

  return <>{renderItems()}</>;
};

const App = () => {
  const [files, setFiles] = useState<apiResponseFileTypes[]>([]);
  const [docs, setDocs] = useState<apiDocsType[]>([]);
  const { testSelected, setTestSelected } = useContext(TestSelectedContext);
  const [filter, setFilter] = useState<string>('');
  const { data } = useFetchDocumentation();
  const { setMenuIsOpen } = useContext(MenuContext);

  useEffect(() => {
    setMenuIsOpen(false);
  }, [testSelected.indexSelected]);

  useEffect(() => {
    if (data) {
      setFiles(data.files);
      setDocs(data.docs);

      const firstItemFromDoc = `${data?.docs?.[0]?.title}${data?.docs?.[0]?.docs?.[0]?.title}`;
      setTestSelected({
        tests: [],
        indexSelected: firstItemFromDoc,
        titleBase: '',
        descriptionBase: '',
      });
    }
  }, [data]);

  return (
    <Container>
      <Header />

      <div
        style={{ height: 'calc(100vh - 3.5rem)' }}
        className="grid grid-cols-12 w-full overflow-hidden bg-white dark:bg-dark dark:text-white relative">
        <Aside>
          <div className="flex items-center border-b-2 border-b-gray-200 dark:border-b-gray-600 m-2 mx-4 dark:hover:border-b-cyan-500 hover:border-b-cyan-500 transition duration-150">
            <input
              type="search"
              name="searchRequests"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              id="searchRequests"
              placeholder="Pesquise endpoints, textos..."
              className="w-full text-gray-500 focus:outline-none dark:bg-dark p-2 "
            />
          </div>
          <div className="overflow-y-auto">
            <div className="flex flex-col px-2">
              <GroupDocs docs={docs} />

              <GroupSuits files={files} filter={filter} />
            </div>
          </div>
        </Aside>
        <Main>
          <RenderDocs docs={docs} />
          {renderAllTests(testSelected?.tests ?? [], testSelected.titleBase, testSelected.descriptionBase)}
        </Main>
      </div>
    </Container>
  );
};

export default App;
