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
import ManageBooking from "../Pages/Dashboard/Admin/ManageBooking";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Mainlayout/>,
      errorElement: <div>Error..........</div>,
      children: [
        {
            path: '/',
            element: <Home/>
        },
        {
          path: '/menu',
          element: <Menu/>
        },
        {
          path: '/login',
          element: <Login/>
        },
        {
          path:'/registration',
          element: <Registration/>
        }
      ]
    },
    {
      path: 'dashboard',
      element:<DashboardLayout />,
      children: [
        {
          path: 'admin-home',
          element: <AdminHome/>
        },
        {
          path: 'add-items',
          element: <AddItems/>
        },
        {
          path: 'manage-items',
          element: <ManageItems/>
        },
        {
          path: 'manage-booking',
          element:<ManageBooking/>
        },
        {
          path: 'manage-users',
          element: <ManageUsers/>
        }
      ]
    }
  ]);