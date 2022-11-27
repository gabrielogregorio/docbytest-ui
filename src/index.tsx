import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DataProvider } from './core/contexts/dataProvider';
import { MenuProvider } from './core/contexts/menuProvider';
import App from './App';
import { DocSelectedProvider } from './core/contexts/docSelectedProvider';
import { ThemeProvider } from './core/contexts/themProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <DocSelectedProvider>
      <ThemeProvider>
        <MenuProvider>
          <DataProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/docs" element={<App />} />
              </Routes>
            </BrowserRouter>
          </DataProvider>
        </MenuProvider>
      </ThemeProvider>
    </DocSelectedProvider>
  </React.StrictMode>,
);
