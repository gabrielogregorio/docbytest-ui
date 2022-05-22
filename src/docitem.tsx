/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-unresolved */
import { useContext, useEffect, useState } from 'react';
import { TestRunnerContext } from './core/contexts/testRunnerProvider';
import { copyToClipboard } from './core/helpers/clipboard';
import { TestRunnerModal } from './testRunnerModal';

export const DocItem = () => {
  const [posts, setPosts] = useState<any>({});
  useEffect(() => {
    fetch('http://127.0.0.1:3333/docs')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);

  const colorsBg: any = {
    post: 'bg-blue-50',
    get: 'bg-green-50',
    delete: 'bg-red-50',
    patch: 'bg-purple-50',
    put: 'bg-orange-50',
  };

  const colorsFg: any = {
    post: 'text-blue-900',
    get: 'text-green-900',
    delete: 'text-red-900',
    patch: 'text-purple-900',
    put: 'text-orange-900',
  };

  function transformUrlInTaguedValues(url: string, tags: { tag: string; type: string; content: string }[]): string {
    let newUrl = url;

    tags.forEach((tag) => {
      newUrl = newUrl.replace(`\${${tag.tag}}`, `${tag.content}`);
    });

    return newUrl;
  }

  function renderData() {
    const { setTestRunnerIsOpen } = useContext(TestRunnerContext);

    const routes: any[] = Object.keys(posts);

    return routes.map((route) => {
      const methods = Object.keys(posts[route]);
      return methods.map((method) => {
        const exampleDataShoulddd = posts[route][method];

        return [exampleDataShoulddd].map(({ tests: exampleData }: any) => {
          return (
            <div>
              <div>
                <p>{exampleData[0].context}</p>

                <details className={`text-white ${colorsBg[exampleData[0].typeMethod]} b p-2`}>
                  <summary className={`${colorsFg[exampleData[0].typeMethod]} flex w-full cursor-pointer`}>
                    <div className="flex items-center flex-1">
                      {exampleData[0].typeMethod === 'post' ? (
                        <div className="select-none bg-blue-500 py-2 px-4 rounded-sm text-white">POST</div>
                      ) : null}

                      {exampleData[0].typeMethod === 'get' ? (
                        <div className="select-none bg-green-500 py-2 px-4 rounded-sm text-white">GET</div>
                      ) : null}

                      {exampleData[0].typeMethod === 'put' ? (
                        <button type="button" className="select-none bg-orange-500 py-2 px-4 rounded-sm text-white">
                          PUT
                        </button>
                      ) : null}

                      {exampleData[0].typeMethod === 'delete' ? (
                        <button type="button" className="select-none bg-red-500 py-2 px-4 rounded-sm text-white">
                          DELETE
                        </button>
                      ) : null}

                      {exampleData[0].typeMethod === 'patch' ? (
                        <button type="button" className="select-none bg-purple-500 py-2 px-4 rounded-sm text-white">
                          PATCH
                        </button>
                      ) : null}

                      <span className=" font-black mx-2">{exampleData[0].routerRequest}</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(`\`${exampleData[0].routerRequest}\``)}
                        className="">
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
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </button>

                      <p className="flex-1"> {exampleData[0].nameTest}</p>

                      <div className={`${colorsFg[exampleData[0].typeMethod]}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </summary>
                  <h2 className={`${colorsFg[exampleData[0].typeMethod]}`}>{exampleDataShoulddd.context}</h2>
                  {exampleData.map((data: any) => (
                    <div className={`${colorsFg[exampleData[0].typeMethod]} mt-2`}>
                      <div className="border border-gray-500 p-2">
                        <p className="font-bold">Caso</p>

                        <h2 className={`${colorsFg[exampleData[0].typeMethod]}`}>{data.descriptionLocal}</h2>
                        <div className="">{transformUrlInTaguedValues(data.routerRequest, data.tags)}</div>

                        <table className="table-fixed w-full">
                          <thead>
                            <tr className="grid grid-cols-12">
                              <th className="text-left col-span-1 w-16">Opa</th>
                              <th className="text-left col-span-9">Requisição</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="grid grid-cols-12">
                              <td className="flex items-center p-2 col-span-1">aa</td>
                              <td className="flex items-center p-2 col-span-2">
                                <pre className="bg-gray-900 text-white">
                                  <code>{data.sendContent ? JSON.stringify(data.sendContent, null, 2) : null}</code>
                                </pre>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table className="table-fixed w-full">
                          <thead>
                            <tr className="grid grid-cols-12">
                              <th className="text-left col-span-1 w-16">Status</th>
                              <th className="text-left col-span-9">Resposta</th>
                              <th className="text-left col-span-2" />
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="grid grid-cols-12">
                              <td className="flex items-center p-2 col-span-1">{data.statusCodeSpect}</td>
                              <td className="flex items-center p-2 col-span-9">
                                <div className="max-h-[500px] w-full overflow-y-auto">
                                  <pre className="bg-gray-900 text-white">
                                    <code>
                                      {data.expectResponse ? JSON.stringify(data.expectResponse, null, 2) : null}
                                    </code>
                                  </pre>
                                </div>
                              </td>

                              <td className="flex items-center p-2 col-span-2">
                                <button
                                  type="button"
                                  className="bg-blue-500 px-3.5 py-2 text-white"
                                  onClick={() => setTestRunnerIsOpen({ url: '127.0.0.1' })}>
                                  testar
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </details>
              </div>
            </div>
          );
        });
      });
    });
  }
  return (
    <div>
      <header className="bg-red-500 text-white flex items-center justify-center text-xl py-4 px-3">DocByTest</header>
      <div className="my-8 mx-8 ">
        <div className="uppercase">
          <h1 className="font-bold text-2xl">API sistema</h1>
          <p>{`A api test é um projeto de testes para do "doc by test", servindo como estudos para essa tecnologia`}</p>
        </div>
        {renderData()}

        <TestRunnerModal />
      </div>
    </div>
  );
};
