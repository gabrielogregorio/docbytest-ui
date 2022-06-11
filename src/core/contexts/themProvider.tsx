import { createContext, ReactNode, useMemo, useState } from 'react';

type themeType = 'white' | 'dark';

const nameThemeApiDocs = 'themeApiDocbytest';
const themeApiDocbytest = localStorage.getItem(nameThemeApiDocs) || 'dark';

const initialStateTheme: themeType = themeApiDocbytest === 'dark' ? 'dark' : 'white';

type themeContextType = {
  theme: themeType;
  toggleTheme: () => void;
};

export const ThemeContext = createContext({} as themeContextType);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<themeType>(initialStateTheme);

  const toggleTheme = () => {
    if (theme === 'dark') {
      localStorage.setItem(nameThemeApiDocs, 'white');
      setTheme('white');
    } else {
      localStorage.setItem(nameThemeApiDocs, 'dark');
      setTheme('dark');
    }
  };

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
