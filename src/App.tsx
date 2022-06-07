import { useEffect, useState } from 'react';
import { GroupSuits } from './components/widgets/groupSuits';
import { MdToHtml } from './core/helpers/mdToHtml';
import { useFetchDocumentation } from './core/hooks/useFetchDocumentation';
import { apiResponseFileTypes } from './core/interfaces/api';

const App = () => {
  const [files, setFiles] = useState<apiResponseFileTypes[]>([]);
  const [docs, setDocs] = useState<string>('');

  const { data } = useFetchDocumentation();

  useEffect(() => {
    if (data) {
      setFiles(data.files);
      setDocs(data.docs);
    }
  }, [data]);

  return (
    <div className="w-full overflow-hidden">
      <div className={`grid grid-cols-12 w-full overflow-hidden `}>
        <main className="col-span-12 flex flex-col py-6 overflow-y-auto">
          <MdToHtml markdown={docs} />

          <GroupSuits files={files} />
        </main>
      </div>
    </div>
  );
};

export default App;
