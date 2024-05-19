import { useAuth } from "../../context/authContext"
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner';

const Register = () => {
  const { signUpWithEmailAndPassword } = useAuth();
  const { register, handleSubmit, formState:{errors}, watch } = useForm();
  const navigate = useNavigate();

  const onSubmit = handleSubmit( (data) => {
    const { email, password } = data;
    const promise = signUpWithEmailAndPassword(email, password)
    toast.promise(promise, {
      loading: 'Cargando...',
      success: (res: any) => {
        navigate("/");
        const username = res.user.displayName === null ? res.user.email : res.user.displayName;
        return 'Bienvenido ' + username;
      },
      error: (error: any) => {
        switch(error.code) {
          case 'auth/email-already-in-use':
            return 'El correo electrónico ya está en uso';
          case 'auth/weak-password':
            return 'La contraseña es muy débil';
          default:
            return error.message;
        }
      },
    });
  });

  return (
    <>
      <div className="flex items-center justify-center bg-[#031525]">
        <div className="relative flex flex-col m-6 space-y-8 bg-[#0d2136] shadow-2xl shadow-cyan-500/50 rounded-2xl md:flex-row md:space-y-0">
          {/* left side */}
          <form onSubmit={onSubmit} className="flex flex-col justify-center p-8 md:p-14">
            
            <span className="mb-3 text-4xl font-bold text-white">Registrarse</span>
            <span className="font-light text-gray-400 mb-0">
              Por favor registra tus datos para continuar
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
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, ///^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
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
                // TODO form validation
                {...register("password", {
                  required: {
                    value: true,
                    message: "Por favor ingrese su contraseña"
                  },
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener al menos 6 caracteres"
                  }
                })}
              />
              { errors.password && 
                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                  {String(errors.password.message)}
                </span> 
              }
            </div>
            <div className="py-4">
              <span className="mb-2 text-md text-white">Confirmar contraseña</span>
              <input
                type="password"
                className="w-full p-2 bg-[#374151] border border-[#969da9] rounded-md placeholder:font-light placeholder:text-[#969da9] text-[#969da9] focus:outline-none focus:border-blue-500"
                // TODO form validation
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "Por favor confirme su contraseña"
                  },
                  validate: (value) => value === watch('password') || "Las contraseñas no coinciden" 
                })}
              />
              { errors.confirmPassword && 
                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                  {String(errors.confirmPassword.message)}
                </span> 
              }
            </div>
            <button className="w-full bg-[#1a56db] text-white p-2 rounded-lg mb-6 hover:bg-[#1d4ed8]  hover:border-[#073B4C] ">
              Registrarme
            </button>
            <div className="text-center text-[#788c9f]">
              ¿Ya tienes una cuenta?
              <Link to="/login" className="font-bold text-[#335c8d] hover:text-[#3b82f6]"> Inicia sesión</Link>
            </div>
            
          </form>
          {/* right side */}
          <div className="relative">
            <img
              src="register.jpg"
              alt="img"
              className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
            />
            {/* text on image */}
            <div
              className="absolute hidden bottom-10 right-6 p-6 bg-[#CAF0F8] bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block"
            >
              <a 
              href="https://www.pexels.com/es-es/foto/mujer-apple-iphone-telefono-inteligente-4056509/" 
              target="_blank" 
              className="text-[#031525] text-xl"
              >Foto de cottonbro studio</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
