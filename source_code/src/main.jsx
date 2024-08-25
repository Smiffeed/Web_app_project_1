import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import "./dashboard.css";
import "./highlighted-cars.css"
import ErrorPage from "./error-page";
import Dashboard from "./dashboard";
import HighlightedCar from "./highlighted-cars";
import Nav from "./nav";
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path: "/car-market-analysis",
    element: <Nav />,            // Nav should contain an <Outlet /> for nested routes
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,             // This route is loaded when the path is exactly "/"
        element: <Dashboard />,  // Dashboard component will be displayed here
      },
      {
        path: "highlighted-cars",
        element: <HighlightedCar />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
