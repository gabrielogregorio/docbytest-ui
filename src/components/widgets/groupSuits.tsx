import { useContext } from 'react';
import { TestSelectedContext } from '../../core/contexts/testSelectedProvider';
import { sortTestByStatusCode } from '../../core/helpers/sortTestByStatusCode';
import { apiResponseFileTypes, testBaseObjectType, testsType } from '../../core/interfaces/api';
import { normalizeStrings } from '../../core/normalizers/strings';
import { GroupCases } from './groupCases';

type listBaseType = {
  tests: testsType[];
  isSelected: boolean;
  indexPath: any;
  indexMethod: any;
  localMethod: string;
  title: string;
  method: string;
};

export const GroupSuits = ({ files, filter }: { files: apiResponseFileTypes[]; filter: string }) => {
  const { testSelected } = useContext(TestSelectedContext);

  function renderSuits() {
    return files.map((file: apiResponseFileTypes) => {
      const keysPaths = Object.keys(file.paths);
      const listBase: listBaseType[] = [];

      keysPaths?.forEach((path: string, indexPath: number) => {
        const methods = Object.keys(file.paths[path]);

        methods.forEach((method: string, indexMethod: number) => {
          const { tests }: testBaseObjectType = file.paths[path][method];

          const testsSorted = sortTestByStatusCode(tests);

          const { method: localMethod, title, router, description } = testsSorted[0] ?? {};
          const isSelected = testSelected?.indexSelected === `${file.title}-${indexPath}-${indexMethod}`;

          const existsFilter = filter !== '';
          const filterNormalized = normalizeStrings(filter);
          const notExistsMatchFilterInRouterOrTexts =
            !normalizeStrings(router).includes(filterNormalized) &&
            !normalizeStrings(description).includes(filterNormalized) &&
            !normalizeStrings(title).includes(filterNormalized) &&
            !normalizeStrings(file.title).includes(filterNormalized) &&
            !normalizeStrings(file.description).includes(filterNormalized);

          if (existsFilter && notExistsMatchFilterInRouterOrTexts) {
            //
          } else {
            listBase.push({
              tests,
              isSelected,
              localMethod,
              indexMethod,
              title,
              method,
              indexPath,
            });
          }
        });
      });

      return <GroupCases listBase={listBase} title={file.title} description={file.description} />;
    });
  }

  return <>{renderSuits()}</>;
};
