import { createContext, Dispatch, ReactNode, SetStateAction, useMemo, useState } from 'react';

type menuContextType = {
  menuIsOpen: boolean;
  setMenuIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const MenuContext = createContext({} as menuContextType);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  const value = useMemo(() => ({ menuIsOpen, setMenuIsOpen }), [menuIsOpen]);

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};
