import {Outlet} from "react-router-dom";
import SplashScreen from "../Components/SplashScreen/SplashScreen.tsx";
import {Suspense, useEffect, useState} from "react";
import styles from './Root.module.css'
import {useAutoAnimate} from "@formkit/auto-animate/react";

const Root = () => {
    const [animateParent] = useAutoAnimate()
    const [loading,setLoading] = useState(sessionStorage.getItem('loading')??true);
    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if(!localStorage.getItem('loading')) {
            timeout = setTimeout(() => {
                setLoading(false);
                sessionStorage.setItem('loading', 'false');
            }, 5000)
        }else{
            setLoading(false);
        }
        return () => {
            clearTimeout(timeout);
        }
    }, []);
    return(
        <>
            <div className={loading ? styles.enter : styles.exit}><SplashScreen/></div>
            <div ref={animateParent} className={loading ? styles.dnone : styles.enter}>
                <Suspense fallback={<h1>Loading...</h1>}>
                    <Outlet/>
                </Suspense>
            </div>
        </>
    )
}

export default Root;