import {Outlet} from "react-router-dom";
import SplashScreen from "../Components/SplashScreen/SplashScreen.tsx";
import {Suspense, useEffect, useState} from "react";
import styles from './Root.module.css'

const Root = () => {

    const [loading,setLoading] = useState(sessionStorage.getItem('loading')??true);
    useEffect(() => {
        const timeout=setTimeout(()=>{
            setLoading(false);
            sessionStorage.setItem('loading','false');
        },5000)
        return () => {
            clearTimeout(timeout);
        }
    }, []);
    return(
        <>
            <div className={loading ? styles.enter : styles.exit}><SplashScreen/></div>
            <div className={loading ? styles.dnone : styles.enter}>
                <Suspense fallback={<h1>Loading...</h1>}>
                    <Outlet/>
                </Suspense>
            </div>
        </>
    )
}

export default Root;