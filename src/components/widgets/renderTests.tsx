import { ReactElement } from 'react';
import { testsType } from '../../core/interfaces/api';
import { InitialTestRunnerType } from '../../core/interfaces/testRunner';
import { InsideMenu } from './insideMenu';

type renderTestsType = {
  tests: testsType[];
  testRunner: InitialTestRunnerType;
  setTestSelected: Function;
};

export const RenderTests = ({ tests, testRunner, setTestSelected }: renderTestsType): ReactElement => {
  return (
    <div className="flex overflow-auto">
      {tests.map((test: testsType, index: number) => {
        return (
          <InsideMenu
            key={`${test.description}-${test.title}-${test.path}`}
            isSelected={testRunner.caseSelected === index}
            text={test?.response?.statusCode}
            onClick={(): void =>
              setTestSelected({
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
