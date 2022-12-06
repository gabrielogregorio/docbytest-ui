import { ReactElement, useContext } from 'react';
import { DocSelectedContext } from '@/contexts/docSelectedProvider';
import { testsType } from '@/interfaces/api';
import { RenderTest } from './renderTest';
import { RenderDocs } from './renderDocs';

export const DocTests = (): ReactElement => {
  const { docSelected } = useContext(DocSelectedContext);
  const testsSelectedItem: testsType[] = docSelected?.tests;

  if (testsSelectedItem.length === 0) {
    return <RenderDocs />;
  }

  return <RenderTest />;
};
