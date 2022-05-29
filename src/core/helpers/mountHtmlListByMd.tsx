export function mountHtmlListByMd(fullListMd: string) {
  return (
    <ul className="text-lg text-gray-600 list-disc my-3 mx-4">
      {fullListMd.split('\n').map((itemList: string) => {
        if (!itemList) {
          return null;
        }
        return <li>{itemList}</li>;
      })}
    </ul>
  );
}
