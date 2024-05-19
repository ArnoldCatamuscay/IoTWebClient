import { Link } from "react-router-dom"

const NotFound = () => {

  return (
    <>
      <section className="bg-[#031525] mt-2">
        <div className="md:flex md:flex-row flex-col items-center justify-center">
          <div className="text-center">  
            <h1 className="text-7xl font-extrabold lg:text-9xl text-[#3b82f6] dark:text-primary-500">404</h1>
            <p className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white mx-2 md:mx-0">¡Ups! Esa página no existe.</p>
            <Link to="/" className="inline-flex text-white bg-[#1a56db] hover:bg-[#1d4ed8] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">
              Regresar al inicio
            </Link>
          </div>   
          <div className="flex justify-center md:justify-start">
            <img src="/404-computer.svg"/>
          </div>
        </div>
      </section>
    </>
  )
}
  
export default NotFound
  