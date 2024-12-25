import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../Mainlayout/Mainlayout";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Mainlayout/>,
      errorElement: <div>Error..........</div>,
      children: [
        {
            path: '/',
            element: <div>Home</div>
        }
      ]
    },
  ]);