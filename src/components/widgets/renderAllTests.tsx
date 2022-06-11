import { useEffect, useState } from 'react';
import { testsType } from '../../core/interfaces/api';
import { InitialTestRunnerType } from '../../core/interfaces/testRunner';
import { RenderTests } from './renderTests';
import { TestRunnerModal } from './testRunnerModal';

export function renderAllTests(tests: testsType[], titleBase: string, descriptionBase: string) {
  const [testRunner, setTestRunner] = useState<InitialTestRunnerType>({
    ...tests?.[0],
    caseSelected: 0,
  });

  useEffect(() => {
    setTestRunner({
      ...tests?.[0],
      caseSelected: 0,
    });
  }, [tests]);

  return (
    <div className="px-6 py-6 pt-5">
      {tests.length !== 0 ? (
        <>
          {titleBase ? (
            <h1 className="text-3xl font-bold capitalize text-gray-600 pb-2 hover:text-cyan-500 transition duration-150">
              {titleBase}
            </h1>
          ) : null}

          {descriptionBase ? <p className="text-gray-600 text-base my-5 mt-2">{descriptionBase}</p> : null}

          <span className="border-b-2 block" />

          <div className="flex items-center border p-2 my-4 rounded-md">
            <h4 className="font-bold text-gray-500 mr-3">Endpoint:</h4>

            <input
              type="text"
              name="auth"
              id="auth"
              value={` http://127.0.0.1:3333${testRunner?.router}`}
              className="bg-transparent outline-none text-gray-700 w-full"
            />
          </div>

          <RenderTests tests={tests} testRunner={testRunner} setTestRunner={setTestRunner} />

          {testRunner.title ? (
            <h2 className="uppercase text-gray-600 font-bold text-lg mt-2">{testRunner.title}</h2>
          ) : null}

          {testRunner.description ? (
            <p className="text-gray-600 text-base my-3 pb-4">{testRunner.description}</p>
          ) : null}

          {testRunner.method ? <TestRunnerModal testRunner={testRunner} /> : null}
        </>
      ) : null}
    </div>
  );
}
