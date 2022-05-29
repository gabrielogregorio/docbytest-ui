const GET_HEADER = 0;
const IGNORE_HEADER_AND_MARK = 2;

export function mountHtmlTableByMd(fullTable: string) {
  const listRowsTable = fullTable.split('\n');
  const headerTable = listRowsTable[GET_HEADER].split('|');
  const bodyTable = listRowsTable.splice(IGNORE_HEADER_AND_MARK, fullTable.length);

  return (
    <table className="table-auto w-full text-lg text-gray-600 my-4 bg-gray-200">
      <thead>
        <tr className="bg-gray-300 ">
          {headerTable.map((rowTable) => {
            if (!rowTable) {
              return null;
            }
            return <th className="py-2 border-b border-b-gray-300 text-left px-6">{rowTable}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {bodyTable.map((rowTable: string) => {
          const itemsColumnTable = rowTable.split('|');

          return (
            <tr>
              {itemsColumnTable.map((itemColumnTable: string) => {
                if (!itemColumnTable) {
                  return null;
                }
                return <td className="font-bold px-6 py-2">{itemColumnTable}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
