import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Calendar, ChevronRight } from "lucide-react";
import { ResumeContent } from '../../../../assets/Text/ResumeContent.ts';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';


const ResumeContainer = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [isDownloading, setIsDownloading] = useState(false);

    // Sample skills data - you can move this to a separate file
    const skills = [
        { name: "React/TypeScript", level: 95 },
        { name: "Node.js/Express", level: 85 },
        { name: "Python/Django", level: 80 },
        { name: "UI/UX Design", level: 75 },
        { name: "Database Design", level: 70 },
        { name: "Cloud Services", level: 65 }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 15 }
        }
    };

    const timelineVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { type: "spring", stiffness: 100, damping: 15 }
        }
    };

    const skillBarVariants = {
        hidden: { width: 0 },
        visible: (level: number) => ({
            width: `${level}%`,
            transition: { duration: 1.5, ease: "easeOut", delay: 0.5 }
        })
    };

    const handleDownload = async () => {
        setIsDownloading(true);
        // Simulate download process
        setTimeout(() => {
            // Replace with actual resume download logic
            const link = document.createElement('a');
            link.href = '/resume.pdf'; // Update with actual resume path
            link.download = 'Apurv_Singh_Resume.pdf';
            link.click();
            setIsDownloading(false);
        }, 2000);
    };

    return (
        <motion.section
            className="max-w-7xl mx-auto px-5 py-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
        >
            {/* Section Header */}
            <motion.div className="text-center mb-16" variants={itemVariants}>
                <motion.h1 
                    className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                >
                    Work Experience
                </motion.h1>
                <motion.div
                    className="h-1 w-32 bg-gradient-to-r from-primary to-primary/40 rounded-full mx-auto mb-6"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                />
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    A journey through my professional experiences and the skills I've developed along the way
                </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-12">
                {/* Timeline Section */}
                <motion.div className="lg:col-span-2" variants={itemVariants}>
                    <div className="relative">
                        {/* Timeline Line */}
                        <motion.div
                            className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/60 to-primary/20"
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            style={{ transformOrigin: "top" }}
                        />

                        <div className="space-y-8">
                            {ResumeContent.map((experience, index) => (
                                <motion.div
                                    key={index}
                                    variants={timelineVariants}
                                    className="relative"
                                >
                                    {/* Timeline Dot */}
                                    <motion.div
                                        className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg"
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        transition={{ delay: index * 0.2, type: "spring", stiffness: 150 }}
                                        whileHover={{ scale: 1.3 }}
                                    />

                                    {/* Experience Card */}
                                    <div className="ml-16">
                                        <Card className={`transition-all duration-300 hover:shadow-lg cursor-pointer ${
                                            activeStep === index ? 'border-primary shadow-md' : 'hover:border-primary/50'
                                        }`}>
                                            <CardHeader
                                                className="pb-3"
                                                onClick={() => setActiveStep(activeStep === index ? -1 : index)}
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex items-start space-x-4">
                                                        <motion.img
                                                            src={experience.iconLink}
                                                            alt={experience.company}
                                                            className="w-12 h-12 rounded-full bg-background border border-border object-contain p-1"
                                                            whileHover={{ scale: 1.1 }}
                                                            transition={{ duration: 0.2 }}
                                />
                                <div>
                                                            <CardTitle className="text-xl font-bold text-foreground">
                                                                {experience.designation}
                                                            </CardTitle>
                                                            <p className="text-primary font-semibold">
                                                                {experience.company}
                                                            </p>
                                                            <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                                                                <Calendar className="w-4 h-4" />
                                                                <span>{experience.timeFrame}</span>
                                                            </div>
                                </div>
                            </div>
                                                    <motion.div
                                                        animate={{ rotate: activeStep === index ? 90 : 0 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                                                    </motion.div>
                                                </div>
                                            </CardHeader>

                                            <AnimatePresence>
                            {activeStep === index && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <CardContent>
                                                            <motion.ul
                                                                className="space-y-3"
                                                                variants={{
                                                                    visible: {
                                                                        transition: { staggerChildren: 0.1 }
                                                                    }
                                                                }}
                                                                initial="hidden"
                                                                animate="visible"
                                                            >
                                                                {experience.roleResponsibilities.map((responsibility, idx) => (
                                                                    <motion.li
                                                                        key={idx}
                                                                        variants={{
                                                                            hidden: { opacity: 0, x: -20 },
                                                                            visible: { opacity: 1, x: 0 }
                                                                        }}
                                                                        className="flex items-start space-x-3 text-sm text-muted-foreground"
                                                                    >
                                                                        <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                                                        <span>{responsibility}</span>
                                                                    </motion.li>
                                                                ))}
                                                            </motion.ul>
                                                        </CardContent>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </Card>
                                </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Skills & Download Section */}
                <motion.div className="space-y-8" variants={itemVariants}>
                    {/* Skills Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl font-bold">Technical Skills</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {skills.map((skill, index) => (
                                <motion.div
                                    key={skill.name}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium">{skill.name}</span>
                                        <span className="text-xs text-muted-foreground">{skill.level}%</span>
                                    </div>
                                    <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                                        <motion.div
                                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
                                            variants={skillBarVariants}
                                            custom={skill.level}
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true }}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Download Resume */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl font-bold">Resume</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                                Download my complete resume for a detailed overview of my experience and skills.
                            </p>
                            <Button
                                onClick={handleDownload}
                                disabled={isDownloading}
                                className="w-full"
                                size="lg"
                            >
                                {isDownloading ? (
                                    <motion.div
                                        className="flex items-center space-x-2"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <motion.div
                                            className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        />
                                        <span>Preparing...</span>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        className="flex items-center space-x-2"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Download className="w-4 h-4" />
                                        <span>Download Resume</span>
                                    </motion.div>
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default ResumeContainer;
