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
        {/* <p className="mt-2 text-gray-600">Ready to start your journey?</p> */}
      </div>
    </>
  )
}
  
export default Home
  