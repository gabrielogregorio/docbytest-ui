import { useContext } from 'react';
import { DataContext } from '../../../core/contexts/dataProvider';
import { DocSelectedContext } from '../../../core/contexts/docSelectedProvider';
import { apiDocsType, docItemType } from '../../../core/interfaces/api';
import { InterpreterMarkdown } from '../../interpreterMarkdown';

export const RenderDocs = () => {
  const { docs } = useContext(DataContext);
  const { docSelected } = useContext(DocSelectedContext);

  return (
    <>
      {docs.map((doc: apiDocsType) => {
        return doc.docs.map((docItem: docItemType) => {
          const docNotHasSelected = !docSelected.idContent.endsWith(docItem.title);
          if (docNotHasSelected) {
            return null;
          }

          return <InterpreterMarkdown key={docItem.text} text={docItem.text} />;
        });
      })}
    </>
  );
};
