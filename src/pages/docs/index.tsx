import dynamic from 'next/dynamic';

const DocsPageDynamic = dynamic(() => import('../../screens/docs'), {
  ssr: false,
});

const App = () => {
  return <DocsPageDynamic />;
};

export default App;
