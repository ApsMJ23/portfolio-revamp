import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import {router} from "./Routes/RootRoutes.tsx";
import {createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme({
    palette:{
        primary:{
            main:'#6e5494',
        },
        secondary:{
            main:'#4078c0',
        },
        background:{
            default:'#333',
            paper:'#f5f5f5',
        },
        text:{
            primary:'#fafafa',
            secondary:'#000',
        },
        action:{
            active:'#4078c0',
            hover:'#2d5487',
            selected:'#2d5487',
            disabled:'#c3c3c3',
        },
        divider:'#333',
        error:{
            main:'#c9510c',
        },
        warning:{
            main:'#f5a623',
        },
        success:{
            main:'#6cc644',
        },
    },
    typography:{
        fontFamily:"'Dosis', sans-serif",
        h1:{
            fontSize:'2.5rem',
            fontWeight:400,
        },
        h2:{
            fontSize:'2rem',
            fontWeight:400,
        },
        h3:{
            fontSize:'1.75rem',
            fontWeight:400,
        },
        h4:{
            fontSize:'1.5rem',
            fontWeight:400,
        },
        h5:{
            fontSize:'1.25rem',
            fontWeight:400,
        },
        h6:{
            fontSize:'1rem',
            fontWeight:400,
        },
        subtitle1:{
            fontSize:'1rem',
            fontWeight:400,
        },
        subtitle2:{
            fontSize:'0.875rem',
            fontWeight:400,
        },
        body1:{
            fontSize:'1rem',
            fontWeight:400,
        },
        body2:{
            fontSize:'0.875rem',
            fontWeight:400,
        },
        button:{
            fontSize:'1rem',
            fontWeight:400,
        },
        caption:{
            fontSize:'0.75rem',
            fontWeight:400,
        },
        overline:{
            fontSize:'0.75rem',
            fontWeight:400,
        },
    }
})
console.log('Testing')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
         <RouterProvider router={router}/>
      </ThemeProvider>
  </React.StrictMode>,
)
