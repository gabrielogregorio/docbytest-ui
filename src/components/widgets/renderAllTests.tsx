import { useEffect, useState } from 'react';
import { reInterpreterDefault } from '../../core/handlers/default/reInterpreter';
import { renderHandlerMarkdownDocbytest } from '../../core/handlers/docbytest/renderHtmlMarkdow';
import { InterpreterMarkdown } from '../interpreterMarkdown';
import { BadgeMethod } from './badgeMethod';
import { useGetUrlApi } from '../../core/hooks/useGetUrlApi';
import { testsType } from '../../core/interfaces/api';
import { InitialTestRunnerType } from '../../core/interfaces/testRunner';
import { InputParam } from './inputParam';
import { RenderTests } from './renderTests';
import { TestRunnerModal } from './testRunnerModal';

export function renderAllTests(tests: testsType[], titleBase: string, descriptionBase: string) {
  const { currentUrlOrigin } = useGetUrlApi();
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
            value={`${currentUrlOrigin}${testRunner?.router}`}
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
}
