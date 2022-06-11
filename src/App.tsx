import { useContext, useEffect, useState } from 'react';
import { SidebarBaseItemMenu } from './components/sidebarBaseItemMenu';
import { SidebarBaseMenu } from './components/sidebarBaseMenu';
import { GroupSuits } from './components/widgets/groupSuits';
import { renderAllTests } from './components/widgets/renderAllTests';
import { TestSelectedContext } from './core/contexts/testSelectedProvider';
import { MdToHtml } from './core/helpers/mdToHtml';
import { useFetchDocumentation } from './core/hooks/useFetchDocumentation';
import { apiResponseFileTypes } from './core/interfaces/api';

const App = () => {
  const [files, setFiles] = useState<apiResponseFileTypes[]>([]);
  const [docs, setDocs] = useState<string>('');
  const { testSelected, setTestSelected } = useContext(TestSelectedContext);
  const [filter, setFilter] = useState<string>('');
  const { data } = useFetchDocumentation();

  useEffect(() => {
    if (data) {
      setFiles(data.files);
      setDocs(data.docs);
    }
  }, [data]);

  return (
    <div className="w-full overflow-hidden">
      <div className="grid grid-cols-12 w-full overflow-hidden max-h-screen">
        <aside className="col-span-3 w-full">
          <div
            className="w-full"
            style={{
              height: '8rem',
            }}>
            <header className="bg-cyan-500 text-white font-bold text-3xl text-left p-3 py-4 uppercase flex items-center">
              <img src="/logo.png" alt="Logo do docbytet" width="60px" height="15px" className="mr-2" />
              docbytest
            </header>

            <div className="flex items-center border-b-2 p-2 m-2 hover:border-b-cyan-500 transition duration-150">
              <input
                type="search"
                name="searchRequests"
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
                id="searchRequests"
                placeholder="Pesquise endpoints"
                className="w-full text-gray-500 focus:outline-none"
              />
              <button
                type="button"
                className="text-gray-200 hover:text-cyan-500 hover:scale-105 transition duration-150">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div
            className="overflow-y-auto"
            style={{
              height: 'calc(100vh - 8rem)',
            }}>
            <div className="flex flex-col p-2">
              <SidebarBaseMenu title="Instrudução">
                <SidebarBaseItemMenu
                  isSelected={testSelected.indexSelected === 'readme'}
                  onClick={() =>
                    setTestSelected({
                      tests: [],
                      indexSelected: `readme`,
                      titleBase: 'Instrodução',
                      descriptionBase: '',
                    })
                  }
                  localMethod=""
                  title="Introdução"
                  method=""
                />
              </SidebarBaseMenu>

              <GroupSuits files={files} filter={filter} />
            </div>
          </div>
        </aside>
        <main className="col-span-9 flex flex-col overflow-y-auto max-h-screen">
          {testSelected.tests.length === 0 ? <MdToHtml markdown={docs} /> : null}
          {renderAllTests(testSelected?.tests ?? [], testSelected.titleBase, testSelected.descriptionBase)}
        </main>
      </div>
    </div>
  );
};

export default App;
