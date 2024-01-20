import styles from './SplashScreen.module.css';
import {Player} from "@lottiefiles/react-lottie-player";
import ScreenAnimation from '../../assets/Animations/splashScreenAnimation.json'
import {Container, Typography} from "@mui/material";

const SplashScreen = ()=>{

    return(
        <Container
            sx={{
                padding:1,
                display:'flex',
            }}
            maxWidth={'xl'}
            className={styles.ScreenWrapper}>
            <Player
                src={ScreenAnimation}
                speed={1}
                autoplay={true}
                style={{height:'100%',width:'100%',marginTop:'-4rem'}}
            />
            <Typography
                alignItems={'center'}
                textAlign={'center'}
                fontWeight={700}
                style={{marginTop:'-4rem',padding:'0 1rem'}}
                sx={{fontSize:'2rem'}}
                variant={'h1'}>
                Apurv Singh Creations ☕️
            </Typography>
        </Container>
    )
}

export default SplashScreen;