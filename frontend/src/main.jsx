import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import GlobalStyles from './components/GlobalStyles/index.js'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyles>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </GlobalStyles>
  </StrictMode>,
)
