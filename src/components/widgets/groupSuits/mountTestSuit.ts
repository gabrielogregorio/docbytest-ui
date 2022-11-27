import { groupCasesType } from '.';
import { initialStateDocSelectedType } from '../../../core/contexts/docSelectedProvider';
import { sortTestByStatusCode } from '../../../core/helpers/sortTestByStatusCode';
import { apiResponseFileTypes, testBaseObjectType, testsType } from '../../../core/interfaces/api';

type listBaseType = {
  tests: testsType[];
  isSelected: boolean;
  localMethod: string;
  title: string;
  method: string;
  id: string;
};

export const mountTestSuit = ({
  docSelected,
  suites,
}: {
  docSelected: initialStateDocSelectedType;
  suites: apiResponseFileTypes[];
}): groupCasesType[] => {
  const listItems: groupCasesType[] = [];

  suites?.forEach((file: apiResponseFileTypes) => {
    const keysPaths = Object.keys(file.paths);
    const listBase: listBaseType[] = [];

    keysPaths?.forEach((path: string, indexPath: number) => {
      const methods = Object.keys(file.paths[path]);

      methods.forEach((method: string, indexMethod: number) => {
        const tests: testBaseObjectType = file.paths[path][method];
        const testsSorted = sortTestByStatusCode(tests);

        const { method: localMethod, title } = testsSorted[0] ?? {};
        const isSelected = docSelected?.idContent === `${file.title}-${indexPath}-${indexMethod}`;

        listBase.push({
          id: `${file.title}-${indexPath}-${indexMethod}`,
          tests,
          isSelected,
          localMethod,
          title,
          method,
        });
      });
    });

    listItems.push({
      listBase,
      title: file.title,
      key: file.title,
      description: file.description,
    });
  });

  return listItems;
};