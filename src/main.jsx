import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { Context } from './context/appContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Context>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </Context>
)
