import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { type PrivateRouteProps } from "@/types/index";

export const PrivateRouter = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to={"/"}></Navigate>;
};
