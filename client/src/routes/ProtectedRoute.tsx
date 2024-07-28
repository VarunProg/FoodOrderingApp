import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const [isAuthResolved, setAuthResolved] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setAuthResolved(true);
    }
  }, [isAuthenticated, isLoading]);

  if (!isAuthResolved) {
    return <div>Loading...</div>;
  }

  let auth = { token: isAuthenticated };
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
};