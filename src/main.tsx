import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import ErrorBoundary from './pages/error';
import store from './store/store';

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <ErrorBoundary>
        {/* <Auth0Provider
          domain={env().AUTH0_DOMAIN}
          clientId={env().AUTH0_CLIENTID}
          authorizationParams={{
            redirect_uri: window.location.origin,
            audience: 'https://api.access89.com',
            connection: 'a89-customers',
          }}
        > */}
          <QueryClientProvider client={queryClient}>
            <Provider store={store}>
              <App />
            </Provider>
          </QueryClientProvider>
        {/* </Auth0Provider> */}
      </ErrorBoundary>
    </NextUIProvider>
  </React.StrictMode>
);
