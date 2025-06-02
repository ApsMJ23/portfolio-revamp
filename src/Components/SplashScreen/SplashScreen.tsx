import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from "@lottiefiles/react-lottie-player";
import { Button } from '@/Components/ui/button';
import { cn } from '@/lib/utils';
import ScreenAnimation from '../../assets/Animations/splashScreenAnimation.json';

interface SplashScreenProps {
  onComplete?: () => void;
  duration?: number;
}

const SplashScreen = ({ onComplete, duration = 3000 }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    const skipTimer = setTimeout(() => {
      setShowSkip(true);
    }, 1000);

    const autoComplete = setTimeout(() => {
      handleComplete();
    }, duration);

    return () => {
      clearTimeout(skipTimer);
      clearTimeout(autoComplete);
    };
  }, [duration]);

  const handleComplete = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete?.();
    }, 500);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col justify-center items-center bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background Animation */}
          <motion.div
            className="absolute inset-0 flex justify-center items-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Player
              src={ScreenAnimation}
              speed={1}
              autoplay={true}
              style={{ height: '100%', width: '100%', marginTop: '-4rem' }}
            />
          </motion.div>

          {/* Title with Typewriter Effect */}
          <motion.div
            className="relative z-10 text-center px-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.h1
              className={cn(
                "text-4xl md:text-5xl lg:text-6xl font-bold",
                "bg-gradient-to-r from-primary via-primary/80 to-primary/60",
                "bg-clip-text text-transparent"
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              Apurv Singh Creations ☕️
            </motion.h1>
            
            <motion.div
              className="mt-4 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 1.2 }}
            />
          </motion.div>

          {/* Skip Button */}
          <AnimatePresence>
            {showSkip && (
              <motion.div
                className="absolute bottom-8 right-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleComplete}
                  className="backdrop-blur-sm bg-background/50 border-primary/30"
                >
                  Skip
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading Progress */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: duration / 1000, ease: "linear" }}
            style={{ transformOrigin: "left" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SplashScreen; 