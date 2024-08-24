import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import "./dashboard.css";
import ErrorPage from "./error-page";
import Dashboard from "./dashboard";
import Nav from "./nav";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Nav />,            // Nav should contain an <Outlet /> for nested routes
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,             // This route is loaded when the path is exactly "/"
        element: <Dashboard />,  // Dashboard component will be displayed here
      },
      // Add more routes as needed
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
