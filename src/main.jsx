import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Routes';
import { AppProvider } from './AppContext/AppContext';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
    <RouterProvider router={router} />
    <Toaster position="top-right" reverseOrder={false} />
    </AppProvider>
  </StrictMode>,
)
