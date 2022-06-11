import { useContext } from 'react';
import { TestSelectedContext } from '../../core/contexts/testSelectedProvider';
import { sortTestByStatusCode } from '../../core/helpers/sortTestByStatusCode';
import { apiPathType, testBaseObjectType } from '../../core/interfaces/api';
import { SidebarBaseItemMenu } from '../sidebarBaseItemMenu';

type groupCasesType = {
  paths: apiPathType;
  title: string;
  description: string;
  filter: string;
};

const handleRemoveAccentuation = (text: string) => {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

const normalizeStrings = (text: string = '') => {
  const str = handleRemoveAccentuation(text);
  return str.toLowerCase().trim();
};

export const GroupCases = ({
  paths: fullObjectPaths,
  title: titleBase,
  description: descriptionBase,
  filter,
}: groupCasesType) => {
  const paths = Object.keys(fullObjectPaths);
  const { setTestSelected, testSelected } = useContext(TestSelectedContext);

  function renderCases() {
    return paths?.map((path: string, indexPath: number) => {
      const methods = Object.keys(fullObjectPaths[path]);

      return methods.map((method: string, indexMethod: number) => {
        const { tests }: testBaseObjectType = fullObjectPaths[path][method];

        const testsSorted = sortTestByStatusCode(tests);

        const { method: localMethod, title, router, description } = testsSorted[0] ?? {};
        const isSelected = testSelected?.indexSelected === `${titleBase}-${indexPath}-${indexMethod}`;

        const existsFilter = filter !== '';
        const filterNormalized = normalizeStrings(filter);
        const notExistsMatchFilterInRouterOrTexts =
          !normalizeStrings(router).includes(filterNormalized) &&
          !normalizeStrings(description).includes(filterNormalized) &&
          !normalizeStrings(title).includes(filterNormalized) &&
          !normalizeStrings(titleBase).includes(filterNormalized) &&
          !normalizeStrings(descriptionBase).includes(filterNormalized);

        if (existsFilter && notExistsMatchFilterInRouterOrTexts) {
          return null;
        }
        return (
          <SidebarBaseItemMenu
            isSelected={isSelected}
            onClick={() =>
              setTestSelected({
                tests: testsSorted,
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
      });
    });
  }

  return <>{renderCases()}</>;
};
