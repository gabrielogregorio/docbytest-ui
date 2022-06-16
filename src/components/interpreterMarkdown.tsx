import { generateIds } from '../core/shared/generateIds';
import { regexInterpreterType, renderHandlerMarkdownType } from '../core/interfaces/interpreter';

const replaceToMatch = (content: string, fullMatch: RegExpExecArray) => content.replace(fullMatch[0], '');

type InterpreterMarkdownInterface = {
  text: string;
  reInterpreter: regexInterpreterType;
  renderHandlerMarkdown: renderHandlerMarkdownType;
};

export const InterpreterMarkdown = ({ text, reInterpreter, renderHandlerMarkdown }: InterpreterMarkdownInterface) => {
  let content = `\n${text}\n`;
  const arrayTry = Array.from(Array(text.split('\n').length).keys());

  function renderInterpreter() {
    return arrayTry.map(() => {
      const isTitleH1 = reInterpreter.isTitleH1.exec(content);
      if (isTitleH1) {
        content = replaceToMatch(content, isTitleH1);
        return <span key={generateIds()}>{renderHandlerMarkdown.h1(isTitleH1[1])}</span>;
      }

      const isTitleH2 = reInterpreter.isTitleH2.exec(content);
      if (isTitleH2) {
        content = replaceToMatch(content, isTitleH2);
        return <span key={generateIds()}>{renderHandlerMarkdown.h2(isTitleH2[1])}</span>;
      }

      const isTitleH3 = reInterpreter.isTitleH3.exec(content);
      if (isTitleH3) {
        content = replaceToMatch(content, isTitleH3);
        return <span key={generateIds()}>{renderHandlerMarkdown.h3(isTitleH3[1])}</span>;
      }

      const isTitleH4 = reInterpreter.isTitleH4.exec(content);
      if (isTitleH4) {
        content = replaceToMatch(content, isTitleH4);
        return <span key={generateIds()}>{renderHandlerMarkdown.h4(isTitleH4[1])}</span>;
      }

      const isTitleH5 = reInterpreter.isTitleH5.exec(content);
      if (isTitleH5) {
        content = replaceToMatch(content, isTitleH5);
        return <span key={generateIds()}>{renderHandlerMarkdown.h5(isTitleH5[1])}</span>;
      }

      const isTitleH6 = reInterpreter.isTitleH6.exec(content);
      if (isTitleH6) {
        content = replaceToMatch(content, isTitleH6);
        return <span key={generateIds()}>{renderHandlerMarkdown.h6(isTitleH6[1])}</span>;
      }

      const isCode = reInterpreter.isCode.exec(content);
      if (isCode) {
        content = replaceToMatch(content, isCode);
        return <span key={generateIds()}>{renderHandlerMarkdown.code(isCode[1], isCode[2].trim())}</span>;
      }

      const isSpecialTable = reInterpreter.isSpecialTable.exec(content);
      if (isSpecialTable) {
        content = replaceToMatch(content, isSpecialTable);
        return (
          <span key={generateIds()}>
            {renderHandlerMarkdown.specialTable(isSpecialTable[1], isSpecialTable[2].trim())}
          </span>
        );
      }

      const isCompleteList = reInterpreter.isCompleteList.exec(content);
      if (isCompleteList) {
        content = replaceToMatch(content, isCompleteList);
        return <span key={generateIds()}>{renderHandlerMarkdown.list(isCompleteList[0])}</span>;
      }

      const isTable = reInterpreter.isTable.exec(content);
      if (isTable) {
        content = replaceToMatch(content, isTable);
        return <span key={generateIds()}> {renderHandlerMarkdown.table(isTable[1], isTable[2])}</span>;
      }

      const isComment = reInterpreter.isComment.exec(content);
      if (isComment) {
        content = replaceToMatch(content, isComment);
        return (
          <span key={generateIds()}> {renderHandlerMarkdown.comment(isComment[1], isComment[2], isComment[3])}</span>
        );
      }

      const isParagraph = reInterpreter.isParagraph.exec(content);
      if (isParagraph) {
        const paragraphIsEmpty = isParagraph[0].replace(/[\n\s]/g, '') !== '';
        if (paragraphIsEmpty) {
          content = replaceToMatch(content, isParagraph);
          return <span key={generateIds()}> {renderHandlerMarkdown.paragraph(isParagraph[0])}</span>;
        }
      }

      content = content.replace(/\s{0,10}\n/, '');
      return <span key={generateIds()} />;
    });
  }

  return <>{renderHandlerMarkdown.base(renderInterpreter())}</>;
};
