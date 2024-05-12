import './Register.css'
import { useState } from "react"
import { useAuth } from "../../context/authContext"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Register = () => {
  const { signUpWithEmailAndPassword } = useAuth();

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
      await signUpWithEmailAndPassword(user.email, user.password)
      toast.success("User created successfully");
      navigate("/");
    } catch (errorE: any) {
      setError(errorE.message)
      toast.error(error);
    }  
  }

  const handleChange = ( {target: {name, value}}: any) => {
    setUser({...user, [name]: value})
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
        <button>Register</button>
      </form>
    </div>
  )
}

export default Register
