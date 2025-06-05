import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, Zap, Award, TrendingUp, Brain, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Progress } from "@/Components/ui/progress";

interface ScoreDisplayProps {
    score: number;
    correctAnswers: number;
    totalQuestions: number;
    timeBonus: number;
    streakCount: number;
    achievements: Achievement[];
    isVisible: boolean;
}

interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    unlocked: boolean;
    progress?: number;
    maxProgress?: number;
}

const ScoreDisplay = ({
    score,
    correctAnswers,
    totalQuestions,
    timeBonus,
    streakCount,
    achievements,
    isVisible
}: ScoreDisplayProps) => {
    const [animatedScore, setAnimatedScore] = useState(0);
    const [showAchievements, setShowAchievements] = useState(false);
    const [newlyUnlocked, setNewlyUnlocked] = useState<Achievement[]>([]);

    // Animate score counting up
    useEffect(() => {
        if (score > 0) {
            const duration = 2000; // 2 seconds
            const steps = 60;
            const increment = score / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= score) {
                    setAnimatedScore(score);
                    clearInterval(timer);
                } else {
                    setAnimatedScore(Math.floor(current));
                }
            }, duration / steps);

            return () => clearInterval(timer);
        }
    }, [score]);

    // Check for newly unlocked achievements
    useEffect(() => {
        const newUnlocked = achievements.filter(achievement => 
            achievement.unlocked && !newlyUnlocked.some(prev => prev.id === achievement.id)
        );
        
        if (newUnlocked.length > 0) {
            setNewlyUnlocked(prev => [...prev, ...newUnlocked]);
            setShowAchievements(true);
            
            // Hide achievements after 5 seconds
            setTimeout(() => setShowAchievements(false), 5000);
        }
    }, [achievements, newlyUnlocked]);

    const accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 50 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                staggerChildren: 0.1
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

    const achievementVariants = {
        hidden: { opacity: 0, scale: 0, x: 100 },
        visible: {
            opacity: 1,
            scale: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15
            }
        },
        exit: {
            opacity: 0,
            scale: 0,
            x: 100,
            transition: { duration: 0.3 }
        }
    };

    const scoreCountVariants = {
        hidden: { scale: 0.8 },
        visible: {
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
            }
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-2xl"
            >
                <Card className="backdrop-blur-lg bg-card/95 border-border/50 shadow-2xl">
                    <CardHeader className="text-center pb-4">
                        <CardTitle className="flex items-center justify-center space-x-2 text-2xl">
                            <Trophy className="w-8 h-8 text-yellow-500" />
                            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                Challenge Complete!
                            </span>
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Main Score Display */}
                        <motion.div 
                            variants={itemVariants}
                            className="text-center"
                        >
                            <motion.div
                                variants={scoreCountVariants}
                                className="relative"
                            >
                                <motion.h2 
                                    className="text-6xl font-bold bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 bg-clip-text text-transparent"
                                    animate={{ 
                                        scale: [1, 1.1, 1],
                                        rotate: [0, 2, -2, 0]
                                    }}
                                    transition={{ 
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatDelay: 3
                                    }}
                                >
                                    {animatedScore.toLocaleString()}
                                </motion.h2>
                                <p className="text-muted-foreground text-lg">Total Score</p>
                                
                                {/* Score breakdown */}
                                <motion.div 
                                    className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4"
                                    variants={{
                                        visible: {
                                            transition: { staggerChildren: 0.1 }
                                        }
                                    }}
                                >
                                    <motion.div variants={itemVariants} className="text-center">
                                        <div className="text-2xl font-bold text-green-600">{correctAnswers}</div>
                                        <div className="text-xs text-muted-foreground">Correct</div>
                                    </motion.div>
                                    <motion.div variants={itemVariants} className="text-center">
                                        <div className="text-2xl font-bold text-blue-600">{Math.round(accuracy)}%</div>
                                        <div className="text-xs text-muted-foreground">Accuracy</div>
                                    </motion.div>
                                    <motion.div variants={itemVariants} className="text-center">
                                        <div className="text-2xl font-bold text-purple-600">+{timeBonus}</div>
                                        <div className="text-xs text-muted-foreground">Time Bonus</div>
                                    </motion.div>
                                    <motion.div variants={itemVariants} className="text-center">
                                        <div className="text-2xl font-bold text-orange-600">{streakCount}</div>
                                        <div className="text-xs text-muted-foreground">Best Streak</div>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        </motion.div>

                        {/* Performance Metrics */}
                        <motion.div variants={itemVariants} className="space-y-4">
                            <h3 className="text-lg font-semibold flex items-center space-x-2">
                                <TrendingUp className="w-5 h-5" />
                                <span>Performance Metrics</span>
                            </h3>
                            
                            <div className="space-y-3">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Accuracy</span>
                                        <span>{Math.round(accuracy)}%</span>
                                    </div>
                                    <Progress value={accuracy} className="h-2" />
                                </div>
                                
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Speed Bonus</span>
                                        <span>{Math.round((timeBonus / score) * 100)}%</span>
                                    </div>
                                    <Progress value={(timeBonus / score) * 100} className="h-2" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Achievements */}
                        <motion.div variants={itemVariants} className="space-y-4">
                            <h3 className="text-lg font-semibold flex items-center space-x-2">
                                <Award className="w-5 h-5" />
                                <span>Achievements</span>
                            </h3>
                            
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {achievements.map((achievement, _) => (
                                    <motion.div
                                        key={achievement.id}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.05 }}
                                        className={`p-3 rounded-lg border text-center ${
                                            achievement.unlocked 
                                                ? 'bg-primary/10 border-primary/50 text-primary' 
                                                : 'bg-muted/50 border-muted text-muted-foreground'
                                        }`}
                                    >
                                        <div className="text-2xl mb-1">{achievement.icon}</div>
                                        <div className="text-xs font-medium">{achievement.title}</div>
                                        {achievement.progress !== undefined && (
                                            <div className="mt-2">
                                                <Progress 
                                                    value={(achievement.progress / (achievement.maxProgress || 1)) * 100} 
                                                    className="h-1"
                                                />
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Performance Badges */}
                        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2">
                            {accuracy >= 90 && (
                                <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/20">
                                    <Star className="w-3 h-3 mr-1" />
                                    Accuracy Master
                                </Badge>
                            )}
                            {streakCount >= 3 && (
                                <Badge variant="secondary" className="bg-orange-500/10 text-orange-600 border-orange-500/20">
                                    <Zap className="w-3 h-3 mr-1" />
                                    Streak Legend
                                </Badge>
                            )}
                            {timeBonus > score * 0.2 && (
                                <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 border-blue-500/20">
                                    <Clock className="w-3 h-3 mr-1" />
                                    Speed Demon
                                </Badge>
                            )}
                            {correctAnswers === totalQuestions && (
                                <Badge variant="secondary" className="bg-purple-500/10 text-purple-600 border-purple-500/20">
                                    <Brain className="w-3 h-3 mr-1" />
                                    Perfect Score
                                </Badge>
                            )}
                        </motion.div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Achievement Notifications */}
            <AnimatePresence>
                {showAchievements && newlyUnlocked.map((achievement, index) => (
                    <motion.div
                        key={`${achievement.id}-${index}`}
                        variants={achievementVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed top-4 right-4 z-60"
                        style={{ marginTop: `${index * 80}px` }}
                    >
                        <Card className="bg-yellow-500/10 border-yellow-500/50 shadow-lg">
                            <CardContent className="p-4">
                                <div className="flex items-center space-x-3">
                                    <div className="text-2xl">{achievement.icon}</div>
                                    <div>
                                        <div className="font-semibold text-yellow-600">Achievement Unlocked!</div>
                                        <div className="text-sm">{achievement.title}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default ScoreDisplay; 