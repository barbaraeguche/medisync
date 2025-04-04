import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import '@/index.css';
import App from '@/app';
import ErrorBoundary from '@/components/errors/error-boundary';
import ScrollToTop from '@/components/scroll-to-top';

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <BrowserRouter>
      <StrictMode>
        <Toaster position={'top-center'}/>
        <ScrollToTop/>
        <Provider store={store}>
          <App/>
        </Provider>
      </StrictMode>
    </BrowserRouter>
  </ErrorBoundary>
)
