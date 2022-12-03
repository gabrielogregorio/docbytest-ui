import { fireEvent, render, screen } from '@testing-library/react';
import { ReactElement, useContext } from 'react';
import { Header } from '../components/layout/header';
import { MenuContext, MenuProvider } from '../core/contexts/menuProvider';
import { ThemeContext, ThemeProvider } from '../core/contexts/themProvider';

const MockComponent = (): ReactElement => {
  const { theme } = useContext(ThemeContext);
  const { menuIsOpen } = useContext(MenuContext);

  return (
    <>
      <h1>theme {String(theme)}</h1>
      <h1>menuIsOpen {String(menuIsOpen)}</h1>

      <Header />
    </>
  );
};

describe('Header Context', () => {
  it('should alternate theme by header', () => {
    render(
      <ThemeProvider>
        <MenuProvider>
          <MockComponent />
        </MenuProvider>
      </ThemeProvider>,
    );

    expect(screen.queryByText('theme dark')).toBeInTheDocument();
    expect(screen.queryByText('menuIsOpen false')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('change-theme'));

    expect(screen.queryByText('theme white')).toBeInTheDocument();
    expect(screen.queryByText('menuIsOpen false')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('change-theme'));

    expect(screen.queryByText('theme dark')).toBeInTheDocument();
    expect(screen.queryByText('menuIsOpen false')).toBeInTheDocument();
  });
});
