import { testsType } from '../../core/interfaces/api';
import { InitialTestRunnerType } from '../../core/interfaces/testRunner';
import { InsideMenu } from './insideMenu';

type renderTestsType = {
  tests: testsType[];
  testRunner: InitialTestRunnerType;
  setTestRunner: Function;
};

export const RenderTests = ({ tests, testRunner, setTestRunner }: renderTestsType) => {
  function renderTests() {
    return tests.map((test: testsType, index: number) => {
      return (
        <InsideMenu
          key={`${test.description}-${test.title}-${test.fullPath}`}
          isSelected={testRunner.caseSelected === index}
          text={test?.response?.statusCode}
          onClick={() =>
            setTestRunner({
              ...test,
              caseSelected: index,
            })
          }
        />
      );
    });
  }

  return <div className="flex overflow-auto">{renderTests()}</div>;
};
