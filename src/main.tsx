import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DataProvider } from './core/contexts/dataProvider';
import { MenuProvider } from './core/contexts/menuProvider';
import { TestSelectedProvider } from './core/contexts/testSelectedProvider';
import { ThemeProvider } from './core/contexts/themProvider';
import './index.css';
import { NotFoundPage } from './notFoundPage';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TestSelectedProvider>
      <ThemeProvider>
        <MenuProvider>
          <DataProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/docs" element={<App />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </BrowserRouter>
          </DataProvider>
        </MenuProvider>
      </ThemeProvider>
    </TestSelectedProvider>
  </React.StrictMode>,
);
