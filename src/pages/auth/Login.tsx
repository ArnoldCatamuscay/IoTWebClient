import './Login.css'
import { useState } from "react"
import { useAuth } from "../../context/authContext"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Login = () => {
  const { logInWithEmailAndPassword, loginWithGoogle } = useAuth();

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    try {
      await logInWithEmailAndPassword(user.email, user.password)
      toast.success("User logged in successfully");
      navigate("/");
    } catch (errorE: any) {
      setError(errorE.message);
      toast.error(error);
    }  
  }

  const handleChange = ( {target: {name, value}}: any) => {
    setUser({...user, [name]: value})
  }

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
      toast.success("User logged in successfully");  
    } catch (errorE: any) {
      setError(errorE.message)
      toast.error(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
          <label htmlFor='email'>Email</label>
          <input 
            type="email" 
            name="email"
            placeholder="example@gmail.com"
            onChange={handleChange}
          />
          <label htmlFor='password'>Password</label>
          <input 
            type="password" 
            name="password"
            id="password"
            onChange={handleChange} 
          />
        <button>Login</button>
      </form>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  )
}

export default Login
