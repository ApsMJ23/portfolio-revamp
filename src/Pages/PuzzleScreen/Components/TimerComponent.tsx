import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, AlertTriangle, Clock } from "lucide-react";
import { Card, CardContent } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";

interface TimerComponentProps {
    duration: number; // Duration in seconds
    onTimeUp: () => void;
    isActive: boolean;
    onReset?: () => void;
}

const TimerComponent = ({ duration, onTimeUp, isActive, onReset }: TimerComponentProps) => {
    const [timeLeft, setTimeLeft] = useState(duration);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (isActive && !isRunning) {
            setIsRunning(true);
            setTimeLeft(duration);
        }
    }, [isActive, duration, isRunning]);

    useEffect(() => {
        if (onReset) {
            setTimeLeft(duration);
            setIsRunning(false);
        }
    }, [onReset, duration]);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        setIsRunning(false);
                        onTimeUp();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isRunning, timeLeft, onTimeUp]);

    const progress = (timeLeft / duration) * 100;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    // Color schemes based on remaining time
    const getTimerState = () => {
        if (progress > 60) return 'safe';
        if (progress > 30) return 'warning';
        return 'danger';
    };

    const timerState = getTimerState();

    const timerColors = {
        safe: {
            progress: 'from-green-500 to-emerald-500',
            text: 'text-green-600',
            bg: 'bg-green-500/10',
            border: 'border-green-500/20'
        },
        warning: {
            progress: 'from-yellow-500 to-orange-500',
            text: 'text-yellow-600',
            bg: 'bg-yellow-500/10',
            border: 'border-yellow-500/20'
        },
        danger: {
            progress: 'from-red-500 to-pink-500',
            text: 'text-red-600',
            bg: 'bg-red-500/10',
            border: 'border-red-500/20'
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.9, y: -20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15
            }
        }
    };

    const urgentPulse = {
        scale: [1, 1.05, 1],
        transition: {
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-sm"
        >
            <Card className={`backdrop-blur-sm bg-card/90 border-border/50 ${timerColors[timerState].border} transition-all duration-300`}>
                <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                            <motion.div
                                animate={timerState === 'danger' ? urgentPulse : {}}
                            >
                                {timerState === 'danger' ? (
                                    <AlertTriangle className={`w-5 h-5 ${timerColors[timerState].text}`} />
                                ) : (
                                    <Timer className={`w-5 h-5 ${timerColors[timerState].text}`} />
                                )}
                            </motion.div>
                            <span className="font-semibold text-sm">Challenge Timer</span>
                        </div>
                        
                        <Badge 
                            variant="secondary" 
                            className={`${timerColors[timerState].bg} ${timerColors[timerState].text} border-0`}
                        >
                            {isRunning ? 'Active' : 'Paused'}
                        </Badge>
                    </div>

                    {/* Circular Progress */}
                    <div className="relative flex items-center justify-center mb-4">
                        <motion.div 
                            className="relative w-24 h-24"
                            animate={timerState === 'danger' ? urgentPulse : {}}
                        >
                            {/* Background circle */}
                            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    fill="transparent"
                                    className="text-muted-foreground/20"
                                />
                                
                                {/* Progress circle */}
                                <motion.circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    stroke="url(#progressGradient)"
                                    strokeWidth="8"
                                    fill="transparent"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 1 }}
                                    animate={{ pathLength: progress / 100 }}
                                    transition={{ 
                                        duration: 0.5,
                                        ease: "easeInOut"
                                    }}
                                    style={{
                                        pathLength: progress / 100,
                                        strokeDasharray: "251.2 251.2"
                                    }}
                                />
                                
                                {/* Gradient definition */}
                                <defs>
                                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" className={timerColors[timerState].progress.split(' ')[0]?.replace('from-', 'stop-')} />
                                        <stop offset="100%" className={timerColors[timerState].progress.split(' ')[2]?.replace('to-', 'stop-')} />
                                    </linearGradient>
                                </defs>
                            </svg>

                            {/* Timer display */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div 
                                    className="text-center"
                                    animate={timerState === 'danger' ? { scale: [1, 1.1, 1] } : {}}
                                    transition={{ duration: 0.3, repeat: timerState === 'danger' ? Infinity : 0 }}
                                >
                                    <div className={`text-lg font-bold ${timerColors[timerState].text}`}>
                                        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        {Math.round(progress)}%
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Linear Progress Bar */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                            <span>Progress</span>
                            <span>{timeLeft}s remaining</span>
                        </div>
                        
                        <div className="w-full bg-muted-foreground/20 rounded-full h-2 overflow-hidden">
                            <motion.div
                                className={`h-full bg-gradient-to-r ${timerColors[timerState].progress} rounded-full`}
                                initial={{ width: "100%" }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            />
                        </div>
                    </div>

                    {/* Time warnings */}
                    <AnimatePresence>
                        {timerState === 'warning' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mt-3 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg"
                            >
                                <div className="flex items-center space-x-2 text-yellow-600">
                                    <Clock className="w-3 h-3" />
                                    <span className="text-xs">⚡ Time running low!</span>
                                </div>
                            </motion.div>
                        )}
                        
                        {timerState === 'danger' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mt-3 p-2 bg-red-500/10 border border-red-500/20 rounded-lg"
                            >
                                <motion.div 
                                    className="flex items-center space-x-2 text-red-600"
                                    animate={{ opacity: [1, 0.5, 1] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                >
                                    <AlertTriangle className="w-3 h-3" />
                                    <span className="text-xs font-medium">🚨 Hurry up!</span>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default TimerComponent; 