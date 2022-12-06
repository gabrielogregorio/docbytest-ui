import { ReactElement, useContext } from 'react';
import { DataContext } from '@/contexts/dataProvider';
import { DocSelectedContext } from '@/contexts/docSelectedProvider';
import { apiDocsType, docItemType } from '@/interfaces/api';
import { InterpreterMarkdown } from '@/components/interpreterMarkdown';

export const RenderDocs = (): ReactElement => {
  const { docs } = useContext(DataContext);
  const { docSelected } = useContext(DocSelectedContext);

  return (
    <>
      {docs.map((doc: apiDocsType) => {
        return doc?.docs?.map((docItem: docItemType) => {
          const docNotHasSelected: boolean = !docSelected.idContent.endsWith(docItem.title);
          if (docNotHasSelected) {
            return null;
          }

          return <InterpreterMarkdown key={docItem.text} text={docItem.text} />;
        });
      })}
    </>
  );
};
