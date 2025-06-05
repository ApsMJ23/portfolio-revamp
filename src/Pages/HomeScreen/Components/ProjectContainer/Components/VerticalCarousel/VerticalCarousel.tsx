import { useState } from "react";
import { motion, AnimatePresence, PanInfo, useMotionValue, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Code2 } from "lucide-react";
import { ProjectContent } from '@/assets/Text/ProjectContent.ts';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';

const VerticalCarousel = () => {
    const [index, setIndex] = useState(0);
    const [dragDirection, setDragDirection] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    
    const x = useMotionValue(0);
    // Simple linear transforms
    const rotateY = useTransform(x, [-100, 0, 100], [-5, 0, 5]);
    const scale = useTransform(x, [-100, 0, 100], [0.98, 1, 0.98]);

    const currentProject = ProjectContent[index];

    // Simple swipe threshold
    const swipeConfidenceThreshold = 2000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const cardVariants = {
        hidden: { 
            opacity: 0, 
            x: 20, 
            scale: 0.98
        },
        visible: { 
            opacity: 1, 
            x: 0, 
            scale: 1,
            transition: {
                duration: 0.15,
                ease: "easeOut",
                staggerChildren: isDragging ? 0 : 0.03
            }
        },
        exit: { 
            opacity: 0, 
            x: dragDirection > 0 ? 100 : -100, 
            scale: 0.95,
            transition: { 
                duration: 0.15,
                ease: "easeInOut"
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.12,
                ease: "easeOut"
            }
        }
    };

    const techStackVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: { 
                duration: 0.1,
                ease: "easeOut"
            }
        }
    };

    const handlePrevious = () => {
        if (index > 0) {
            setDragDirection(-1);
            setIndex(index - 1);
        }
    };

    const handleNext = () => {
        if (index < ProjectContent.length - 1) {
            setDragDirection(1);
            setIndex(index + 1);
        }
    };

    const handleDragStart = () => {
        setIsDragging(true);
    };

    const handleDragEnd = (_: any, info: PanInfo) => {
        setIsDragging(false);
        const swipe = swipePower(info.offset.x, info.velocity.x);

        if (swipe < -swipeConfidenceThreshold && index < ProjectContent.length - 1) {
            // Swiped left, go to next
            setDragDirection(1);
            setIndex(index + 1);
        } else if (swipe > swipeConfidenceThreshold && index > 0) {
            // Swiped right, go to previous
            setDragDirection(-1);
            setIndex(index - 1);
        }
        
        // Immediate reset
        x.set(0);
    };

    const handleViewSource = () => {
        if (currentProject.projectLink) {
            window.open(currentProject.projectLink, '_blank');
        }
    };

    return (
        <div className="w-full max-w-2xl">
            {/* Swipe Instruction (visible only on mobile) */}
            <motion.div 
                className="md:hidden text-center mb-4 px-4 py-2 bg-accent/50 rounded-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.5 }}
            >
                <span className="text-xs text-muted-foreground">
                    👈 Swipe left or right to navigate projects 👉
                </span>
            </motion.div>

            {/* Project Card with Swipe Support */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="mb-8 cursor-grab active:cursor-grabbing touch-none"
                    drag="x"
                    dragConstraints={{ left: -100, right: 100 }}
                    dragElastic={0.05}
                    dragMomentum={false}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    style={{ 
                        x, 
                        rotateY,
                        scale
                    }}
                    whileDrag={{ 
                        cursor: "grabbing",
                        transition: { duration: 0 }
                    }}
                >
                    <Card className={`group transition-all duration-200 border-border/50 backdrop-blur-sm bg-card/80 select-none overflow-hidden relative ${
                        !isDragging ? 'hover:shadow-xl hover:-translate-y-1' : ''
                    }`}>
                        {/* Simplified background gradient */}
                        {!isDragging && (
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3 opacity-0 group-hover:opacity-100"
                                transition={{ duration: 0.2 }}
                            />
                        )}
                        
                        <CardHeader className="space-y-4 relative z-10">
                            <motion.div variants={itemVariants}>
                                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                    {currentProject.title}
                                </CardTitle>
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <CardDescription className="text-base text-muted-foreground">
                                    {currentProject.subTitle}
                                </CardDescription>
                            </motion.div>
                        </CardHeader>

                        <CardContent className="space-y-6 relative z-10">
                            {/* Description */}
                            <motion.div variants={itemVariants}>
                                <h4 className="font-semibold mb-3 text-foreground">Key Features:</h4>
                                <motion.ul 
                                    className="space-y-2"
                                    variants={{
                                        visible: {
                                            transition: { staggerChildren: 0.1 }
                                        }
                                    }}
                                >
                                    {currentProject.description.map((desc, i) => (
                                        <motion.li
                                            key={i}
                                            variants={itemVariants}
                                            className="flex items-start space-x-2 text-sm text-muted-foreground"
                                        >
                                            <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                            <span>{desc}</span>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </motion.div>

                            {/* Tech Stack */}
                            <motion.div variants={itemVariants}>
                                <h4 className="font-semibold mb-3 text-foreground">Tech Stack:</h4>
                                <motion.div 
                                    className="flex flex-wrap gap-2"
                                    variants={{
                                        visible: {
                                            transition: { staggerChildren: 0.05 }
                                        }
                                    }}
                                >
                                    {currentProject.techStack.map((tech, i) => (
                                        <motion.div
                                            key={i}
                                            variants={techStackVariants}
                                            whileHover={!isDragging ? { scale: 1.05 } : {}}
                                            whileTap={!isDragging ? { scale: 0.98 } : {}}
                                        >
                                            <Badge 
                                                variant="secondary" 
                                                className={`${!isDragging ? 'hover:bg-primary hover:text-primary-foreground' : ''} transition-colors duration-150`}
                                            >
                                                {tech}
                                            </Badge>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </motion.div>
                        </CardContent>

                        <CardFooter className="relative z-10">
                            <motion.div variants={itemVariants} className="w-full">
                                <Button
                                    onClick={handleViewSource}
                                    className="w-full group/btn"
                                    size="lg"
                                >
                                    <Code2 className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform duration-200" />
                                    View Source Code
                                    <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-200" />
                                </Button>
                            </motion.div>
                        </CardFooter>
                    </Card>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <motion.div 
                className="flex justify-center items-center space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.3 }}
            >
                <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePrevious}
                    disabled={index === 0}
                    className={`h-12 w-12 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 ${
                        !isDragging ? 'hover:bg-accent hover:scale-105' : ''
                    }`}
                >
                    <ChevronLeft className="h-5 w-5" />
                </Button>

                {/* Project Indicators */}
                <div className="flex space-x-2">
                    {ProjectContent.map((_, i) => (
                        <motion.button
                            key={i}
                            onClick={() => {
                                setDragDirection(i > index ? 1 : -1);
                                setIndex(i);
                            }}
                            className={`w-3 h-3 rounded-full transition-all duration-150 ${
                                i === index 
                                    ? 'bg-primary scale-110' 
                                    : `bg-muted-foreground/30 ${!isDragging ? 'hover:bg-muted-foreground/60' : ''}`
                            }`}
                            whileHover={!isDragging ? { scale: 1.15 } : {}}
                            whileTap={!isDragging ? { scale: 0.95 } : {}}
                            aria-label={`Go to project ${i + 1}`}
                        />
                    ))}
                </div>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={handleNext}
                    disabled={index === ProjectContent.length - 1}
                    className={`h-12 w-12 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 ${
                        !isDragging ? 'hover:bg-accent hover:scale-105' : ''
                    }`}
                >
                    <ChevronRight className="h-5 w-5" />
                </Button>
            </motion.div>

            {/* Project Counter */}
            <motion.div 
                className="text-center mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.4 }}
            >
                <span className="text-sm text-muted-foreground">
                    Project {index + 1} of {ProjectContent.length}
                </span>
            </motion.div>
        </div>
    );
};

export default VerticalCarousel;