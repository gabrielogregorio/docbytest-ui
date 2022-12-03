import { ReactElement, useContext } from 'react';
import { IconDark, IconLight, IconMenu } from '../../icons';
import { ThemeContext } from '../../core/contexts/themProvider';
import Logo from '../../assets/logo.png';
import { MenuContext } from '../../core/contexts/menuProvider';

export const Header = (): ReactElement => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { toggleMenuIsOpen } = useContext(MenuContext);
  const styleTheme: string = theme === 'white' ? 'left-0' : 'translate-x-10';

  return (
    <div
      style={{ height: '3.5rem' }}
      className="w-full bg-cyan-500 dark:bg-cyan-700 p-3 py-2 flex items-center h-[3.5rem] min-h-[3.5rem]">
      <header className="text-white font-bold text-3xl uppercase w-full flex items-center justify-center ">
        <div className="bg-cyan-500 dark:bg-cyan-700 text-white font-bold text-xl text-left p-3 py-2 uppercase flex items-center h-[3.5rem] min-h-[3.5rem]">
          <button
            type="button"
            id="expand-menu"
            onClick={(): void => toggleMenuIsOpen()}
            className="mr-2 lg:hidden border border-gray-300 dark:border-cyan-700 bg-white dark:bg-cyan-600 rounded-full p-2 text-cyan-600 dark:text-white">
            <IconMenu />
          </button>

          <div className="mr-2">
            <img src={Logo} alt="Logo do docbytet" className="hidden sm:block sm:w-[40px] sm:h-[29px]" />
          </div>

          <div id="main-title">docbytest</div>
        </div>

        <div className="flex-1" />

        <div>
          <button
            type="button"
            data-testid="change-theme"
            onClick={(): void => toggleTheme()}
            className="bg-cyan-700 dark:bg-cyan-600 dark:ring-cyan-600 ring-cyan-700 ring-2 w-16 flex rounded-xl relative">
            <div
              className={`h-full aspect-square rounded-full bg-white absolute transition-all duration-150 top-0 ${styleTheme}`}
            />

            <div className="flex-1 p-1 flex items-center justify-center">
              <IconLight />
            </div>

            <div className="flex-1 p-1 flex items-center justify-center">
              <IconDark />
            </div>
          </button>
        </div>
      </header>
    </div>
  );
};
