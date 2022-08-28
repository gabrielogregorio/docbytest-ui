import { useState, useContext } from 'react';
import { MenuContext } from '../../core/contexts/menuProvider';
import { GroupSuits } from './groupSuits';
import { InfoItem } from '../infoItem';
import { InfoHeader } from '../infoHeader';
import { DataContext } from '../../core/contexts/dataProvider';
import { TestSelectedContext } from '../../core/contexts/testSelectedProvider';
import { apiDocsType, docItemType } from '../../core/interfaces/api';

const GroupDocs = () => {
  const { testSelected, setTestSelected } = useContext(TestSelectedContext);
  const { docs } = useContext(DataContext);

  return (
    <>
      {docs.map((doc: apiDocsType) => {
        return (
          <InfoHeader title={doc.title} key={doc.title}>
            {doc.docs.map((docItem: docItemType) => {
              const indexTitleAndTest = `${doc.title}${docItem.title}`;
              return (
                <InfoItem
                  key={indexTitleAndTest}
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
          </InfoHeader>
        );
      })}
    </>
  );
};

export const Aside = () => {
  const [filter, setFilter] = useState<string>('');
  const { menuIsOpen } = useContext(MenuContext);

  const styleMenuIsOpen = menuIsOpen ? 'w-full sm:w-80 lg:w-full' : 'hidden lg:block lg:w-full';

  return (
    <aside
      className={`absolute top-0 ${styleMenuIsOpen} z-20 left-0 lg:relative lg:block lg:col-span-3 h-full overflow-y-auto bg-white dark:bg-dark`}>
      <nav>
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
            <GroupDocs />

            <GroupSuits filter={filter} />
          </div>
        </div>
      </nav>
    </aside>
  );
};
