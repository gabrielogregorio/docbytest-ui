const dataBadge: any = {
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

export const BadgePost = ({ method }: any) => {
  const { title, bg } = dataBadge?.[method] ?? dataBadge.default;
  return <div className={`select-none ${bg} py-1 px-2 rounded-xl text-white text-sm`}>{title}</div>;
};
