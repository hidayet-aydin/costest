import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./layouts/root/RootLayout";
import ErrorPage from "./pages/error/ErrorPage";
import HomePage from "./pages/home/HomePage";
import LogsPage from "./pages/logs/LogsPage";

const router = createBrowserRouter([
  {
    id: "home",
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "logs", element: <LogsPage /> },
    ],
  },
]);

function Home() {
  return <RouterProvider router={router} />;
}

export default Home;
