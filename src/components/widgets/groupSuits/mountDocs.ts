import { groupCasesType } from '.';
import { initialStateDocSelectedType } from '../../../core/contexts/docSelectedProvider';
import { apiDocsType, docItemType } from '../../../core/interfaces/api';

export const mountDocs = ({
  docSelected,
  docs,
}: {
  docSelected: initialStateDocSelectedType;
  docs: apiDocsType[];
}): groupCasesType[] => {
  const listItems: groupCasesType[] = [];

  docs.forEach((doc: apiDocsType) => {
    const mountListBase: groupCasesType['listBase'] = doc.docs.map((item: docItemType) => {
      const indexTitleAndTest: string = `${doc.title}${item.title}`;

      return {
        ...item,
        id: indexTitleAndTest,
        tests: [],
        isSelected: docSelected.idContent === indexTitleAndTest,
        indexPath: doc.title,
        indexMethod: item.title,
        localMethod: 'docs',
        title: item.title,
        method: '',
      };
    });

    listItems.push({
      listBase: mountListBase,
      title: doc.title,
      key: doc.title,
      description: '',
    });
  });

  return listItems;
};
