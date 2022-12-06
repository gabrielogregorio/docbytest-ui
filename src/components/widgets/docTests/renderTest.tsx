import { ReactElement, useContext, useEffect, useState } from 'react';
import { DocSelectedContext } from '@/contexts/docSelectedProvider';
import { getUrlApi } from '@/hooks/getUrlApi';
import { testsType } from '@/interfaces/api';
import { InitialTestRunnerType } from '@/interfaces/testRunner';
import { InterpreterMarkdown } from '@/components/interpreterMarkdown';
import { MethodRequestAndUrl } from '@/widgets/methodRequestAndUrl';
import { BadgeMethod } from '@/widgets/badgeMethod';
import { RenderTests } from '@/widgets/renderTests';
import { RequestInfo } from '@/widgets/RequestInfo';

export const RenderTest = (): ReactElement => {
  const { docSelected } = useContext(DocSelectedContext);
  const testsSelectedItem: testsType[] = docSelected?.tests;
  const [testRunner, setTestSelected] = useState<InitialTestRunnerType>({
    ...testsSelectedItem?.[0],
    caseSelected: 0,
  });

  useEffect(() => {
    setTestSelected({
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

      <MethodRequestAndUrl
        label={<BadgeMethod onlyText method={testRunner?.method} />}
        name="auth"
        type="text"
        value={`${currentUrlOrigin}${testRunner?.path}`}
      />

      <RenderTests tests={testsSelectedItem} testRunner={testRunner} setTestSelected={setTestSelected} />

      <h2 className="uppercase dark:text-gray-200 text-gray-600 font-bold text-lg mt-2">{testRunner.title}</h2>

      {testRunner.description ? <InterpreterMarkdown text={testRunner.description} /> : null}

      {testRunner.method ? <RequestInfo testRunner={testRunner} /> : null}
    </div>
  );
};
