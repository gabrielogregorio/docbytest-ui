import { testsType } from '../../core/interfaces/api';
import { InitialTestRunnerType } from '../../core/interfaces/testRunner';
import { InsideMenu } from './insideMenu';

type setTestRunnerType = { test: testsType; caseSelected: number };

type renderTestsType = {
  tests: testsType[];
  testRunner: InitialTestRunnerType;
  setTestRunner: (data: setTestRunnerType) => void;
};

export const RenderTests = ({ tests, testRunner, setTestRunner }: renderTestsType) => {
  return (
    <div className="flex overflow-auto">
      {tests.map((test: testsType, index: number) => {
        return (
          <InsideMenu
            key={`${test.description}-${test.title}-${test.path}`}
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
      })}
    </div>
  );
};
