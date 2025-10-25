import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { Theme } from "@radix-ui/themes";
import LoadingState from './components/LoadingState.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
      <LoadingState>
        <BrowserRouter>
          <Theme>
            <App />
          </Theme>
        </BrowserRouter>
      </LoadingState>
    </Provider> 
  </StrictMode>,
)
