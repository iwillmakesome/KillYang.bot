import { RouterProvider, createBrowserRouter } from "react-router-dom";

import MainPage from "@/pages/mainPage";
import Notfound from "@/pages/notfound";
import Layout from "./components/layout/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ path: "/", element: <MainPage /> }],
  },
  {
    path: "*",
    element: <Notfound />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
