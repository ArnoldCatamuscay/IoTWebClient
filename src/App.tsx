import './App.css'
import Login from './pages/auth/Login'
import Home from './pages/home/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'
import ThingSpeakKeys from './pages/home/ThingSpeakKeys'
import Register from './pages/auth/Register'
import { AuthProvider } from './context/authContext' 
import 'react-toastify/dist/ReactToastify.css';
import { ProtectedRoute } from './components/ProtectedRoute'
import Account from './pages/auth/Account'
import NavBar from './components/Nav'

function App() {
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home />  
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/credentials" element={
            <ProtectedRoute>
              <ThingSpeakKeys />
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
        </Routes>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition = { Bounce }
        />
      </AuthProvider>
    </Router>
  )
}

export default App
