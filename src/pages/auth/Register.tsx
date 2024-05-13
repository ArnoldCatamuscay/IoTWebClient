import './Register.css'
import { useState } from "react"
import { useAuth } from "../../context/authContext"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Register = () => {
  const { signUpWithEmailAndPassword } = useAuth();

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  // const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // setError("");
    try {
      await signUpWithEmailAndPassword(user.email, user.password)
      toast.success("User created successfully");
      navigate("/");
    } catch (errorE: any) {
      // setError(errorE.message)
      toast.error(errorE.message);
    }  
  }

  const handleChange = ( {target: {name, value}}: any) => {
    setUser({...user, [name]: value})
  }

  return (
    <>
      <div className="flex items-center justify-center bg-gray-100">
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          {/* left side */}
          <div className="flex flex-col justify-center p-8 md:p-14">
            <span className="mb-3 text-4xl font-bold">Registrarse</span>
            <span className="font-light text-gray-400 mb-0">
              Por favor registra tus datos para continuar
            </span>
            <div className="py-4">
              <span className="mb-2 text-md">Correo</span>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="email"
                id="email"
                placeholder="example@gmail.com"
                onChange={handleChange}
              />
            </div>
            <div className="py-4">
              <span className="mb-2 text-md">Contraseña</span>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="********"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                onChange={handleChange}
              />
            </div>
            <button
              className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
              onClick={handleSubmit}
            >
              Registrarme
            </button>
            <div className="text-center text-gray-700">
              ¿Ya tienes una cuenta?
              <Link to="/login" className="font-bold text-black"> Inicia sesión</Link>
            </div>
          </div>
          {/* right side */}
          <div className="relative">
            <img
              src="register.jpg"
              alt="img"
              className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
            />
            {/* text on image */}
            <div
              className="absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block"
            >
              <a 
              href="https://www.pexels.com/es-es/foto/mujer-apple-iphone-telefono-inteligente-4056509/" 
              target="_blank" 
              className="text-black text-xl"
              >Foto de cottonbro studio</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
