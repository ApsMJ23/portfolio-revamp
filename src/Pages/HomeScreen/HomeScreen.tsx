import {useRef, useState} from "react";
import styles from './Container.module.css'
import Header from "../../Components/Header/Header.tsx";
import {Box, Container, Typography} from "@mui/material";

const HomeScreen = () => {
    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current || isFocused) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setIsFocused(true);
        setOpacity(1);
    };

    const handleBlur = () => {
        setIsFocused(false);
        setOpacity(0);
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };
    return (
        <div
            ref={divRef}
            className={styles.Container}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Header/>
            <div
                className={styles.spotLight}
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(85, 28, 218, 0.15), transparent 80%)`,
                }}
            />
            <Container maxWidth={'xl'}>
                <Box display={'flex'} flexDirection={'column'} width={'100%'} marginTop={20} justifyContent={'center'} alignItems={'center'}>
                    <Typography sx={{fontSize:70,fontFamily:"'Fjalla One', sans-serif"}} variant={'h1'}>Apurv Singh</Typography>
                    <Typography marginTop={2} textAlign={'center'} variant={'h3'}>Frontend Engineer by day Basketball Player on the weekends!!</Typography>
                </Box>
            </Container>
        </div>
    )
}

export default HomeScreen