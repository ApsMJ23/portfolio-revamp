import {createBrowserRouter} from "react-router-dom";
import Root from "./Root.tsx";
import App from "../App.tsx";

export const router = createBrowserRouter([
    {
        path:'/',
        element:<Root/>,
        children:[
            {
                path:'/',
                element:<App/>
            },
            {
                path:'/about',
                element:<h1>About</h1>
            }
        ]

    }
])