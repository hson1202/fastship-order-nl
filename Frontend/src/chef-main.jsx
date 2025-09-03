import React from 'react'
import ReactDOM from 'react-dom/client'
import ChefApp from '../chef-app.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ChefApp />
  </BrowserRouter>,
)
