import { generateIds } from './shared/generateIds';

const colors = {
  special: 'text-purple-300',
  string: 'text-orange-300',
  keyString: 'text-blue-300',
  default: 'text-gray-300',
};

const DivideJson = () => {
  return <span className="text-gray-300">:</span>;
};

const KeyString = ({ text }: { text: string }) => {
  return <span className={colors.keyString}>{text}</span>;
};

const CommaTreatment = ({ value, colorsLocal }: { value: string; colorsLocal: string }) => {
  const lastCharacter = value.slice(value.length - 1, value.length - 1 + 1);
  const textWithoutLastCharacter = value.slice(0, value.length - 1);

  if (lastCharacter === ',') {
    return (
      <>
        <span className={`${colorsLocal}`}>{textWithoutLastCharacter}</span>
        <span className={colors.default}>,</span>
      </>
    );
  }

  return <span className={`${colorsLocal}`}>{value}</span>;
};

export const JsonColorizer = ({ text }: { text: string }) => {
  const linesText = text.split('\n');

  const renderLines = () => {
    return linesText.map((lineText) => {
      const line = lineText?.toString() || '';
      const [key, value] = line.split(':');

      const lineContainsOnlySpecialCharacters = ['{', '[', '}', ']', '},', '],'].includes(line.trim());
      if (lineContainsOnlySpecialCharacters) {
        return (
          <div key={generateIds()}>
            <CommaTreatment value={line} colorsLocal={colors.default} />
          </div>
        );
      }

      if (!key || !value) {
        return (
          <div key={generateIds()}>
            <span className={colors.default}>{line}</span>
          </div>
        );
      }

      const valueContainOnlySpecialTypes = /(^\d*|false|true|null)[,|]$/.test(value.trim());
      if (valueContainOnlySpecialTypes) {
        return (
          <div key={generateIds()}>
            <KeyString text={key} />
            <DivideJson />
            <CommaTreatment value={value} colorsLocal={colors.special} />
          </div>
        );
      }

      const valueContainsOnlyWithSpecialCharacters = ['[', '{'].includes(value.trim());
      if (valueContainsOnlyWithSpecialCharacters) {
        return (
          <div key={generateIds()}>
            <KeyString text={key} />
            <DivideJson />
            <CommaTreatment value={value} colorsLocal={colors.default} />
          </div>
        );
      }

      return (
        <div key={generateIds()}>
          <KeyString text={key} />
          <DivideJson />
          <CommaTreatment value={value} colorsLocal={colors.string} />
        </div>
      );
    });
  };

  return <>{renderLines()}</>;
};
