import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


// injected.js → window.postMessage → content.js → chrome.runtime.sendMessage → background.js → chrome.runtime.sendMessage → popup
