import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../Mainlayout/Mainlayout";
import Home from "../Pages/Home";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Mainlayout/>,
      errorElement: <div>Error..........</div>,
      children: [
        {
            path: '/',
            element: <Home/>
        }
      ]
    },
  ]);