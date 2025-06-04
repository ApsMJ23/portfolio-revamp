import { useRef, useState } from "react";
import Header from "../../Components/Header/Header.tsx";
import { Player } from "@lottiefiles/react-lottie-player";
import homePageBanner from '../../assets/Animations/homePageBanner.json';
import ResumeContainer from "./Components/ResumeContainer/ResumeContainer.tsx";
import ProjectContainer from "./Components/ProjectContainer/ProjectContainer.tsx";
import GitHubContributions from "./Components/GitHubContributions/GitHubContributions.tsx";
import Footer from "./Components/Footer/Footer.tsx";
import { ScrollProgress } from "@/Components/ui/scroll-progress";
import { FloatingElements, GradientBackground } from "@/Components/ui/parallax-background";
import {Card} from "@/Components/ui/card.tsx";

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
        <>
            {/* Scroll Progress Indicators */}
            <ScrollProgress variant="line" position="top" />
            <ScrollProgress variant="circle" showPercentage showScrollToTop />
            
            <div
                ref={divRef}
                className="overflow-x-hidden min-h-screen py-20 relative"
                onMouseMove={handleMouseMove}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Animated Background Elements */}
                <GradientBackground />
                <FloatingElements />
                <Header />
                <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
                    style={{
                        opacity,
                        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(85, 28, 218, 0.15), transparent 80%)`,
                    }}
                />
                <div className="max-w-7xl mx-auto pt-20">
                    <div className="flex flex-col w-full mt-20 justify-center items-center">
                        <h1 className="text-6xl font-extrabold font-sans">Apurv Singh</h1>
                        <h4 className="text-xl mt-2 text-center">Frontend Engineer by day Basketball Player on the weekends!!</h4>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <div className="w-full md:w-2/5 h-full md:h-2/5">
                            <Player
                                src={homePageBanner}
                                speed={1}
                                autoplay={true}
                                loop
                                style={{ height: '100%', width: '100%' }}
                            />
                        </div>
                    </div>
                </div>
                <ResumeContainer />
                <ProjectContainer />
                <GitHubContributions />
            </div>
            <Footer />
        </>
    );
};

export default HomeScreen;
