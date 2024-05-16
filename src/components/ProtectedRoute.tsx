import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import NavBar from "./Nav";
import { useMqttStore } from "../store/mqtt-store";

export const ProtectedRoute = ( { children }: { children: React.ReactNode} ) => {
  const { user, loading } = useAuth();
  const updateClientPaho = useMqttStore(state => state.updateClientPaho);
  
  if(loading) return <h1>Loading...</h1>

  if(!user) return <Navigate to ="/login" />; 

  updateClientPaho();

  return <>
    <NavBar />
    {children}
  </>;
}