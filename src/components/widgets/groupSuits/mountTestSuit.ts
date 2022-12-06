import { initialStateDocSelectedType } from '@/contexts/docSelectedProvider';
import { sortTestByStatusCode } from '@/helpers/sortTestByStatusCode';
import { apiResponseFileTypes, testBaseObjectType, testsType } from '@/interfaces/api';
import { groupCasesType } from '.';

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
    const keysPaths: string[] = Object.keys(file.paths);
    const listBase: listBaseType[] = [];

    keysPaths?.forEach((path: string, indexPath: number) => {
      const methods: string[] = Object.keys(file.paths[path]);

      methods.forEach((method: string, indexMethod: number) => {
        const tests: testBaseObjectType = file.paths[path][method];
        const testsSorted: testsType[] = sortTestByStatusCode(tests);

        const { method: localMethod, title } = testsSorted[0] ?? {};
        const isSelected: boolean = docSelected?.idContent === `${file.title}-${indexPath}-${indexMethod}`;

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
