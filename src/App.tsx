import { useContext, useEffect, useState } from 'react';
import { TestRunnerModal } from './testRunnerModal';
import { Article } from './article';
import { TestRunnerContext } from './core/contexts/testRunnerProvider';
import { useFetchDocumentation } from './core/hooks/useFetchDocumentation';

const App = () => {
  const [paths, setPaths] = useState<any>([]);
  const [docs, setDocs] = useState<string>('');
  const { testRunner } = useContext(TestRunnerContext);
  const { data } = useFetchDocumentation();

  useEffect(() => {
    if (data) {
      setPaths(data.paths);
      setDocs(data.docs);
    }
  }, [data]);

  const showTestRunner = testRunner.title;

  return (
    <div className="max-h-screen w-full overflow-hidden">
      <div className={`grid grid-cols-12 w-full overflow-hidden `}>
        <Article posts={paths} docs={docs} />

        {showTestRunner ? <TestRunnerModal /> : null}
      </div>
    </div>
  );
};

export default App;
