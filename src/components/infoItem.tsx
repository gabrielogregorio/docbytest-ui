import { BadgeMethod } from './widgets/badgeMethod';

type badgeType = { [method: string]: { text: string } };

const dataBadge: badgeType = {
  post: {
    text: 'hover:text-blue-600 hover:dark:text-blue-300',
  },
  get: {
    text: 'hover:text-green-600 hover:dark:text-green-300',
  },
  put: {
    text: 'hover:text-orange-600 hover:dark:text-orange-300',
  },

  delete: {
    text: 'hover:text-red-600 hover:dark:text-red-300',
  },
  patch: { text: 'hover:text-red-600 hover:dark:text-red-300' },
  default: { text: 'hover:text-gray-600 hover:dark:text-gray-300' },
};

export const InfoItem = ({
  isSelected,
  onClick,
  localMethod,
  title,
  method,
}: {
  isSelected: boolean;
  onClick: () => void;
  localMethod: string;
  title: string;
  method: string;
}) => {
  const { text } = dataBadge?.[method] ?? dataBadge.default;
  const isSelectedStyle = isSelected ? 'dark:bg-gray-800 bg-gray-100' : '';
  return (
    <div>
      <div className={`text-gray-700 p-1.5  ${isSelectedStyle}`}>
        <button type="button" onClick={() => onClick()} className=" flex w-full cursor-pointer text-left">
          <div className="flex items-center flex-1">
            <BadgeMethod method={localMethod} />
            <h4
              id="sub-item-menu"
              className={`ml-2 flex-1 select-none overflow-hidden text-ellipsis dark:text-gray-200 text-gray-600 capitalize ${text}`}>
              {title}
            </h4>
          </div>
        </button>
      </div>
    </div>
  );
};
