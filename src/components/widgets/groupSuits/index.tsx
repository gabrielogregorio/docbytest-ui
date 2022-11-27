import { useContext } from 'react';
import { DataContext } from '../../../core/contexts/dataProvider';
import { DocSelectedContext } from '../../../core/contexts/docSelectedProvider';
import { testsType } from '../../../core/interfaces/api';
import { normalizeStrings } from '../../../core/normalizers/strings';
import { GroupCases } from '../groupCases';
import { mountDocs } from './mountDocs';
import { mountTestSuit } from './mountTestSuit';

export type groupCasesType = {
  listBase: {
    id: string;
    tests: testsType[];
    isSelected: boolean;
    localMethod: string;
    title: string;
    method: string;
  }[];
  title: string;
  key: string;
  description: string;
};

export const GroupSuits = ({ filter }: { filter: string }) => {
  const { docSelected } = useContext(DocSelectedContext);
  const { suites, docs } = useContext(DataContext);

  const groupCases: groupCasesType[] = [...mountDocs({ docSelected, docs }), ...mountTestSuit({ docSelected, suites })];

  return (
    <>
      {groupCases.map((groupCase): any => {
        const filterNormalized = normalizeStrings(filter);

        const insideTitle = groupCase.listBase.map((item) => item.title).join('');

        const notExistsMatchFilterInRouterOrTexts =
          !normalizeStrings(groupCase.description).includes(filterNormalized) &&
          !normalizeStrings(groupCase.title).includes(filterNormalized) &&
          !normalizeStrings(insideTitle).includes(filterNormalized);

        if (filter !== '' && notExistsMatchFilterInRouterOrTexts) {
          return <div />;
        }

        return (
          <GroupCases
            listBase={groupCase.listBase}
            title={groupCase.title}
            key={groupCase.key}
            description={groupCase.description}
          />
        );
      })}
    </>
  );
};
