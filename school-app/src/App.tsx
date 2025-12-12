
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './context/AuthProvider'
import { PrivateRoute } from './components/ProtectedRoute'

function App() {

  return (
    <AuthProvider>
      <Navbar />
      <ToastContainer />
      <div>
        <Routes>
          <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
      </div>
    </AuthProvider>

  )
}

export default App
