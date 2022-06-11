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
        testRunner.caseSelected === index
          ? 'bg-gray-100 border border-b-0 rounded-tl-md rounded-tr-md'
          : 'border border-b-0 border-transparent';

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
          className={`p-2 py-1.5 flex justify-center items-center ${styleIsCaseSelected}`}>
          <div className="py-2 ">
            <div className="flex items-center">
              <div
                className={`${
                  test?.response?.statusCode === '200' ? 'bg-green-500' : 'bg-red-500'
                } rounded-full h-4 w-4`}
              />
              <span className="ml-2">{test?.response?.statusCode}</span>
            </div>
          </div>

          <td className="py-2 px-2 whitespace-nowrap select-none">{test?.title}</td>
        </button>
      );
    });
  }

  return <div className="flex overflow-auto">{renderTests()}</div>;
};
