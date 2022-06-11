type insideMenu = {
  onClick: any;
  isSelected: boolean;
  text: string;
};

export const InsideMenu = ({ onClick, isSelected, text }: insideMenu) => {
  const styleIsCaseSelected = isSelected
    ? 'border-b-4 border-b-cyan-500 bg-gray-50 dark:bg-gray-700'
    : 'border-b-4 border-b-gray-200 dark:border-b-gray-600 dark:bg-gray-900';

  return (
    <button
      type="button"
      title={text}
      onClick={() => onClick()}
      className={`p-2 py-1.5 flex justify-center items-center group ${styleIsCaseSelected} hover:border-b-cyan-500`}>
      <div className="py-2 px-3">
        <div className="flex items-center dark:text-gray-200 text-gray-600 group-hover:text-cyan-500 font-bold">
          <span>{text}</span>
        </div>
      </div>

      {/* <td className="py-2 px-2 whitespace-nowrap select-none">{test?.title}</td> */}
    </button>
  );
};