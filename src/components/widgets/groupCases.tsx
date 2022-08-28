import { useContext } from 'react';
import { TestSelectedContext } from '../../core/contexts/testSelectedProvider';
import { testsType } from '../../core/interfaces/api';
import { InfoItem } from '../infoItem';
import { InfoHeader } from '../infoHeader';

type groupCasesType = {
  title: string;
  description: string;
  listBase: {
    tests: testsType[];
    isSelected: boolean;
    indexPath: string;
    indexMethod: string;
    localMethod: string;
    title: string;
    method: string;
  }[];
};

export const GroupCases = ({ listBase, title: titleBase, description: descriptionBase }: groupCasesType) => {
  const { setTestSelected } = useContext(TestSelectedContext);

  if (listBase.length === 0) {
    return null;
  }

  return (
    <InfoHeader key={titleBase} title={titleBase}>
      {listBase.map(({ tests, isSelected, indexPath, indexMethod, localMethod, title, method }) => {
        return (
          <InfoItem
            key={title}
            isSelected={isSelected}
            onClick={() =>
              setTestSelected({
                tests,
                indexSelected: `${titleBase}-${indexPath}-${indexMethod}`,
                titleBase,
                descriptionBase,
              })
            }
            localMethod={localMethod}
            title={title}
            method={method}
          />
        );
      })}
    </InfoHeader>
  );
};
