import { createBrowserRouter } from "react-router-dom";
import { DashboardPage } from "../pages/DashboardPage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { NotFoundPage } from "../pages/NotFoundPage";

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/register",
    element: <RegisterPage></RegisterPage>,
  },
  {
    path: "/", // DASHBOARD
    element: <DashboardPage></DashboardPage>,
  },
  {
    path: "*",
    element: <NotFoundPage></NotFoundPage>,
  },
]);

export default routes;
