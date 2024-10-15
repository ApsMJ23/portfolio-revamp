import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import {router} from "./Routes/RootRoutes.tsx";
import {ThemeProvider} from "@/Components/theme-provider.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
         <RouterProvider router={router}/>
      </ThemeProvider>
  </React.StrictMode>,
)
