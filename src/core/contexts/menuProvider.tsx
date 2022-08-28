import { createContext, Dispatch, ReactNode, SetStateAction, useMemo, useState } from 'react';

type menuContextType = {
  menuIsOpen: boolean;
  setMenuIsOpen: Dispatch<SetStateAction<boolean>>;
  toggleMenuIsOpen: () => void;
};

export const MenuContext = createContext({} as menuContextType);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  const toggleMenuIsOpen = (): void => {
    setMenuIsOpen((prev) => !prev);
  };

  const value = useMemo(() => ({ menuIsOpen, setMenuIsOpen, toggleMenuIsOpen }), [menuIsOpen, toggleMenuIsOpen]);

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};
