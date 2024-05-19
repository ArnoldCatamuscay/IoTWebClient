import './App.css'
import Login from './pages/auth/Login'
import Home from './pages/home/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard/Dashboard'
import Register from './pages/auth/Register'
import { AuthProvider } from './context/authContext' 
import 'react-toastify/dist/ReactToastify.css';
import { ProtectedRoute } from './components/ProtectedRoute'
import Account from './pages/auth/Account'
import NavBar from './components/Nav'
import { Toaster } from 'sonner'
import Landing from './pages/Landing'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/account" element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          } />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Toaster 
          position="top-right"
          richColors={true}
          closeButton 
        />
      </AuthProvider>
    </Router>
  )
}

export default App
