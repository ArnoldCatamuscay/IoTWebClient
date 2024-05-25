
const Landing = () => {

  return (
    <>
      {/* <!-- Hero section --> */}
      <section className="bg-gradient-to-r from-[#0061ff] to-[#5257e5] py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-white font-bold text-4xl leading-tight mb-6">Comedog: alimentación inteligente para tu mascota</h1>
              <p className="text-slate-100 text-xl mb-8">
              Dispensa comida a distancia y monitorea en tiempo real la cantidad en su plato. Asegura la porción perfecta siempre, desde cualquier lugar.
              </p>
              {/* <a href="#"
                  className="px-6 py-3 bg-white text-blue-600 font-bold rounded-full hover:bg-blue-700 transition duration-200">Shop
                  now</a> */}
            </div>
            <div className="md:w-1/2">
              <img src="/landing-1.png" alt="Coffee beans" className="w-full"/>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Featured section --> */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-400 mb-8">Nuestros servicios:</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
            <div className="bg-gradient-to-tr from-[#020024] to-[#0d2136] rounded-lg shadow-md overflow-hidden">
                <img src="/hoarios.png" alt="Coffee" className="w-fit h-fit object-cover"/>
                <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">Programación Automática de Horarios</h3>
                    <p className="text-slate-300 text-base">Programa los horarios de alimentación de tu mascota y asegúrate de que nunca se salte una comida. Configuración fácil y rápida.</p>
                    {/* <div className="mt-4 flex items-center justify-between">
                        <span className="text-slate-300 font-medium">$14.99</span>
                        <button
                            className="px-4 py-2 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition duration-200">Configura el tuyo</button>
                    </div> */}
                </div>
            </div>

            <div className="bg-gradient-to-tr from-[#020024] to-[#0d2136] rounded-lg shadow-md overflow-hidden">
                <img src="/monitoring.png" alt="Coffee" className="w-fit h-fit object-cover"/>
                <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">Seguimiento del Consumo de Alimentos</h3>
                    <p className="text-slate-300 text-base">Monitorea la cantidad de alimento que tu mascota consume a diario. Ideal para mantener una dieta balanceada.</p>
                </div>
            </div>

            <div className="flex flex-col items-center bg-gradient-to-tr from-[#020024] to-[#0d2136] rounded-lg shadow-md overflow-hidden">
                <img src="/feeding.png" alt="Coffee" className="w-fit h-fit object-cover"/>
                
                <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">Mantén a tu Mascota Alimentada, Incluso cuando no Estás</h3>
                    <p className="text-slate-300 text-base">Ideal para dueños ocupados. Alimenta a tu mascota a distancia con nuestro innovador dispensador.</p>
                </div>
            </div>

            <div className="flex flex-col items-center bg-gradient-to-tr from-[#020024] to-[#0d2136] rounded-lg shadow-md overflow-hidden">
                <img src="/sales-cat.png" alt="Coffee" className="w-fit h-fit object-cover"/>
                <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">Ofertas Especiales de Lanzamiento</h3>
                    <p className="text-slate-300 text-base">Aprovecha nuestras ofertas especiales de lanzamiento y ahorra en la compra de nuestro dispensador de alimentos para mascotas. ¡Descuentos hasta el 30%!</p>
                </div>
            </div>

            <div className="bg-gradient-to-tr from-[#020024] to-[#0d2136] rounded-lg shadow-md overflow-hidden">
                <img src="/card-4.png" alt="Coffee" className="w-fit h-fit object-cover px-4 pt-4"/>
                <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">¡Truco o Trato para tu Mascota!</h3>
                    <p className="text-slate-300 text-base">Prepara a tu mascota para la noche más espeluznante con nuestro pack de supervivencia. Incluye un dispensador automático y golosinas temáticas. ¡Ahorra un 30%!</p>
                </div>
            </div>

            <div className="bg-gradient-to-tr from-[#020024] to-[#0d2136]  rounded-lg shadow-md overflow-hidden">
                <img src="/card-5.png" alt="Coffee" className="w-fit h-fit object-cover px-4 pt-2 sm:mb-6"/>
                <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">Edición Limitada de Halloween</h3>
                    <p className="text-slate-300 text-base">Consigue nuestra edición limitada del dispensador de alimentos temático de Halloween. ¡Compra ahora antes de que se agoten las existencias!</p>
                </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
  
export default Landing
  