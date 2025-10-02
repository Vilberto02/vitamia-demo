import { RouterProvider } from "react-router-dom";
import routes from "./router/AppRouter";

function VitamiaApp() {
  return <RouterProvider router={routes}></RouterProvider>;
}

export default VitamiaApp;
