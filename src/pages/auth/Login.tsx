import './Login.css'
import { useState } from "react"
import { useAuth } from "../../context/authContext"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Login = () => {
  const { logInWithEmailAndPassword, loginWithGoogle } = useAuth();

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  //const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    //setError("");
    try {
      await logInWithEmailAndPassword(user.email, user.password)
      toast.success("User logged in successfully");
      navigate("/");
    } catch (errorE: any) {
      //setError(errorE.message);
      //console.log(errorE.message);
      toast.error(errorE.message);
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
      if(errorE.message !== "Firebase: Error (auth/popup-closed-by-user).") {
        //setError(errorE.message)
        toast.error(errorE.message);
      }
    }
  }

  return (
    <>
      {/* <div className="flex items-center justify-center min-h-screen bg-gray-100"> */}
      <div className="flex items-center justify-center bg-gray-100">
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          {/* left side */}
          <div className="flex flex-col justify-center p-8 md:p-14">
            <span className="mb-3 text-4xl font-bold text-[#073B4C]">Iniciar sesión</span>
            <span className="font-light text-gray-400 mb-0">
              Por favor ingrese sus datos
            </span>
            <div className="py-4">
              <span className="mb-2 text-md text-[#073B4C]">Correo</span>
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
              <span className="mb-2 text-md text-[#073B4C]">Contraseña</span>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="********"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between w-full py-4">
              <span className="font-bold text-md text-[#073B4C]">¿Olvidó su contraseña?</span>
            </div>
            <button
              className="w-full bg-[#073B4C] text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-[#073B4C] hover:border hover:border-[#073B4C]"
              onClick={handleSubmit}
            >
              Iniciar sesión
            </button>
            <button
              className="w-full border border-[#073B4C] text-[#073B4C] text-md p-2 rounded-lg mb-6 hover:bg-[#073B4C] hover:text-white"
              onClick={handleGoogleLogin}
            >
              <img src="google.svg" alt="img" className="w-6 h-6 inline mr-2" />
              Continuar con Google
            </button>
            <div className="text-center text-gray-700">
              ¿No tienes una cuenta?
              <Link to="/register" className="font-bold text-[#073B4C]"> Regístrate</Link>
            </div>
          </div>
          {/* right side */}
          <div className="relative">
            <img
              src="login.jpg"
              alt="img"
              className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
            />
            {/* text on image */}
            <div
              className="absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block"
            >
              <a 
                href="https://www.pexels.com/es-es/foto/perro-y-gato-en-el-suelo-4214919/" 
                target="_blank" 
                className="text-[#073B4C] text-xl"
                >Foto de Marián Šicko</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
