import { createBrowserRouter } from "react-router-dom";
import { DashboardPage } from "../pages/DashboardPage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { LandingPage } from "@/pages/LandingPage";
import { PrivateRouter } from "./PrivateRouter";

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
    element: (
      <PrivateRouter>
        <DashboardPage></DashboardPage>
      </PrivateRouter>
    ),
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
