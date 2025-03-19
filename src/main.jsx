import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ContextVisibleProvider } from './components/context/ContextVisible.jsx'
import { ContextDateProvider } from './components/context/ContextDate.jsx'
import { ContextTasksProvider } from './components/context/ContextTasks.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextDateProvider>
      <ContextTasksProvider>
        <ContextVisibleProvider>
          <App />
        </ContextVisibleProvider>
      </ContextTasksProvider>
    </ContextDateProvider>
  </StrictMode>,
)