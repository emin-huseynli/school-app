
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './context/AuthProvider'

function App() {

  return (
    <AuthProvider>
      <Navbar />
      <ToastContainer />
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Login />
    </AuthProvider>
      
  )
}

export default App
