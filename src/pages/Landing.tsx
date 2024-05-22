
const Landing = () => {

  return (
    <>
    {/* <!-- Hero section --> */}
    <section className="bg-gradient-to-r from-[#0061ff] to-[#5257e5] py-20">
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-1/2 mb-8 md:mb-0">
                    <h1 className="text-white font-bold font-mono text-4xl leading-tight mb-6">Comedog: alimentación inteligente para tu mascota</h1>
                    <p className="text-slate-100 text-xl mb-8 font-mono">
                    Dispensa comida a distancia y monitorea en tiempo real la cantidad en su plato. Asegura la porción perfecta siempre, desde cualquier lugar.
                    </p>
                    {/* <a href="#"
                        className="px-6 py-3 bg-white text-blue-600 font-bold rounded-full hover:bg-blue-700 transition duration-200">Shop
                        now</a> */}
                </div>
                <div className="md:w-1/2">
                    <img src="/landing-1.png" alt="Coffee beans"
                        className="w-full"/>
                </div>
            </div>
        </div>
    </section>

    {/* <!-- Featured section --> */}
    <section className="py-20">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-slate-400 mb-8">Featured products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gradient-to-t from-[#919bff] to-[#133a94] rounded-lg shadow-md overflow-hidden">
                    <img src="/card-1.webp" alt="Coffee"
                        className="w-fit h-fit object-cover"/>
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Single Origin Blend</h3>
                        <p className="text-gray-700 text-base">Our most popular blend, featuring beans from a single farm in
                            Ethiopia. Notes of chocolate, berries, and citrus.</p>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-gray-700 font-medium">$14.99</span>
                            <button
                                className="px-4 py-2 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition duration-200">Add
                                to cart</button>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-t from-[#919bff] to-[#133a94] rounded-lg shadow-md overflow-hidden">
                    <img src="/card-3.png" alt="Coffee"
                        className="w-fit h-fit object-cover"/>
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Dark Roast Blend</h3>
                        <p className="text-gray-700 text-base">A bold and flavorful blend of beans from Brazil, Colombia, and
                            Indonesia. Notes of caramel, nuts, and tobacco.</p>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-gray-700 font-medium">$12.99</span>
                            <button
                                className="px-4 py-2 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition duration-200">Add
                                to cart</button>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-t from-[#919bff] to-[#133a94] rounded-lg shadow-md overflow-hidden">
                    <img src="/landing-2.png" alt="Coffee"
                        className="w-fit h-fit object-cover"/>
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Dark Roast Blend</h3>
                        <p className="text-gray-700 text-base">A bold and flavorful blend of beans from Brazil, Colombia, and
                            Indonesia. Notes of caramel, nuts, and tobacco.</p>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-gray-700 font-medium">$12.99</span>
                            <button
                                className="px-4 py-2 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition duration-200">Add
                                to cart</button>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-t from-[#919bff] to-[#133a94] rounded-lg shadow-md overflow-hidden">
                    <img src="/cat-eating.webp" alt="Coffee"
                        className="w-fit h-fit object-cover"/>
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Dark Roast Blend</h3>
                        <p className="text-gray-700 text-base">A bold and flavorful blend of beans from Brazil, Colombia, and
                            Indonesia. Notes of caramel, nuts, and tobacco.</p>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-gray-700 font-medium">$12.99</span>
                            <button
                                className="px-4 py-2 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition duration-200">Add
                                to cart</button>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-t from-[#919bff] to-[#133a94] rounded-lg shadow-md overflow-hidden">
                    <img src="/card-4.png" alt="Coffee"
                        className="w-fit h-fit object-cover"/>
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Dark Roast Blend</h3>
                        <p className="text-gray-700 text-base">A bold and flavorful blend of beans from Brazil, Colombia, and
                            Indonesia. Notes of caramel, nuts, and tobacco.</p>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-gray-700 font-medium">$12.99</span>
                            <button
                                className="px-4 py-2 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition duration-200">Add
                                to cart</button>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-t from-[#919bff] to-[#133a94] rounded-lg shadow-md overflow-hidden">
                    <img src="/card-5.png" alt="Coffee"
                        className="w-fit h-fit object-cover"/>
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Dark Roast Blend</h3>
                        <p className="text-gray-700 text-base">A bold and flavorful blend of beans from Brazil, Colombia, and
                            Indonesia. Notes of caramel, nuts, and tobacco.</p>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-gray-700 font-medium">$12.99</span>
                            <button
                                className="px-4 py-2 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition duration-200">Add
                                to cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}
  
export default Landing
  