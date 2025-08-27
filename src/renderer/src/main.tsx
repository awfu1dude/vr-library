import './assets/main.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import ResourcesProvider from './providers/ResourcesProvider';

const root = document.getElementById('root')!;

createRoot(root).render(
  <StrictMode>
    <ResourcesProvider>
      <App />
    </ResourcesProvider>
  </StrictMode>
);
