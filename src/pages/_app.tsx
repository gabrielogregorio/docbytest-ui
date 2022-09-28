import { AppProps } from 'next/app';
import { DataProvider } from '../core/contexts/dataProvider';
import { MenuProvider } from '../core/contexts/menuProvider';
import { TestSelectedProvider } from '../core/contexts/testSelectedProvider';
import { ThemeProvider } from '../core/contexts/themProvider';
import '../index.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TestSelectedProvider>
      <ThemeProvider>
        <MenuProvider>
          <DataProvider>
            <Component {...pageProps} />
          </DataProvider>
        </MenuProvider>
      </ThemeProvider>
    </TestSelectedProvider>
  );
}
