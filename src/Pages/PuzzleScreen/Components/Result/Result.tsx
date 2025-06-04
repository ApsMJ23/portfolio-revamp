import { motion, AnimatePresence } from "framer-motion";
import Bouncer from '../../../../assets/PNG/Bouncer.png';
import { Player } from "@lottiefiles/react-lottie-player";
import CrossAnimation from '../../../../assets/Animations/CrossAnimation.json';
import TickAnimation from '../../../../assets/Animations/TickAnimation.json';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Trophy, RotateCcw, Home, PartyPopper, X } from "lucide-react";
import confetti from 'canvas-confetti';

type ResultProps = {
    setShowResult: React.Dispatch<React.SetStateAction<boolean>>;
}

const Result = (props: ResultProps) => {
    const { setShowResult } = props;
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const [isCorrect, setIsCorrect] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    
    const [resultAttributes, setResultAttributes] = useState({
        message: '',
        animation: {},
        button1: '',
        button2: '',
    });

    // Confetti effect for correct answers
    const triggerCelebration = () => {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min: number, max: number) {
            return Math.random() * (max - min) + min;
        }

        const interval: any = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            
            confetti(Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            }));
            confetti(Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            }));
        }, 250);
    };

    useEffect(() => {
        const correct = params.get('question') === 'true';
        setIsCorrect(correct);
        
        if (correct) {
            setResultAttributes({
                message: 'The Bouncer Says, Welcome to the Club!',
                animation: TickAnimation,
                button1: 'Play Again',
                button2: 'Enter the Club'
            });
            // Trigger celebration after a delay
            const timer = setTimeout(() => {
                triggerCelebration();
                setShowConfetti(true);
            }, 500);
            return () => clearTimeout(timer);
        } else {
            setResultAttributes({
                message: 'The Bouncer Says, Stag Entry Not Allowed :(',
                animation: CrossAnimation,
                button1: 'Try Again',
                button2: 'Bribe Him'
            });
        }
    }, [params]);

    const handleReplay = () => {
        navigate('/questions');
        setShowResult(false);
    };

    const cardVariants = {
        hidden: { 
            opacity: 0, 
            scale: 0.8,
            y: 50
        },
        visible: { 
            opacity: 1, 
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { type: "spring", stiffness: 100 }
        }
    };

    const celebrationVariants = {
        hidden: { scale: 0, rotate: -180 },
        visible: { 
            scale: 1, 
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 10
            }
        }
    };

    const bouncerVariants = {
        hidden: { x: 100, opacity: 0 },
        visible: { 
            x: 0, 
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 20,
                delay: 0.3
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-accent/10 relative overflow-hidden">
            {/* Background celebration elements */}
            <AnimatePresence>
                {isCorrect && showConfetti && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 pointer-events-none"
                    >
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 bg-primary rounded-full"
                                initial={{ 
                                    x: Math.random() * window.innerWidth,
                                    y: -20,
                                    rotate: 0 
                                }}
                                animate={{ 
                                    y: window.innerHeight + 20,
                                    rotate: 360,
                                    x: Math.random() * window.innerWidth
                                }}
                                transition={{ 
                                    duration: Math.random() * 3 + 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 2
                                }}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 w-full max-w-2xl"
            >
                <Card className="backdrop-blur-lg bg-card/90 border-border/50 shadow-2xl">
                    <CardContent className="p-8">
                        {/* Success/Failure Icon */}
                        <motion.div 
                            className="flex justify-center mb-6"
                            variants={celebrationVariants}
                        >
                            {isCorrect ? (
                                <div className="relative">
                                    <Trophy className="w-16 h-16 text-yellow-500" />
                                    <motion.div
                                        className="absolute -top-2 -right-2"
                                        animate={{ 
                                            rotate: [0, 15, -15, 0],
                                            scale: [1, 1.2, 1]
                                        }}
                                        transition={{ 
                                            duration: 2,
                                            repeat: Infinity 
                                        }}
                                    >
                                        <PartyPopper className="w-6 h-6 text-primary" />
                                    </motion.div>
                                </div>
                            ) : (
                                <X className="w-16 h-16 text-red-500" />
                            )}
                        </motion.div>

                        {/* Message */}
                        <motion.h4 
                            variants={itemVariants}
                            className={`text-center text-2xl md:text-3xl font-bold mb-8 ${
                                isCorrect 
                                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent' 
                                    : 'bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent'
                            }`}
                        >
                            {resultAttributes.message}
                        </motion.h4>

                        {/* Lottie Animation */}
                        <motion.div 
                            variants={itemVariants}
                            className="flex justify-center mb-8"
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="rounded-lg overflow-hidden bg-gradient-to-br from-accent/20 to-accent/5 p-4"
                            >
                                <Player
                                    src={isCorrect ? TickAnimation : CrossAnimation}
                                    autoplay={true}
                                    loop={true}
                                    style={{ height: '200px', width: '200px' }}
                                />
                            </motion.div>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div 
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        >
                            <Button
                                onClick={handleReplay}
                                size="lg"
                                variant="default"
                                className="w-full sm:w-auto group relative overflow-hidden"
                            >
                                <motion.div
                                    className="flex items-center space-x-2"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                                    <span>{resultAttributes.button1}</span>
                                </motion.div>
                            </Button>
                            
                            <Button
                                onClick={() => navigate('/home')}
                                size="lg"
                                variant={isCorrect ? "secondary" : "destructive"}
                                className="w-full sm:w-auto group relative overflow-hidden"
                            >
                                <motion.div
                                    className="flex items-center space-x-2"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Home className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                                    <span className="whitespace-nowrap">{resultAttributes.button2}</span>
                                </motion.div>
                            </Button>
                        </motion.div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Bouncer Image */}
            <motion.img 
                src={Bouncer} 
                alt="Bouncer"
                variants={bouncerVariants}
                initial="hidden"
                animate="visible"
                className="absolute bottom-0 right-0 w-48 h-60 md:w-64 md:h-80 object-contain pointer-events-none -mr-8 md:-mr-16"
                whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                }}
            />
        </div>
    );
}

export default Result;
