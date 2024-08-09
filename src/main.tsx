import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppCanvas from './editor/AppCanvas'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppCanvas />
  </StrictMode>,
)
