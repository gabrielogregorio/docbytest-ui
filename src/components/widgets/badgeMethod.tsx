type badgeType = { [method: string]: { title: string; bg: string } };

export const dataBadge: badgeType = {
  post: {
    title: 'POST',
    bg: 'bg-blue-500',
  },
  get: {
    title: 'GET',
    bg: 'bg-green-500',
  },
  put: {
    title: 'PUT',
    bg: 'bg-orange-500',
  },

  delete: {
    title: 'DELETE',
    bg: 'bg-red-500',
  },
  patch: { title: 'PATCH', bg: 'bg-red-500' },
  default: { title: 'desconhecido', bg: 'bg-gray-500' },
};

export const BadgeMethod = ({ method }: { method: string }) => {
  const { title, bg } = dataBadge?.[method] ?? dataBadge.default;

  return (
    <div>
      <div className={`select-none ${bg} py-2 px-4 rounded-lg text-white text-sm w-20 text-center`}>{title}</div>
    </div>
  );
};
