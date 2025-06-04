import { Outlet, useLocation } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SplashScreen from "../Components/SplashScreen/SplashScreen";

const Root = () => {
    const [loading, setLoading] = useState(sessionStorage.getItem('loading') !== 'false');
    const location = useLocation();

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (!sessionStorage.getItem('loading')) {
            timeout = setTimeout(() => {
                setLoading(false);
                sessionStorage.setItem('loading', 'false');
            }, 5000);
        } else {
            setLoading(false);
        }
        return () => {
            clearTimeout(timeout);
        }
    }, []);

    const pageVariants = {
        initial: {
            opacity: 0,
            scale: 0.95,
            y: 20
        },
        in: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                duration: 0.6
            }
        },
        out: {
            opacity: 0,
            scale: 1.05,
            y: -20,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                duration: 0.4
            }
        }
    };

    const slideVariants = {
        initial: (direction: number) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0
        }),
        in: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                duration: 0.6
            }
        },
        out: (direction: number) => ({
            x: direction < 0 ? 100 : -100,
            opacity: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                duration: 0.4
            }
        })
    };

    // Determine transition direction based on route
    const getTransitionDirection = () => {
        if (location.pathname === '/home') return -1;
        if (location.pathname === '/questions') return 1;
        return 0;
    };

    const LoadingFallback = () => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/10"
        >
            <motion.div 
                className="text-center space-y-4"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <motion.div
                    className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <motion.h2 
                    className="text-xl font-semibold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    Loading Experience...
                </motion.h2>
            </motion.div>
        </motion.div>
    );

    return (
        <>
            {/* Splash Screen */}
            <AnimatePresence mode="wait">
                {loading && (
                    <motion.div
                        key="splash"
                        initial={{ opacity: 1 }}
                        exit={{ 
                            opacity: 0,
                            scale: 0.95,
                            transition: { duration: 0.5 }
                        }}
                        className="fixed inset-0 z-50"
                    >
                        <SplashScreen />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Application */}
            <AnimatePresence mode="wait">
                {!loading && (
                    <motion.div
                        key="app"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ 
                            opacity: 1, 
                            scale: 1,
                            transition: { delay: 0.2, duration: 0.5 }
                        }}
                        className="min-h-screen"
                    >
                        <Suspense fallback={<LoadingFallback />}>
                            <AnimatePresence mode="wait" custom={getTransitionDirection()}>
                                <motion.div
                                    key={location.pathname}
                                    custom={getTransitionDirection()}
                                    initial="initial"
                                    animate="in"
                                    exit="out"
                                    variants={location.pathname === '/home' ? pageVariants : slideVariants}
                                    className="min-h-screen"
                                >
                                    <Outlet />
                                </motion.div>
                            </AnimatePresence>
                        </Suspense>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Root;