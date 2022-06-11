import { testsType } from '../../core/interfaces/api';
import { InitialTestRunnerType } from '../../core/interfaces/testRunner';

type renderTestsType = {
  tests: testsType[];
  testRunner: InitialTestRunnerType;
  setTestRunner: Function;
};

export const RenderTests = ({ tests, testRunner, setTestRunner }: renderTestsType) => {
  function renderTests() {
    return tests.map((test: testsType, index: number) => {
      const styleIsCaseSelected =
        testRunner.caseSelected === index ? 'border-b-4 border-b-cyan-500 bg-gray-50' : 'border-b-4  border-b-gray-200';

      return (
        <button
          type="button"
          title={test?.title}
          onClick={() =>
            setTestRunner({
              ...test,
              caseSelected: index,
            })
          }
          className={`p-2 py-1.5 flex justify-center items-center group ${styleIsCaseSelected} hover:border-b-cyan-500`}>
          <div className="py-2 px-3">
            <div className="flex items-center text-gray-600 group-hover:text-cyan-500 font-bold">
              <span>{test?.response?.statusCode}</span>
            </div>
          </div>

          {/* <td className="py-2 px-2 whitespace-nowrap select-none">{test?.title}</td> */}
        </button>
      );
    });
  }

  return <div className="flex overflow-auto">{renderTests()}</div>;
};
