import { useContext } from 'react';
import { Card } from './card';
import { TestRunnerContext } from './core/contexts/testRunnerProvider';

function renderOptions(exampleData: any) {
  const { setTestRunner } = useContext(TestRunnerContext);

  const returnItems = () => {
    return exampleData.map((data: any) => (
      <tr className="border-t-2">
        <td className="py-2 ">
          <div className="flex items-center">
            <div
              className={`${data?.response?.statusCode === '200' ? 'bg-green-500' : 'bg-red-500'} rounded-full h-4 w-4`}
            />
            <span className="ml-2">{data?.response?.statusCode}</span>
          </div>
        </td>
        <td className="py-2">{data?.router}</td>

        <td className="py-2">{data?.title}</td>

        <td className="py-2">
          <button
            type="button"
            onClick={() =>
              setTestRunner({
                description: data.description,
                headers: data.headers,
                method: data.method,
                params: data.params,
                path: data.path,
                response: data.response,
                router: data.router,
                sendContent: data.sendContent,
                title: data.title,
              })
            }>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className={` mt-2`}>
      <div className="p-2">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="text-left">Status</th>
              <th className="text-left">Path</th>
              <th className="text-left">Descrição</th>
              <th className="text-left">Testar</th>
            </tr>
          </thead>
          <tbody>{returnItems()}</tbody>
        </table>
      </div>
    </div>
  );
}

export const ItemsRouter = ({ postsX }: any) => {
  const routes: any[] = Object.keys(postsX);

  function renderRoutes() {
    return routes?.map((route) => {
      if (route === 'title' || route === 'description') {
        return null;
      }
      const methods = Object.keys(postsX[route]);
      return methods.map((method) => {
        const exampleDataShoulddd = postsX[route][method];

        return (
          <div>
            <h1>{exampleDataShoulddd?.context}</h1>
            {[exampleDataShoulddd].map(({ tests: exampleData }: any) => {
              if (!exampleData || !exampleData[0]?.method) {
                return null;
              }

              const { context, method: localMethod, title, router } = exampleData[0] ?? {};

              return (
                <div>
                  <div>
                    <p>{context}</p>
                    <Card
                      method={localMethod}
                      params={exampleData[0]?.params}
                      headers={exampleData[0]?.headers}
                      router={router}
                      title={title}
                      // eslint-disable-next-line react/no-children-prop
                      children={<div>{renderOptions(exampleData)}</div>}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        );
      });
    });
  }
  return <>{renderRoutes()}</>;
};
