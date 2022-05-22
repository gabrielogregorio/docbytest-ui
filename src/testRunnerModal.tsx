/* eslint-disable import/no-unresolved */
import { useContext, useState } from 'react';
import { Api } from './core/api';
import { TestRunnerContext } from './core/contexts/testRunnerProvider';
import { apiMethodType } from './core/interfaces/api';

export const TestRunnerModal = () => {
  const { testRunnerIsOpen, setTestRunnerIsOpen } = useContext(TestRunnerContext);
  const [method, setMethod] = useState<apiMethodType>('GET');
  const [url, setUrl] = useState<string>('');
  const [body, setBody] = useState<string>('');

  if (!testRunnerIsOpen) {
    return null;
  }

  const handleSubmit = () => {
    Api({ url, method, body: JSON.stringify(body) })
      .then((res) => {
        console.log(res.status);
        console.log(res.json());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(method, 'start');

  return (
    <div className="p-16 fixed top-0 left-0 w-screen h-screen flex items-center justify-center">
      <div className="bg-blue-50 p-12 relative border-2 border-blue-500">
        <button
          type="button"
          onClick={() => setTestRunnerIsOpen(null)}
          aria-label="Fechar simulador de requests"
          className=" absolute -right-4 -top-4 p-1 text-white bg-blue-500 rounded-full w-8 h-8">
          X
        </button>

        <div className="border-blue-500 border-2 p-2 mt-2">
          <div>
            <select
              name="option"
              id="option"
              value={method}
              // @ts-ignore
              onChange={(valueSeletec) => setMethod(valueSeletec.target.value)}>
              <option value="POST">POST</option>
              <option value="GET">GET</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>

            <label htmlFor="url">
              <input type="text" name="url" id="url" value={url} onChange={(event) => setUrl(event.target.value)} />
            </label>

            <button type="button" className="bg-blue-500 px-3.5 py-2 text-white" onClick={() => handleSubmit()}>
              send
            </button>
          </div>
        </div>

        <div className="border-blue-500 border-2 p-2 mt-2">
          <nav className="flex">
            <button className="border-2 text-blue-900 px-2.5 mr-2 py-1 border-blue-500 rounded-sm" type="button">
              Query url
            </button>
            <button className="border-2 text-blue-900 px-2.5 mr-2 py-1 border-blue-500 rounded-sm" type="button">
              body
            </button>
            <button className="border-2 text-blue-900 px-2.5 mr-2 py-1 border-blue-500 rounded-sm" type="button">
              Headers
            </button>
            <button className="border-2 text-blue-900 px-2.5 mr-2 py-1 border-blue-500 rounded-sm" type="button">
              Auth
            </button>
          </nav>
          <div>
            <label htmlFor="body" className="flex flex-col">
              JSON
              <textarea name="body" id="body" cols={30} rows={10} onChange={(event) => setBody(event.target.value)} />
            </label>
          </div>
        </div>

        <div className="border-blue-500 border-2 p-2 mt-2">
          <nav>
            <button className="border-2 text-blue-900 px-2.5 mr-2 py-1 border-blue-500 rounded-sm" type="button">
              Response
            </button>
          </nav>
          <div>Content</div>
        </div>
      </div>
    </div>
  );
};
