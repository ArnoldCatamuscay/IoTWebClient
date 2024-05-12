import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export const ProtectedRoute = ( { children }: { children: React.ReactNode} ) => {
  const { user, loading } = useAuth();
  
  if(loading) return <h1>Loading...</h1>

  if(!user) return <Navigate to ="/login" />;
  
  return <>{children}</>;
}