import { ReactNode } from 'react';

export const SidebarBaseMenu = ({ title, children }: { children: ReactNode; title: string }) => {
  return (
    <div className="flex flex-col p-2">
      <div className="flex justify-center">
        <div className="flex-1">
          <h2 className="text-lg font-bold text-gray-600 uppercase hover:text-blue-500">{title}</h2>
        </div>
      </div>

      {children}
    </div>
  );
};
