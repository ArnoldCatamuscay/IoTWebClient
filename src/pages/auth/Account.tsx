import { toast } from "react-toastify";
import { useAuth } from "../../context/authContext";

const Account = () => {
  const { user, logOut, loading } = useAuth();

  const handleLogOut = async () => {
    try {
      await logOut();
      toast.info("See ya!");  
    } catch (error: any) {
      toast.error(error.message); 
    }
  }

  if(loading) return <h1>Loading...</h1>

  return (
    <>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Hi, <span className="text-purple-500">{user.displayName || user?.email}</span>!
        </h1>
        {/* <p className="mt-2 text-gray-600">Ready to start your journey?</p> */}
        <button onClick={handleLogOut} 
          className="mt-4 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" 
        >
          Logout
        </button>
      </div>
    </>
  )
}
  
export default Account
  