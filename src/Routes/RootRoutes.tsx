import {createBrowserRouter, Navigate} from "react-router-dom";
import Root from "./Root.tsx";

export const router = createBrowserRouter([
    {
        path:'/',
        element:<Root/>,
        children:[
            {index: true, element: <Navigate to={"/questions"} replace={true}/> },
            {
                path:'/questions',
                element:<h1>Questions</h1>
            },
            {
                path:'/about',
                element:<h1>About</h1>
            }
        ]

    }
])