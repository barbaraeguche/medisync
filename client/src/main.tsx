import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/redux/store.ts';
import './ui/global.css';
import App from '@/app';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <Provider store={store}>
        <App/>
      </Provider>
    </StrictMode>
  </BrowserRouter>
)
