import { useState, useContext } from 'react';
import { GroupSuits } from './groupSuits';
import { SidebarBaseItemMenu } from '../sidebarBaseItemMenu';
import { SidebarBaseMenu } from '../sidebarBaseMenu';
import { Aside } from '../layout/aside';
import { DataContext } from '../../core/contexts/dataProvider';
import { TestSelectedContext } from '../../core/contexts/testSelectedProvider';
import { apiDocsType, docItemType } from '../../core/interfaces/api';

const GroupDocs = ({ docs }: { docs: apiDocsType[] }) => {
  const { testSelected, setTestSelected } = useContext(TestSelectedContext);

  function renderItems() {
    return docs.map((doc: apiDocsType) => {
      return (
        <SidebarBaseMenu title={doc.title} key={doc.title}>
          {doc.docs.map((docItem: docItemType) => {
            const indexTitleAndTest = `${doc.title}${docItem.title}`;
            return (
              <SidebarBaseItemMenu
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
        </SidebarBaseMenu>
      );
    });
  }

  return <>{renderItems()}</>;
};

export const RenderAside = () => {
  const [filter, setFilter] = useState<string>('');
  const { docs } = useContext(DataContext);
  return (
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

          <GroupSuits filter={filter} />
        </div>
      </div>
    </Aside>
  );
};
