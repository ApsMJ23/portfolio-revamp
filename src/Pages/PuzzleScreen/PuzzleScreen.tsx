import { motion, AnimatePresence } from "framer-motion";
import Greetings from '../../assets/Svg/greetings.svg';
import { useEffect, useState } from "react";
import CodeBlockComponent from "./Components/CodeBlock/CodeBlockComponent.tsx";
import TimerComponent from "./Components/TimerComponent.tsx";
import { QuestionType } from "../../assets/Text/PuzzleList.ts";
import { useSearchParams } from "react-router-dom";
import Result from "./Components/Result/Result.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Separator } from "@/Components/ui/separator";
import { CheckCircle2, Target, Timer, Zap } from "lucide-react";

const PuzzleScreen = () => {
    const [params, setParams] = useSearchParams();
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string>("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [hoveredOption, setHoveredOption] = useState<string>("");
    const [timerActive, setTimerActive] = useState(true);
    const [showTimer, setShowTimer] = useState(true);
    const [selectedPuzzle, setSelectedPuzzle] = useState<QuestionType>({
        Code: '',
        Options: [],
        Answer: ''
    });

    useEffect(() => {
        if (params.get('question')) {
            setShowResult(true);
        }
    }, [params]);

    const checkWhetherCorrect = (value: string) => {
        setSelectedOption(value);
        setIsProcessing(true);
        setTimerActive(false); // Stop timer when answer is selected
        
        setTimeout(() => {
            if (value === selectedPuzzle.Answer) {
                params.set('question', 'true');
            } else {
                params.set('question', 'false');
            }
            setShowResult(true);
            setParams(params);
            setIsProcessing(false);
        }, 1000); // Add a delay to show processing state
    };

    const handleTimeUp = () => {
        // Auto-fail when time runs out
        params.set('question', 'false');
        setShowResult(true);
        setParams(params);
        setTimerActive(false);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    const optionVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { type: "spring", stiffness: 100 }
        },
        tap: { scale: 0.95 },
        hover: { scale: 1.02, x: 5 }
    };

    const processingVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 200
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 p-4">
            <AnimatePresence mode="wait">
                {showResult ? (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Result setShowResult={setShowResult} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="puzzle"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex justify-center items-center min-h-screen"
                    >
                        <div className="w-full max-w-6xl mx-auto">
                            {/* Header */}
                            <motion.div 
                                variants={cardVariants}
                                className="text-center mb-8"
                            >
                                <motion.h1 
                                    className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent mb-4"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    🚀 Code Challenge
                                </motion.h1>
                                <motion.p 
                                    className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                                    variants={cardVariants}
                                >
                                    Brace yourself! This place is like a VIP club. Are you on the guest list or just hoping for a virtual bouncer to give you the nod?
                                </motion.p>
                                
                                {/* Challenge Stats */}
                                <motion.div 
                                    variants={cardVariants}
                                    className="flex justify-center items-center space-x-6 mt-6"
                                >
                                    <Badge variant="secondary" className="flex items-center space-x-1">
                                        <Target className="w-3 h-3" />
                                        <span>Accuracy Challenge</span>
                                    </Badge>
                                    <Badge variant="secondary" className="flex items-center space-x-1">
                                        <Timer className="w-3 h-3" />
                                        <span>Quick Thinking</span>
                                    </Badge>
                                    <Badge variant="secondary" className="flex items-center space-x-1">
                                        <Zap className="w-3 h-3" />
                                        <span>Logic Test</span>
                                    </Badge>
                                </motion.div>

                                {/* Timer Component */}
                                {showTimer && (
                                    <motion.div 
                                        variants={cardVariants}
                                        className="flex justify-center mt-8"
                                    >
                                        <TimerComponent
                                            duration={120} // 2 minutes
                                            onTimeUp={handleTimeUp}
                                            isActive={timerActive}
                                        />
                                    </motion.div>
                                )}
                            </motion.div>

                            {/* Main Content */}
                            <motion.div variants={cardVariants}>
                                <Card className="backdrop-blur-sm bg-card/90 border-border/50 shadow-2xl">
                                    <CardContent className="p-8">
                                        <div className="grid lg:grid-cols-2 gap-8 items-start">
                                            {/* Code Block Section */}
                                            <motion.div 
                                                variants={cardVariants}
                                                className="order-2 lg:order-1"
                                            >
                                                <CodeBlockComponent setPuzzleOptions={setSelectedPuzzle} />
                                            </motion.div>

                                            {/* Separator */}
                                            <div className="hidden lg:flex justify-center order-1 lg:order-2">
                                                <Separator orientation="vertical" className="h-96" />
                                            </div>
                                            <div className="lg:hidden order-1">
                                                <Separator orientation="horizontal" className="my-4" />
                                            </div>

                                            {/* Options Section */}
                                            <motion.div 
                                                variants={cardVariants}
                                                className="order-3 lg:order-3 lg:col-span-1"
                                            >
                                                <Card className="bg-accent/20 border-accent/30">
                                                    <CardHeader>
                                                        <CardTitle className="flex items-center space-x-2">
                                                            <CheckCircle2 className="w-5 h-5 text-primary" />
                                                            <span>Select the Correct Output</span>
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <motion.div 
                                                            className="space-y-3"
                                                            variants={{
                                                                visible: {
                                                                    transition: { staggerChildren: 0.1 }
                                                                }
                                                            }}
                                                        >
                                                            {selectedPuzzle?.Options?.map((option, index) => (
                                                                <motion.label
                                                                    key={index}
                                                                    variants={optionVariants}
                                                                    whileHover="hover"
                                                                    whileTap="tap"
                                                                    onHoverStart={() => setHoveredOption(option)}
                                                                    onHoverEnd={() => setHoveredOption("")}
                                                                    className={`
                                                                        flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-all duration-200 group
                                                                        ${selectedOption === option 
                                                                            ? 'border-primary bg-primary/10 shadow-md' 
                                                                            : 'border-border hover:border-primary/50 hover:bg-accent/50'
                                                                        }
                                                                        ${isProcessing ? 'pointer-events-none opacity-50' : ''}
                                                                    `}
                                                                >
                                                                    <motion.input
                                                                        type="radio"
                                                                        name="radio-buttons-group"
                                                                        value={option}
                                                                        checked={selectedOption === option}
                                                                        onChange={(e) => checkWhetherCorrect(e.target.value)}
                                                                        className="w-4 h-4 text-primary focus:ring-2 focus:ring-primary border-border"
                                                                        disabled={isProcessing}
                                                                        whileHover={{ scale: 1.1 }}
                                                                    />
                                                                    <motion.span 
                                                                        className={`flex-1 text-sm font-mono ${
                                                                            selectedOption === option 
                                                                                ? 'text-primary font-medium' 
                                                                                : 'text-foreground group-hover:text-foreground'
                                                                        }`}
                                                                        animate={hoveredOption === option ? { x: 2 } : { x: 0 }}
                                                                    >
                                                                        {option}
                                                                    </motion.span>
                                                                    
                                                                    {selectedOption === option && isProcessing && (
                                                                        <motion.div
                                                                            variants={processingVariants}
                                                                            initial="hidden"
                                                                            animate="visible"
                                                                            className="flex items-center space-x-1 text-primary"
                                                                        >
                                                                            <motion.div
                                                                                animate={{ rotate: 360 }}
                                                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                                                className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full"
                                                                            />
                                                                            <span className="text-xs">Processing...</span>
                                                                        </motion.div>
                                                                    )}
                                                                </motion.label>
                                                            ))}
                                                        </motion.div>

                                                        {/* Helpful tip */}
                                                        <motion.div 
                                                            className="mt-6 p-3 bg-accent/30 rounded-lg border border-accent/50"
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: 0.5 }}
                                                        >
                                                            <p className="text-xs text-muted-foreground flex items-center space-x-2">
                                                                <Zap className="w-3 h-3" />
                                                                <span>💡 Tip: Think step by step through the code execution</span>
                                                            </p>
                                                        </motion.div>
                                                    </CardContent>
                                                </Card>
                                            </motion.div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            {/* Greetings Character */}
                            <motion.img 
                                src={Greetings} 
                                alt="Challenge mascot"
                                className="fixed bottom-4 right-4 w-24 h-24 md:w-32 md:h-32 object-contain pointer-events-none z-10"
                                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                transition={{ 
                                    delay: 1,
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 15
                                }}
                                whileHover={{ 
                                    scale: 1.1,
                                    rotate: [0, -10, 10, 0],
                                    transition: { duration: 0.3 }
                                }}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PuzzleScreen;
