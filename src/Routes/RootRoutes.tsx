import {createBrowserRouter, Navigate} from "react-router-dom";
import Root from "./Root.tsx";
import PuzzleScreen from "../Pages/PuzzleScreen/PuzzleScreen.tsx";
import HomeScreen from "../Pages/HomeScreen/HomeScreen.tsx";

export const router = createBrowserRouter([
    {
        path:'/',
        element:<Root/>,
        children:[
            {index: true, element: <Navigate to={"/questions"} replace={true}/> },
            {
                path:'/questions',
                element:<PuzzleScreen/>
            },
            {
                path:'/home',
                element:<HomeScreen/>
            }
        ]

    }
])