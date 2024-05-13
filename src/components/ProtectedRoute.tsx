import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import NavBar from "./Nav";

export const ProtectedRoute = ( { children }: { children: React.ReactNode} ) => {
  const { user, loading } = useAuth();
  
  if(loading) return <h1>Loading...</h1>

  if(!user) return <Navigate to ="/login" />;
  
  return <>
    <NavBar />
    {children}
  </>;
}