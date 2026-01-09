import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import LogsPage from "./pages/logs/LogsPage";

import RootLayout from "./layouts/root/RootLayout";

const router = createBrowserRouter([
  {
    id: "home",
    path: "/",
    element: <RootLayout />,
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
