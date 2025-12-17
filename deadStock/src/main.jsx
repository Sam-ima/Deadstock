import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from '@emotion/react';
// import Theme from './theme.jsx';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider 
    // theme={Theme}
    >
      <App />
    </ThemeProvider>
  </React.StrictMode>
);