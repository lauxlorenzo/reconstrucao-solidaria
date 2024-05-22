import React from 'react'
import AppRoutes from './AppRoutes'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/authContext'

const App:React.FC = () => {
  return (
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
  )
}

export default App
