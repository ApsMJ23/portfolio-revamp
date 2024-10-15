import styles from './SplashScreen.module.css';
import { Player } from "@lottiefiles/react-lottie-player";
import ScreenAnimation from '../../assets/Animations/splashScreenAnimation.json';

const SplashScreen = () => {
    return (
        <div className={`${styles.ScreenWrapper} flex flex-col justify-center items-center p-4`}>
            <Player
                src={ScreenAnimation}
                speed={1}
                autoplay={true}
                className="w-full h-full mt-[-4rem]"
            />
            <h1
                className="text-center font-bold mt-[-4rem] px-4 text-2xl"
            >
                Apurv Singh Creations ☕️
            </h1>
        </div>
    );
}

export default SplashScreen;
