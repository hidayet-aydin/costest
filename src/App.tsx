import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/home/Home";

import RootLayout from "./layouts/root/RootLayout";

const router = createBrowserRouter([
  {
    id: "home",
    path: "/",
    element: <RootLayout />,
    children: [{ index: true, element: <HomePage /> }],
  },
]);

function Home() {
  return <RouterProvider router={router} />;
}

export default Home;
