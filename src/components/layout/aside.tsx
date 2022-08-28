import { ReactNode, useContext } from 'react';
import { MenuContext } from '../../core/contexts/menuProvider';

export const Aside = ({ children }: { children: ReactNode }) => {
  const { menuIsOpen } = useContext(MenuContext);

  return (
    <aside
      className={`absolute top-0 ${
        menuIsOpen ? 'w-full sm:w-80 lg:w-full' : 'hidden lg:block lg:w-full'
      } z-20 left-0 lg:relative lg:block lg:col-span-3 h-full overflow-y-auto bg-white dark:bg-dark`}>
      <nav>{children}</nav>
    </aside>
  );
};
