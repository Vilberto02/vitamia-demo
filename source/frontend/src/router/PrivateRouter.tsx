import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { type PrivateRouteProps } from "@/types/index";

export const PrivateRouter = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

  return isAuthenticated ? children : <Navigate to={"/login"}></Navigate>;
};
