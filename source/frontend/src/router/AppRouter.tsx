import { createBrowserRouter } from "react-router-dom";
import { DashboardPage } from "../pages/DashboardPage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { LandingPage } from "@/pages/LandingPage";

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
    path: "/home", // DASHBOARD
    element: <DashboardPage></DashboardPage>,
  },
  {
    path: "/",
    element: <LandingPage></LandingPage>,
  },
  {
    path: "*",
    element: <NotFoundPage></NotFoundPage>,
  },
]);

export default routes;
