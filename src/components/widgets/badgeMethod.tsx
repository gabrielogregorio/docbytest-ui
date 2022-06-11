type badgeType = { [method: string]: { title: string; bg: string } };

export const dataBadge: badgeType = {
  post: {
    title: 'POST',
    bg: 'border-l-2 border-blue-500 text-blue-500',
  },
  get: {
    title: 'GET',
    bg: 'border-l-2 border-green-500 text-green-500',
  },
  put: {
    title: 'PUT',
    bg: 'border-l-2 border-orange-500 text-orange-500',
  },

  delete: {
    title: 'DELETE',
    bg: 'border-l-2 border-red-500 text-red-500',
  },
  patch: { title: 'PATCH', bg: 'bg-red-500' },
  default: { title: 'desconhecido', bg: 'bg-gray-500' },
};

export const BadgeMethod = ({ method }: { method: string }) => {
  const { title, bg } = dataBadge?.[method] ?? dataBadge.default;

  return <div className={`select-none ${bg} px-2 text-sm w-14 text-left`}>{title}</div>;
};
