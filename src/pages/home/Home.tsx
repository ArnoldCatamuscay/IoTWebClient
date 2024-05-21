import { useAuth } from "../../context/authContext";

const Home = () => {
  const { user, loading } = useAuth();

  if(loading) return <h1>Loading...</h1>

  return (
    <>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl mt-4 font-bold text-white">
          Bienvenid@ de vuelta, <span className="text-[#2F3C7E]">{user.displayName || user?.email}</span>!
        </h1>
        {/* <p className="my-2 text-neutral-300">ThingSpeak keys down here</p> */}
        {/* <img src="/card-2.webp" alt="Coffee" className="w-fit h-fit object-cover"/> */}
        <div className=" grid grid-cols-2 place-items-center">
          <img src="/dog-home.webp" className="h-70 w-80 md:h-90 md:w-100"/>
          <img src="/cat-home.webp" className="h-40 w-50 sm:h-60 sm:w-70 sm:mt-9"/>
        </div>
      </div>
    </>
  )
}
  
export default Home
  