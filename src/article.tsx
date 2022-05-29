import { useContext } from 'react';
import { TestRunnerContext } from './core/contexts/testRunnerProvider';
import { MdToHtml } from './core/helpers/mdToHtml';
import { CardsRoutes } from './renderCards';

export const Article = ({ posts, docs }: any) => {
  const { testRunner } = useContext(TestRunnerContext);

  return (
    <main
      className={`${
        testRunner.title ? 'col-span-8' : 'col-span-12'
      } flex flex-col py-6 px-6 max-h-screen overflow-y-auto`}>
      <MdToHtml markdown={docs} />

      <CardsRoutes posts={posts} />
    </main>
  );
};
