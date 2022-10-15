import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './i18n';
import MantineConfig from './libs/Mantine';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineConfig>
      <App />
    </MantineConfig>
  </React.StrictMode>
);
