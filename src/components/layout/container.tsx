import { ReactNode, useContext } from 'react';
import { ThemeContext } from '../../core/contexts/themProvider';

export const Container = ({ children }: { children: ReactNode }) => {
  const { theme } = useContext(ThemeContext);

  return <div className={`w-full overflow-hidden ${theme === 'dark' ? 'dark' : ''} `}>{children}</div>;
};