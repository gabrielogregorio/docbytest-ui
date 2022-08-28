import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DataProvider } from './core/contexts/dataProvider';
import { MenuProvider } from './core/contexts/menuProvider';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { TestSelectedProvider } from './core/contexts/testSelectedProvider';
import { ThemeProvider } from './core/contexts/themProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <TestSelectedProvider>
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
    </TestSelectedProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
