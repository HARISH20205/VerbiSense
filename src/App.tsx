import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";

export default function App() {
  const router = createBrowserRouter([
    //TODO(Darani):Update the paths accordingly to the ui and the needs.
    {
      path: "/",
      element: <Layout />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
