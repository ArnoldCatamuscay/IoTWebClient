import { useAuth } from "../../context/authContext";

const Home = () => {
  const { user, loading } = useAuth();

  if(loading) return <h1>Loading...</h1>

  return (
    <>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold text-white">
          Welcome, <span className="text-[#2F3C7E]">{user.displayName || user?.email}</span>!
        </h1>
        {/* <p className="my-2 text-neutral-300">ThingSpeak keys down here</p> */}
        {/* <button onClick={addKeys} className="px-4 py-2 mt-4 text-white bg-[#2F3C7E] rounded-lg">Add keys</button> */}
      </div>
    </>
  )
}
  
export default Home
  