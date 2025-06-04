
import { motion } from "framer-motion";
import VerticalCarousel from "./Components/VerticalCarousel/VerticalCarousel.tsx";

const ProjectContainer = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        }
    };

    const titleVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 0.8
            }
        }
    };

    const carouselVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 20,
                duration: 0.6
            }
        }
    };

    return (
        <motion.section
            className="max-w-7xl mx-auto mt-20 px-5 py-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
        >
            <div className="flex flex-wrap lg:flex-nowrap gap-10 items-center min-h-[600px]">
                {/* Title Section */}
                <motion.div 
                    className="sticky top-20 flex justify-center items-center w-full lg:w-1/2"
                    variants={titleVariants}
                >
                    <div className="text-center">
                        <motion.h1 
                            className="font-bold font-sans text-4xl md:text-6xl lg:text-7xl xl:text-8xl bg-gradient-to-br from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent leading-tight"
                            whileHover={{ 
                                scale: 1.05,
                                transition: { duration: 0.2 }
                            }}
                        >
                            Freelance
                            <br />
                            <span className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl">
                                Projects
                            </span>
                        </motion.h1>
                        
                        <motion.div
                            className="mt-6 h-1 w-24 bg-gradient-to-r from-primary to-primary/40 rounded-full mx-auto"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        />
                        
                        <motion.p
                            className="mt-6 text-muted-foreground text-sm md:text-base max-w-md mx-auto leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                        >
                            Showcasing innovative solutions and technical expertise through real-world projects
                        </motion.p>
                    </div>
                </motion.div>

                {/* Carousel Section */}
                <motion.div 
                    className="flex flex-col justify-center items-center w-full lg:w-1/2"
                    variants={carouselVariants}
                >
                    <VerticalCarousel />
                </motion.div>
            </div>
        </motion.section>
    );
};

export default ProjectContainer;
