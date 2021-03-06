import { useContext, useEffect, useState } from 'react';
import { IconDark, IconLight, IconMenu } from './icons';
import { SidebarBaseItemMenu } from './components/sidebarBaseItemMenu';
import { SidebarBaseMenu } from './components/sidebarBaseMenu';
import { GroupSuits } from './components/widgets/groupSuits';
import { renderAllTests } from './components/widgets/renderAllTests';
import { TestSelectedContext } from './core/contexts/testSelectedProvider';
import { ThemeContext } from './core/contexts/themProvider';
import { useFetchDocumentation } from './core/hooks/useFetchDocumentation';
import { apiDocsType, apiResponseFileTypes, docItemType } from './core/interfaces/api';
import Logo from './assets/logo.png';
import { InterpreterMarkdown } from './components/interpreterMarkdown';
import { reInterpreterDefault } from './core/handlers/default/reInterpreter';
import { renderHandlerMarkdownDocbytest } from './core/handlers/docbytest/renderHtmlMarkdow';

const RenderDocs = ({ docs }: { docs: apiDocsType[] }) => {
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
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

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

  const notExistsSelectedTests = testSelected.tests.length === 0;

  return (
    <div className={`w-full overflow-hidden ${theme === 'dark' ? 'dark' : ''} `}>
      <nav
        style={{
          height: '3.5rem',
        }}
        className="w-full bg-cyan-500 dark:bg-cyan-700 p-3 py-2 flex items-center h-[3.5rem] min-h-[3.5rem]">
        <header className="text-white font-bold text-3xl uppercase w-full flex items-center justify-center ">
          <div className="bg-cyan-500 dark:bg-cyan-700 text-white font-bold text-xl text-left p-3 py-2 uppercase flex items-center h-[3.5rem] min-h-[3.5rem]">
            <button
              type="button"
              onClick={() => setMenuIsOpen((prev) => !prev)}
              className="mr-2 lg:hidden border border-gray-300 dark:border-cyan-700 bg-white dark:bg-cyan-600 rounded-full p-2 text-cyan-600 dark:text-white">
              <IconMenu />
            </button>

            <div className="mr-2">
              <img src={Logo} alt="Logo do docbytet" className="hidden sm:block sm:w-[40px] sm:h-[29px]" />
            </div>

            <span>docbytest</span>
          </div>

          <div className="flex-1" />

          <div>
            <button
              type="button"
              onClick={() => toggleTheme()}
              className="bg-cyan-700 dark:bg-cyan-600 dark:ring-cyan-600 ring-cyan-700 ring-2 w-16 flex rounded-xl relative">
              <div
                className={`h-full aspect-square rounded-full bg-white absolute transition-all duration-150 top-0 ${
                  theme === 'white' ? 'left-0' : 'translate-x-10'
                }`}
              />

              <div className="flex-1 p-1 flex items-center justify-center">
                <IconLight />
              </div>

              <div className="flex-1 p-1 flex items-center justify-center">
                <IconDark />
              </div>
            </button>
          </div>
        </header>
      </nav>

      <div
        style={{ height: 'calc(100vh - 3.5rem)' }}
        className="grid grid-cols-12 w-full overflow-hidden bg-white dark:bg-dark dark:text-white relative">
        <aside
          className={`absolute top-0 ${
            menuIsOpen ? 'w-full sm:w-80 lg:w-full' : 'hidden lg:block lg:w-full'
          } z-20 left-0 lg:relative lg:block lg:col-span-3 h-full overflow-y-auto bg-white dark:bg-dark`}>
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
        </aside>
        <main className="relative z-10 col-span-12 lg:col-span-9 flex flex-col max-h-screen">
          <div
            className="overflow-y-auto"
            style={{
              height: 'calc(100vh - 3.5rem)',
            }}>
            {notExistsSelectedTests ? <RenderDocs docs={docs} /> : null}
            {renderAllTests(testSelected?.tests ?? [], testSelected.titleBase, testSelected.descriptionBase)}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
