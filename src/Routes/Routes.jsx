import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../Mainlayout/Mainlayout";
import Home from "../Pages/Home";
import Menu from "../Pages/Menu";
import Login from "../Pages/Login";
import Registration from "../Pages/Registration";
import DashboardLayout from "../Mainlayout/DashboardLayout";
import AdminHome from "../Pages/Dashboard/Admin/AdminHome";
import AddItems from "../Pages/Dashboard/Admin/AddItems";
import ManageItems from "../Pages/Dashboard/Admin/ManageItems";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import CustomerHome from "../Pages/Dashboard/Customer/CustomerHome";
import CustomerOrders from "../Pages/Dashboard/Customer/CustomerOrders";
import Profile from "../Pages/Dashboard/Profile";
import CustomerCartWithStripe from "../componants/Payment/CustomerCartWithStripe";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import CustomerRoute from "./CustomerRoute";
import Contact from "../Pages/Contact";
import ManageOrders from "../Pages/Dashboard/Admin/ManageBooking";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout />,
    errorElement: <div>Error..........</div>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/menu/:category", 
        element: <Menu />, 
      },
      {
        path: "/contacts",
        element: <Contact />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      // Admin Routes
      {
        path: "admin-home",
        element: <PrivateRoute><AdminRoute><AdminHome /></AdminRoute></PrivateRoute>,
      },
      {
        path: "add-items",
        element: <PrivateRoute><AdminRoute><AddItems /></AdminRoute></PrivateRoute>,
      },
      {
        path: "manage-items",
        element: <PrivateRoute><AdminRoute><ManageItems /></AdminRoute></PrivateRoute>
      },
      {
        path: "manage-booking",
        element: <PrivateRoute><AdminRoute><ManageOrders /></AdminRoute></PrivateRoute>
      },
      {
        path: "manage-users",
        element: <PrivateRoute><AdminRoute><ManageUsers /></AdminRoute></PrivateRoute>
      },

      // Customer Routes
      {
        path: "customer-home",
        element: <PrivateRoute><CustomerRoute><CustomerHome /></CustomerRoute></PrivateRoute>,
      },
      {
        path: "customer-orders",
        element: <PrivateRoute><CustomerRoute><CustomerOrders /></CustomerRoute></PrivateRoute>,
      },
      {
        path: "customer-cart",
        element: <PrivateRoute><CustomerRoute><CustomerCartWithStripe /></CustomerRoute></PrivateRoute>,
      },
      {
        path: "profile",
        element: <PrivateRoute><Profile /></PrivateRoute>,
      },
    ],
  },
]);