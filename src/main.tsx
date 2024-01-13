import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { AuthProvider } from './auth/auth.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Theme accentColor="grass" grayColor="sand" radius="large" scaling="95%">
    <AuthProvider>
      <App />
    </AuthProvider>
  </Theme>
  // </React.StrictMode>
);
