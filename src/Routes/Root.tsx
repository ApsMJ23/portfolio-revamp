import {Outlet} from "react-router-dom";
import Header from "../Components/Header/Header.tsx";


const Root = () => {
    return(
        <>
            <Header/>
            <Outlet/>
        </>
    )
}

export default Root;