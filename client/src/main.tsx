import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { VITE_APP_AUTHO_DOMAIN, VITE_CLIENT_ID, VITE_APP_AUTH0_AUDIENCE } from './utils/constant';
import { Auth0Provider } from '@auth0/auth0-react'


const queryClient = new QueryClient()

const domain = VITE_APP_AUTHO_DOMAIN;
const clientId = VITE_CLIENT_ID;
const audience = VITE_APP_AUTH0_AUDIENCE;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
      domain= {domain}
      clientId= {clientId}
      // redirectUri={window.location.origin}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: audience
      }}
    >
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
    </Auth0Provider>
  </React.StrictMode>,
)
