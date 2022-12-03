import { ReactElement, useContext } from 'react';
import { DocSelectedContext } from '../../core/contexts/docSelectedProvider';
import { testsType } from '../../core/interfaces/api';
import { InfoItem } from '../infoItem';
import { InfoHeader } from '../infoHeader';

type groupCasesType = {
  title: string;
  description: string;
  listBase: {
    id: string;
    tests: testsType[];
    isSelected: boolean;
    localMethod: string;
    title: string;
    method: string;
  }[];
};

export const GroupCases = ({ listBase, title, description }: groupCasesType): ReactElement => {
  const { setDocSelected } = useContext(DocSelectedContext);

  if (listBase.length === 0) {
    return <div />;
  }

  return (
    <InfoHeader key={title} title={title}>
      <ul>
        {listBase.map(
          ({
            tests,
            isSelected,
            localMethod,
            title: titleLocal,
            method,
            id,
          }: groupCasesType['listBase'][0]): ReactElement => {
            return (
              <InfoItem
                key={titleLocal}
                isSelected={isSelected}
                onClick={(): void =>
                  setDocSelected({
                    tests,
                    idContent: id,
                    title: titleLocal,
                    description,
                  })
                }
                localMethod={localMethod}
                title={titleLocal}
                method={method}
              />
            );
          },
        )}
      </ul>
    </InfoHeader>
  );
};
