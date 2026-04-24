import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { Providers } from "./providers.tsx"

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <Providers>
  <App />
  </Providers>
    
  </BrowserRouter>
)
