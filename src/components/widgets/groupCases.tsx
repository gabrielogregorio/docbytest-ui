import { useState } from 'react';
import { sortTestByStatusCode } from '../../core/helpers/sortTestByStatusCode';
import { apiPathType, testBaseObjectType, testsType } from '../../core/interfaces/api';
import { initialTestRunnerType } from '../../core/interfaces/testRunner';
import { BadgeMethod } from './badgeMethod';
import { RenderTests } from './renderTests';
import { TestRunnerModal } from './testRunnerModal';

type badgeType = { [method: string]: { border: string } };

const dataBadge: badgeType = {
  post: {
    border: 'border-blue-400',
  },
  get: {
    border: 'border-green-400',
  },
  put: {
    border: 'border-orange-400',
  },

  delete: {
    border: 'border-red-400',
  },
  patch: { border: 'border-red-400' },
  default: { border: 'border-gray-400' },
};

function renderAllTests(tests: testsType[]) {
  const [testRunner, setTestRunner] = useState<initialTestRunnerType>({
    ...tests[0],
    caseSelected: 0,
  });

  return (
    <div className="mt-2 p-2">
      <RenderTests tests={tests} testRunner={testRunner} setTestRunner={setTestRunner} />

      <TestRunnerModal testRunner={testRunner} />
    </div>
  );
}

export const GroupCases = ({ paths: fullObjectPaths }: { paths: apiPathType }) => {
  const paths = Object.keys(fullObjectPaths);

  function renderCases() {
    return paths?.map((path: string) => {
      const methods = Object.keys(fullObjectPaths[path]);

      return methods.map((method: string) => {
        const { border } = dataBadge?.[method] ?? dataBadge.default;

        const { tests }: testBaseObjectType = fullObjectPaths[path][method];

        const testsSorted = sortTestByStatusCode(tests);

        const { method: localMethod, title, router } = testsSorted[0] ?? {};

        return (
          <div>
            <details className={`text-gray-700 p-1.5 border rounded-lg my-1 ${border}`}>
              <summary className=" flex w-full cursor-pointer">
                <div className="flex items-center flex-1">
                  <div>
                    <BadgeMethod method={localMethod} />
                  </div>

                  <span className=" font-black ml-2 select-none">{router}</span>

                  <p className="ml-2 flex-1 select-none"> {title}</p>
                </div>
              </summary>

              {renderAllTests(testsSorted)}
            </details>
          </div>
        );
      });
    });
  }

  return <>{renderCases()}</>;
};
