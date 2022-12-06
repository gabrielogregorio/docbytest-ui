import { ReactElement, useContext } from 'react';
import { testsType } from '@/interfaces/api';
import { DocSelectedContext } from '@/contexts/docSelectedProvider';
import { InfoItem } from '@/components/infoItem';
import { InfoHeader } from '@/components/infoHeader';

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
