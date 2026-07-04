import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppV1 from './AppV1.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppV1 />
  </StrictMode>,
)
