import { useEffect, useState } from 'react';
import { TestRunnerModal } from './testRunnerModal';
import { Article } from './article';

export const DocItem = () => {
  const [posts, setPosts] = useState<any>([]);
  useEffect(() => {
    fetch('http://127.0.0.1:3333/docs')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);

  return (
    <div className="grid grid-cols-12 w-full overflow-hidden ">
      <Article posts={posts} />

      <TestRunnerModal />
    </div>
  );
};
