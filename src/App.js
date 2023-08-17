import "./App.scss";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import SignUp from "./pages/SignUp/SignUp";
import Trips from "./pages/Trips/Trips";
import SingleTrip from "./pages/SingleTrip/SingleTrip";
import Login from "./pages/LogIn/LogIn";

function App() {
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
        </QueryClientProvider>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/trips",
          element: <Trips />,
        },
        {
          path: "/trip/:id",
          element: <SingleTrip />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
