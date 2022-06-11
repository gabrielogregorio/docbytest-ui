import { BadgeMethod } from './widgets/badgeMethod';

type badgeType = { [method: string]: { text: string } };

const dataBadge: badgeType = {
  post: {
    text: 'hover:text-blue-600',
  },
  get: {
    text: 'hover:text-green-600',
  },
  put: {
    text: 'hover:text-orange-600',
  },

  delete: {
    text: 'hover:text-red-600',
  },
  patch: { text: 'hover:text-red-600' },
  default: { text: 'hover:text-gray-600' },
};

export const SidebarBaseItemMenu = ({
  isSelected,
  onClick,
  localMethod,
  title,
  method,
}: {
  isSelected: boolean;
  onClick: any;
  localMethod: string;
  title: string;
  method: string;
}) => {
  const { text } = dataBadge?.[method] ?? dataBadge.default;

  return (
    <div>
      <div className={`text-gray-700 p-1.5  ${isSelected ? 'bg-gray-100' : ''}`}>
        <button type="button" onClick={() => onClick()} className=" flex w-full cursor-pointer text-left">
          <div className="flex items-center flex-1">
            {localMethod ? <BadgeMethod method={localMethod} /> : null}
            <p className={`ml-2 flex-1 select-none overflow-hidden text-ellipsis text-gray-600 ${text}`}>{title}</p>
          </div>
        </button>
      </div>
    </div>
  );
};
