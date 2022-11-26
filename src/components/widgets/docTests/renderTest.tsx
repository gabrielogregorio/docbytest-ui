import { useContext, useEffect, useState } from 'react';
import { DocSelectedContext } from '../../../core/contexts/docSelectedProvider';
import { getUrlApi } from '../../../core/hooks/getUrlApi';
import { testsType } from '../../../core/interfaces/api';
import { InitialTestRunnerType } from '../../../core/interfaces/testRunner';
import { InterpreterMarkdown } from '../../interpreterMarkdown';
import { BadgeMethod } from '../badgeMethod';
import { InputParam } from '../inputParam';
import { RenderTests } from '../renderTests';
import { TestRunnerModal } from '../testRunnerModal';

export const RenderTest = () => {
  const { docSelected } = useContext(DocSelectedContext);
  const testsSelectedItem: testsType[] = docSelected?.tests;
  const [testRunner, setTestRunner] = useState<InitialTestRunnerType>({
    ...testsSelectedItem?.[0],
    caseSelected: 0,
  });

  useEffect(() => {
    setTestRunner({
      ...testsSelectedItem?.[0],
      caseSelected: 0,
    });
  }, [testsSelectedItem]);

  const { title, description } = docSelected;
  const { currentUrlOrigin } = getUrlApi();

  return (
    <div className="px-6 py-6 pt-5">
      <h1 className="text-3xl font-bold dark:text-gray-200 text-gray-600 pb-2 hover:text-cyan-500 transition duration-150">
        {title}
      </h1>

      <InterpreterMarkdown text={description} />

      <span className="border-b-2 block" />

      <InputParam
        label={<BadgeMethod onlyText method={testRunner?.method} />}
        name="auth"
        type="text"
        value={`${currentUrlOrigin}${testRunner?.path}`}
      />

      <RenderTests tests={testsSelectedItem} testRunner={testRunner} setTestRunner={setTestRunner} />

      <h2 className="uppercase dark:text-gray-200 text-gray-600 font-bold text-lg mt-2">{testRunner.title}</h2>

      {testRunner.description ? <InterpreterMarkdown text={testRunner.description} /> : null}

      {testRunner.method ? <TestRunnerModal testRunner={testRunner} /> : null}
    </div>
  );
};
