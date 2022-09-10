import { ReactNode } from 'react';

export const InfoHeader = ({ title, children }: { children: ReactNode; title: string }) => {
  return (
    <div className="flex flex-col p-2">
      <div className="flex justify-center">
        <div className="flex-1">
          <h3
            id="title-item-menu"
            className="text-lg font-bold dark:text-gray-200 text-gray-600 uppercase hover:text-blue-500">
            {title}
          </h3>
        </div>
      </div>

      {children}
    </div>
  );
};
