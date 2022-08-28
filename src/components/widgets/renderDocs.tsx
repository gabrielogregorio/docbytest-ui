import { ReactElement, useContext } from 'react';
import { DataContext } from '../../core/contexts/dataProvider';
import { TestSelectedContext } from '../../core/contexts/testSelectedProvider';
import { apiDocsType, docItemType } from '../../core/interfaces/api';
import { InterpreterMarkdown } from '../interpreterMarkdown';
import { reInterpreterDefault } from '../../core/handlers/reInterpreter';
import { renderHandlerMarkdownDocbytest } from '../../core/handlers/renderHtmlMarkdow';

export const RenderDocs = (): ReactElement => {
  const { docs } = useContext(DataContext);
  const { testSelected } = useContext(TestSelectedContext);

  function renderItems() {
    return docs.map((doc: apiDocsType) => {
      const folderDocNotHasSelected = !testSelected.indexSelected.startsWith(doc.title);
      if (folderDocNotHasSelected) {
        return null;
      }

      return doc.docs.map((docItem: docItemType) => {
        const docNotHasSelected = !testSelected.indexSelected.endsWith(docItem.title);
        if (docNotHasSelected) {
          return null;
        }

        return (
          <InterpreterMarkdown
            key={docItem.text}
            text={docItem.text}
            reInterpreter={reInterpreterDefault}
            renderHandlerMarkdown={renderHandlerMarkdownDocbytest}
          />
        );
      });
    });
  }

  const notExistsSelectedTests = testSelected.tests.length === 0;
  if (!notExistsSelectedTests) {
    return <div />;
  }

  return <>{renderItems()}</>;
};
