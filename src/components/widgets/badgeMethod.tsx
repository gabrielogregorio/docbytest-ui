import { ReactElement } from 'react';

type badgeType = { [method: string]: { title: string; bg: string; border: string } };

export const dataBadge: badgeType = {
  post: {
    title: 'POST',
    bg: 'dark:border-blue-300 text-blue-500 dark:text-blue-300',
    border: 'border-l-2 border-blue-500 ',
  },
  get: {
    title: 'GET',
    bg: 'dark:border-green-300 text-green-500 dark:text-green-300',
    border: 'border-l-2 border-green-500 ',
  },
  put: {
    title: 'PUT',
    bg: 'dark:border-orange-300 text-orange-500 dark:text-orange-300',
    border: 'border-l-2 border-orange-500 ',
  },

  delete: {
    title: 'DELETE',
    bg: 'dark:border-red-300 text-red-500 dark:text-red-300',
    border: 'border-l-2 border-red-500',
  },
  docs: {
    title: 'DOCS',
    bg: 'dark:border-blue-300 text-blue-500 dark:text-blue-300',
    border: 'border-l-2 border-blue-500',
  },
  default: { title: 'desconhecido', bg: 'bg-gray-500', border: 'border-l-2 border-gray-500' },
};

export const BadgeMethod = ({ method, onlyText = false }: { method: string; onlyText?: boolean }): ReactElement => {
  if (!method) {
    return <div />;
  }

  const { title, bg, border } = dataBadge?.[method] ?? dataBadge.default;

  return <div className={`select-none ${bg} ${onlyText ? '' : border} px-2 text-sm w-14 text-left`}>{title}</div>;
};
