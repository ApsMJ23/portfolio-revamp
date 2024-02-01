import {useRef, useState} from "react";
import styles from './Container.module.css'
import Header from "../../Components/Header/Header.tsx";
import {Box, Container, Paper, Typography} from "@mui/material";
import {Player} from "@lottiefiles/react-lottie-player";
import homePageBanner from '../../assets/Animations/homePageBanner.json'
import ResumeContainer from "./Components/ResumeContainer/ResumeContainer.tsx";
import ProjectContainer from "./Components/ProjectContainer/ProjectContainer.tsx";
import GitHubCalendar from "react-github-calendar";

const HomeScreen = () => {
    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({x: 0, y: 0});
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current || isFocused) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({x: e.clientX - rect.left, y: e.clientY - rect.top});
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
                <Box display={'flex'} flexDirection={'column'} width={'100%'} marginTop={20} justifyContent={'center'}
                     alignItems={'center'}>
                    <Typography sx={{fontSize: 70, fontFamily: "'Fjalla One', sans-serif"}} variant={'h1'}>Apurv
                        Singh</Typography>
                    <Typography sx={{fontSize:20}} marginTop={2} textAlign={'center'} variant={'h3'}>Frontend Engineer by day Basketball
                        Player on the weekends!!</Typography>
                </Box>
                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                    <Box sx={{width: {xs: '100%', md: '40%'}, height: {xs: '100%', md: '40%'}}}>
                        <Player
                            src={homePageBanner}
                            speed={1}
                            autoplay={true}
                            loop
                            style={{height: '100%', width: '100%'}}
                        />
                    </Box>
                </Box>
            </Container>
            <ResumeContainer/>
            <ProjectContainer/>
            <Paper elevation={4} sx={{display:'flex',marginTop:10, flexDirection:'column', paddingTop:5,justifyContent:'center', alignItems:'center' ,background:'#333',position:'relative',zIndex:'10',paddingBottom:10,paddingX:3}}>
                <Typography fontWeight={600} variant={'h3'}>Github Contributions</Typography>
                <Typography textAlign={'center'} variant={'h6'} marginBottom={5}>If you see blank, just know I code on a different account in office!! </Typography>
                {/*@todo: Change the username to apsmj23 once you're consistent with your contributions*/}
                <GitHubCalendar username="recur-apurv" colorScheme={'dark'} />
            </Paper>
        </div>
    )
}

export default HomeScreen