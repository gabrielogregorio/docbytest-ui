import { useContext, useEffect, useState } from 'react';
import { TestSelectedContext } from '../../core/contexts/testSelectedProvider';
import { reInterpreterDefault } from '../../core/handlers/reInterpreter';
import { renderHandlerMarkdownDocbytest } from '../../core/handlers/renderHtmlMarkdow';
import { InterpreterMarkdown } from '../interpreterMarkdown';
import { BadgeMethod } from './badgeMethod';
import { getUrlApi } from '../../core/hooks/getUrlApi';
import { testsType } from '../../core/interfaces/api';
import { InitialTestRunnerType } from '../../core/interfaces/testRunner';
import { InputParam } from './inputParam';
import { RenderTests } from './renderTests';
import { TestRunnerModal } from './testRunnerModal';

export const DocTests = () => {
  const { testSelected } = useContext(TestSelectedContext);

  const tests: testsType[] = testSelected?.tests;
  const { titleBase } = testSelected;
  const { descriptionBase } = testSelected;

  const { currentUrlOrigin } = getUrlApi();
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
            <h1 className="text-3xl font-bold dark:text-gray-200 text-gray-600 pb-2 hover:text-cyan-500 transition duration-150">
              {titleBase}
            </h1>
          ) : null}

          {descriptionBase ? (
            <InterpreterMarkdown
              text={descriptionBase}
              reInterpreter={reInterpreterDefault}
              renderHandlerMarkdown={renderHandlerMarkdownDocbytest}
            />
          ) : null}

          <span className="border-b-2 block" />

          <InputParam
            label={<BadgeMethod onlyText method={testRunner?.method} />}
            name="auth"
            type="text"
            value={`${currentUrlOrigin}${testRunner?.path}`}
          />

          <RenderTests tests={tests} testRunner={testRunner} setTestRunner={setTestRunner} />

          {testRunner.title ? (
            <h2 className="uppercase dark:text-gray-200 text-gray-600 font-bold text-lg mt-2">{testRunner.title}</h2>
          ) : null}

          {testRunner.description ? (
            <InterpreterMarkdown
              text={testRunner.description}
              reInterpreter={reInterpreterDefault}
              renderHandlerMarkdown={renderHandlerMarkdownDocbytest}
            />
          ) : null}

          {testRunner.method ? <TestRunnerModal testRunner={testRunner} /> : null}
        </>
      ) : null}
    </div>
  );
};
