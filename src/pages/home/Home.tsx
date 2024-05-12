import { toast } from "react-toastify";
import { useAuth } from "../../context/authContext";

const Home = () => {
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
      <h1>Home</h1>
      <h2>Welcome {user.displayName || user?.email}</h2>
      <button onClick={handleLogOut}>
        Logout
      </button>
    </>
  )
}
  
export default Home
  