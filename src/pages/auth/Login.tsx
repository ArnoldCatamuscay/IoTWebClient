import { useAuth } from "../../context/authContext"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';

const Login = () => {
  const { logInWithEmailAndPassword, loginWithGoogle } = useAuth();
  const { register, handleSubmit, formState:{errors} } = useForm();
  const navigate = useNavigate();

  const onSubmit = handleSubmit( (data) => {
    const { email, password } = data;
    const promise = logInWithEmailAndPassword(email, password)
    toast.promise(promise, {
      loading: 'Cargando...',
      success: (res: any) => {
        navigate("/home");
        const username = res.user.displayName === null ? res.user.email : res.user.displayName;
        return 'Bienvenido ' + username;
      },
      error: (error: any) => {
        switch(error.code) {
          case 'auth/too-many-requests':
            return 'Demasiados intentos. Intente más tarde';
          case 'auth/invalid-credential':
            return 'Usuario o contraseña incorrectos';
          default:
            return error.message;
        }
      },
    });
  });

  const handleGoogleLogin = () => {
    const promise = loginWithGoogle();
    toast.promise(promise, {
      loading: 'Cargando...',
      success: (res: any) => {
        navigate("/home");
        const username = res.user.displayName === null ? res.user.email : res.user.displayName;
        return 'Bienvenido ' + username;
      },
      error: (res: any) => {
        if(res.message !== "Firebase: Error (auth/popup-closed-by-user).") {
          return res.message;
        }
      },
    });
  }

  return (
    <>
      {/* <div className="flex items-center justify-center min-h-screen bg-gray-100"> */}
      <div className="flex items-center justify-center">
        <div className="relative flex flex-col m-6 space-y-8 bg-[#0d2136] shadow-2xl shadow-cyan-500/50 rounded-2xl md:flex-row md:space-y-0">
          {/* left side */}
          <form onSubmit={onSubmit} className="flex flex-col justify-center p-8 md:p-14">
            <span className="mb-3 text-4xl font-bold text-white">Iniciar sesión</span>
            <span className="font-light text-gray-400 mb-0">
              Por favor ingrese sus datos
            </span>
            <div className="py-4">
              <span className="mb-2 text-md text-white">Correo</span>
              <input
                type="email"
                className="w-full p-2 bg-[#374151] border border-[#969da9] rounded-md placeholder:font-light placeholder:text-[#969da9] text-[#969da9] focus:outline-none focus:border-blue-500"
                placeholder="example@gmail.com"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Por favor ingrese su correo electrónico"
                  },
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                    message: "Correo electrónico inválido"
                  }
                })}
              />
              { errors.email && 
                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                  {String(errors.email.message)}
                </span> 
              }
            </div>
            <div className="py-4">
              <span className="mb-2 text-md text-white">Contraseña</span>
              <input
                type="password"
                className="w-full p-2 bg-[#374151] border border-[#969da9] rounded-md placeholder:font-light placeholder:text-[#969da9] text-[#969da9] focus:outline-none focus:border-blue-500"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Por favor ingrese su contraseña"
                  }
                })}
              />
              { errors.password && 
                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                  {String(errors.password.message)}
                </span> 
              }
            </div>
            <div className="flex justify-between w-full py-4">
              <span className="font-bold text-md text-[#335c8d]">¿Olvidó su contraseña?</span>
            </div>
            <button className="w-full bg-[#1a56db] text-white p-2 rounded-lg mb-6 hover:bg-[#1d4ed8] hover:border-[#073B4C]">
              Iniciar sesión
            </button>
            <button
              className="w-full border border-[#969da9] text-[#969da9] text-md p-2 rounded-lg mb-6 hover:bg-[#374151] hover:text-white"
              onClick={handleGoogleLogin}
            >
              <img src="google.svg" alt="img" className="w-6 h-6 inline mr-2" />
              Continuar con Google
            </button>
            <div className="text-center text-[#788c9f]">
              ¿No tienes una cuenta?
              <Link to="/register" className="font-bold text-[#335c8d] hover:text-[#3b82f6]"> Regístrate</Link>
            </div>
          </form>
          {/* right side */}
          <div className="relative">
            <img
              src="login.webp"
              alt="img"
              className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
            />
            {/* text on image */}
            <div
              className="absolute hidden bottom-10 right-6 p-6 bg-[#CAF0F8] bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block"
            >
              <a 
                href="https://www.pexels.com/es-es/foto/perro-y-gato-en-el-suelo-4214919/" 
                target="_blank" 
                className="text-[#031525] text-xl"
                >Foto de Marián Šicko</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
