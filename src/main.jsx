import React from 'react'
import ReactDOM from 'react-dom/client'
//import {RouterProvider, createBrowserRouter} from 'react-router-dom'

import App from './App.jsx'
import ProfessroPage from './routes/ProfessorPage.jsx'
import NotFound from './routes/NotFound.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
