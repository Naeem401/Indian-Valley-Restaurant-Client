import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../Mainlayout/Mainlayout";
import Home from "../Pages/Home";
import Menu from "../Pages/Menu";
import Login from "../Pages/Login";
import Registration from "../Pages/Registration";


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
  ]);