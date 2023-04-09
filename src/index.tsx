import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './Router'
import './styles/reset.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <div className="App">
      <Router />
    </div>
  </React.StrictMode>
)
