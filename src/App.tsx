import { useContext, useEffect, useState } from 'react';
import { SidebarBaseItemMenu } from './components/sidebarBaseItemMenu';
import { SidebarBaseMenu } from './components/sidebarBaseMenu';
import { GroupSuits } from './components/widgets/groupSuits';
import { renderAllTests } from './components/widgets/renderAllTests';
import { TestSelectedContext } from './core/contexts/testSelectedProvider';
import { ThemeContext } from './core/contexts/themProvider';
import { MdToHtml } from './core/helpers/mdToHtml';
import { useFetchDocumentation } from './core/hooks/useFetchDocumentation';
import { apiResponseFileTypes } from './core/interfaces/api';
import Logo from './assets/logo.png';

const App = () => {
  const [files, setFiles] = useState<apiResponseFileTypes[]>([]);
  const [docs, setDocs] = useState<string>('');
  const { testSelected, setTestSelected } = useContext(TestSelectedContext);
  const [filter, setFilter] = useState<string>('');
  const { data } = useFetchDocumentation();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setFiles(data.files);
      setDocs(data.docs);
    }
  }, [data]);

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
              className="mr-2 lg:hidden border border-gray-300 dark:border-cyan-700 bg-gray-100 dark:bg-cyan-600 rounded-full p-2 text-cyan-600 dark:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>

              <div className="flex-1 p-1 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              </div>
            </button>
          </div>
        </header>
      </nav>

      <div className="grid grid-cols-12 w-full overflow-hidden max-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white relative">
        <aside
          className={`absolute top-0  ${
            menuIsOpen ? 'w-full sm:w-80 lg:w-full' : 'w-0 lg:w-full'
          } z-20 left-0 lg:relative lg:block lg:col-span-3  bg-gray-100 dark:bg-gray-900`}>
          <div className="flex items-center border-b-2 border-b-gray-200 dark:border-b-gray-600 p-2 m-2 dark:hover:border-b-cyan-500 hover:border-b-cyan-500 transition duration-150">
            <input
              type="search"
              name="searchRequests"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              id="searchRequests"
              placeholder="Pesquise endpoints, textos..."
              className="w-full text-gray-500 focus:outline-none dark:bg-gray-900"
            />
          </div>
          <div
            className="overflow-y-auto"
            style={{
              height: 'calc(100vh - 8rem)',
            }}>
            <div className="flex flex-col px-2">
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
        <main className="relative z-10 col-span-12 lg:col-span-9 flex flex-col max-h-screen">
          <div
            className="overflow-y-auto"
            style={{
              height: 'calc(100vh - 3.5rem)',
            }}>
            {testSelected.tests.length === 0 ? <MdToHtml markdown={docs} /> : null}
            {renderAllTests(testSelected?.tests ?? [], testSelected.titleBase, testSelected.descriptionBase)}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
