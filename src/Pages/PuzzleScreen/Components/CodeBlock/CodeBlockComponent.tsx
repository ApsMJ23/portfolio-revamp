import { PuzzleList, QuestionType } from "@/assets/Text/PuzzleList.ts";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CodeBlock, dracula } from "react-code-blocks";
import { motion } from "framer-motion";
import { Code2, Shuffle, Play } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";

type CodeBlockComponentProps = {
    setPuzzleOptions: Dispatch<SetStateAction<QuestionType>>
}

const CodeBlockComponent = (props: CodeBlockComponentProps) => {
    const { setPuzzleOptions } = props;
    const randomKey = Object.keys(PuzzleList)[Math.floor(Math.random() * Object.keys(PuzzleList).length)];
    const [selectedLanguage, setSelectedLanguage] = useState(randomKey);
    const randomPuzzle = Math.floor(Math.random() * PuzzleList[selectedLanguage].length);
    const [puzzle, setPuzzle] = useState(PuzzleList?.[selectedLanguage]?.[randomPuzzle] ?? PuzzleList[selectedLanguage][0]);
    const [isShuffling, setIsShuffling] = useState(false);

    useEffect(() => {
        setPuzzle(PuzzleList?.[selectedLanguage]?.[randomPuzzle] ?? PuzzleList[selectedLanguage][0]);
        setPuzzleOptions(puzzle ?? PuzzleList[selectedLanguage][0]);
    }, [randomPuzzle, selectedLanguage, puzzle?.Options, setPuzzleOptions, puzzle]);

    const handleLanguageChange = (language: string) => {
        setIsShuffling(true);
        setTimeout(() => {
            setSelectedLanguage(language);
            const newRandomPuzzle = Math.floor(Math.random() * PuzzleList[language].length);
            setPuzzle(PuzzleList[language][newRandomPuzzle]);
            setIsShuffling(false);
        }, 300);
    };

    const shufflePuzzle = () => {
        setIsShuffling(true);
        setTimeout(() => {
            const newRandomPuzzle = Math.floor(Math.random() * PuzzleList[selectedLanguage].length);
            setPuzzle(PuzzleList[selectedLanguage][newRandomPuzzle]);
            setIsShuffling(false);
        }, 300);
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3 }
        }
    };

    const codeBlockVariants = {
        hidden: { opacity: 0, scale: 0.95, rotateX: -10 },
        visible: {
            opacity: 1,
            scale: 1,
            rotateX: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center w-full max-w-lg mx-auto"
        >
            <Card className="w-full backdrop-blur-sm bg-card/90 border-border/50 shadow-lg">
                <CardHeader className="pb-4">
                    <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Code2 className="w-5 h-5 text-primary" />
                            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                Code Challenge
                            </span>
                        </div>
                        <Button
                            onClick={shufflePuzzle}
                            variant="outline"
                            size="sm"
                            className="h-8 px-3"
                            disabled={isShuffling}
                        >
                            <motion.div
                                animate={isShuffling ? { rotate: 360 } : { rotate: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Shuffle className="w-4 h-4" />
                            </motion.div>
                        </Button>
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    {/* Language Selector */}
                    <motion.div variants={itemVariants} className="space-y-2">
                        <label htmlFor="language-selector" className="block text-sm font-medium text-foreground">
                            Programming Language
                        </label>
                        <motion.select
                            id="language-selector"
                            value={selectedLanguage}
                            onChange={(e) => handleLanguageChange(e.target.value)}
                            className="w-full py-2 px-3 border border-border bg-background rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm transition-all duration-200"
                            whileFocus={{ scale: 1.02 }}
                        >
                            {Object.keys(PuzzleList).map((language, index) => (
                                <option key={index} value={language}>
                                    {language}
                                </option>
                            ))}
                        </motion.select>
                    </motion.div>

                    {/* Code Block */}
                    <motion.div 
                        variants={codeBlockVariants}
                        className="relative overflow-hidden rounded-lg"
                        animate={isShuffling ? "hidden" : "visible"}
                    >
                        <motion.div
                            className="absolute top-2 left-2 z-10 flex items-center space-x-1 px-2 py-1 bg-background/80 backdrop-blur-sm rounded text-xs text-muted-foreground"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Play className="w-3 h-3" />
                            <span>Execute & Predict</span>
                        </motion.div>

                        <motion.div
                            className="w-full"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                        >
                            <CodeBlock
                                text={puzzle.Code}
                                codeContainerStyle={{ 
                                    width: '100%', 
                                    borderRadius: '0.5rem',
                                    minHeight: '200px',
                                    fontSize: '14px'
                                }}
                                language={selectedLanguage}
                                startingLineNumber={1}
                                showLineNumbers={true}
                                theme={dracula}
                            />
                        </motion.div>

                        {/* Loading overlay */}
                        {isShuffling && (
                            <motion.div
                                className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <motion.div
                                    className="flex items-center space-x-2 text-muted-foreground"
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    <Shuffle className="w-4 h-4" />
                                    <span className="text-sm">Loading new challenge...</span>
                                </motion.div>
                            </motion.div>
                        )}
                    </motion.div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default CodeBlockComponent;
