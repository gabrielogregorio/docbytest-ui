const replaceToMatch = (content: string, fullMatch: RegExpExecArray) => content.replace(fullMatch[0], '');

export const InterpreterMarkdown = ({ text }: any) => {
  let content = `\n${text}\n`;
  const arrayTry = Array.from(Array(text.split('\n').length).keys());

  return arrayTry.map(() => {
    const isTitleH1 = /^\s*#\s+(.*)\s*\n/.exec(content);
    if (isTitleH1) {
      content = replaceToMatch(content, isTitleH1);
      return <h1 data-testid="title-h1">{isTitleH1[1]}</h1>;
    }

    const isTitleH2 = /^\s*##\s+(.*)\s*\n/.exec(content);
    if (isTitleH2) {
      content = replaceToMatch(content, isTitleH2);
      return <h2 data-testid="title-h2">{isTitleH2[1]}</h2>;
    }

    const isTitleH3 = /^\s*###\s+(.*)\s*\n/.exec(content);
    if (isTitleH3) {
      content = replaceToMatch(content, isTitleH3);
      return <h3 data-testid="title-h3">{isTitleH3[1]}</h3>;
    }

    const isTitleH4 = /^\s*####\s+(.*)\s*\n/.exec(content);
    if (isTitleH4) {
      content = replaceToMatch(content, isTitleH4);
      return <h4 data-testid="title-h4">{isTitleH4[1]}</h4>;
    }

    const isTitleH5 = /^\s*#####\s+(.*)\s*\n/.exec(content);
    if (isTitleH5) {
      content = replaceToMatch(content, isTitleH5);
      return <h5 data-testid="title-h5">{isTitleH5[1]}</h5>;
    }

    const isTitleH6 = /^\s*######\s+(.*)\s*\n/.exec(content);
    if (isTitleH6) {
      content = replaceToMatch(content, isTitleH6);
      return <h6 data-testid="title-h6">{isTitleH6[1]}</h6>;
    }

    const isCode = /^\s*```\s*([\w]*)\s*\n([^`]*)```\s*\n/.exec(content);
    if (isCode) {
      content = replaceToMatch(content, isCode);
      return (
        <code data-testid="code">
          {isCode[1]} - {isCode[2].trim()}
        </code>
      );
    }

    const isSpecialTable = /^\s*\[(.+?)\]\(([\w_]+)\)\s*\n/.exec(content);
    if (isSpecialTable) {
      content = replaceToMatch(content, isSpecialTable);
      return (
        <span data-testid="special">
          {isSpecialTable[1]} - {isSpecialTable[2]}
        </span>
      );
    }

    const isLinks = /^\s*\[(.+?)\]\((.+?)\)\s*\n/.exec(content);
    if (isLinks) {
      content = replaceToMatch(content, isLinks);
      return (
        <span data-testid="links">
          {isLinks[1]} - {isLinks[2]}
        </span>
      );
    }

    const isCompleteList = /^\s*\*\s*(.*)(\n\s*\*\s*.*)*\n/.exec(content);
    if (isCompleteList) {
      content = replaceToMatch(content, isCompleteList);
      return <li data-testid="completeList">{isCompleteList[0].trim()}</li>;
    }

    const isTable = /^(\\|.+\|)\n[\\|\-\s]+\n((\|.+\|\n)*)\n/.exec(content);
    if (isTable) {
      content = replaceToMatch(content, isTable);
      return (
        <table>
          <tbody data-testid="tbody">{isTable[1].trim()}</tbody>
          <thead data-testid="thead">{isTable[2].trim()}</thead>
        </table>
      );
    }

    const isComment = /^\s*>\s*(danger|warning|)\s*#\s*(.*?)\n\s*>\s*(.*?)\n/.exec(content);
    if (isComment) {
      content = replaceToMatch(content, isComment);
      return (
        <div>
          <div data-testid="comment-type">{isComment[1]}</div>
          <div data-testid="comment-title">{isComment[2]}</div>
          <div data-testid="comment-content">{isComment[3]}</div>
        </div>
      );
    }

    const isParagraph = /^(.{1,})\n/.exec(content);
    if (isParagraph) {
      if (isParagraph[0].replace(/[\n\s]/g, '') !== '') {
        content = replaceToMatch(content, isParagraph);
        return <p data-testid="paragraph">{isParagraph[0].trim()}</p>;
      }
    }
    content = content.replace(/\s*\n/, '');
    return <span />;
  });
};
