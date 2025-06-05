import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

interface ScrollProgressProps {
  variant?: "line" | "circle" | "dots" | "sidebar";
  position?: "top" | "bottom" | "left" | "right";
  showPercentage?: boolean;
  showScrollToTop?: boolean;
  color?: string;
  className?: string;
}

export const ScrollProgress = ({
  variant = "line",
  position = "top",
  showPercentage = false,
  showScrollToTop = true,
  color = "primary",
  className = ""
}: ScrollProgressProps) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const [scrollY, setScrollY] = useState(0);
  const percentage = Math.round(scrollY * 100);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      setScrollY(latest);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Line Progress Bar
  if (variant === "line") {
    const positionClasses = {
      top: "fixed top-0 left-0 right-0 z-50",
      bottom: "fixed bottom-0 left-0 right-0 z-50",
      left: "fixed top-0 bottom-0 left-0 z-50 w-1",
      right: "fixed top-0 bottom-0 right-0 z-50 w-1"
    };

    const progressDirection = position === "left" || position === "right" ? "scaleY" : "scaleX";
    const progressOrigin = position === "bottom" || position === "right" ? "bottom" : "top";

    return (
      <motion.div
        className={`${positionClasses[position]} bg-primary/20 ${className}`}
        style={{ height: position === "left" || position === "right" ? "100%" : "3px" }}
      >
        <motion.div
          className={`bg-${color} h-full w-full origin-${progressOrigin}`}
          style={{ [progressDirection]: scaleX }}
        />
        
        {showPercentage && (
          <motion.div
            className="absolute top-1 right-4 text-xs bg-background/80 backdrop-blur-sm px-2 py-1 rounded"
            initial={{ opacity: 0 }}
            animate={{ opacity: scrollY > 0.1 ? 1 : 0 }}
          >
            {percentage}%
          </motion.div>
        )}
      </motion.div>
    );
  }

  // Circular Progress Indicator
  if (variant === "circle") {
    const radius = 20;
    const circumference = 2 * Math.PI * radius;

    return (
      <motion.div
        className={`fixed bottom-8 right-8 z-50 ${className}`}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: scrollY > 0.1 ? 1 : 0,
          scale: scrollY > 0.1 ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative">
          <svg width="50" height="50" className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="25"
              cy="25"
              r={radius}
              fill="transparent"
              stroke="currentColor"
              strokeWidth="2"
              className="text-muted/20"
            />
            {/* Progress circle */}
            <motion.circle
              cx="25"
              cy="25"
              r={radius}
              fill="transparent"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className={`text-${color}`}
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: useTransform(
                  scrollYProgress,
                  [0, 1],
                  [circumference, 0]
                )
              }}
            />
          </svg>
          
          {/* Percentage text */}
          {showPercentage && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-medium">{percentage}</span>
            </div>
          )}
          
          {/* Scroll to top button */}
          {showScrollToTop && scrollY > 0.3 && (
            <motion.button
              onClick={scrollToTop}
              className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <ChevronUp className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </motion.div>
    );
  }

  // Dots Progress Indicator
  if (variant === "dots") {
    const totalDots = 10;
    const activeDots = Math.ceil(scrollY * totalDots);

    return (
      <motion.div
        className={`fixed right-8 top-1/2 transform -translate-y-1/2 z-50 space-y-3 ${className}`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ 
          opacity: scrollY > 0.1 ? 1 : 0,
          x: scrollY > 0.1 ? 0 : 20
        }}
        transition={{ duration: 0.3 }}
      >
        {Array.from({ length: totalDots }).map((_, index) => (
          <motion.div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index < activeDots
                ? `bg-${color}`
                : 'bg-muted/30'
            }`}
            whileHover={{ scale: 1.3 }}
            animate={{
              scale: index < activeDots ? 1.2 : 1,
              opacity: index < activeDots ? 1 : 0.5
            }}
          />
        ))}
      </motion.div>
    );
  }

  // Sidebar Progress
  if (variant === "sidebar") {
    return (
      <motion.div
        className={`fixed left-0 top-0 bottom-0 w-1 bg-muted/20 z-50 ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollY > 0.1 ? 1 : 0 }}
      >
        <motion.div
          className={`bg-${color} w-full origin-top`}
          style={{ scaleY: scaleX }}
        />
        
        {/* Section markers */}
        <div className="absolute inset-0">
          {[0.2, 0.4, 0.6, 0.8].map((position, index) => (
            <motion.div
              key={index}
              className="absolute left-0 w-3 h-3 bg-background border-2 border-primary rounded-full transform -translate-x-1"
              style={{ top: `${position * 100}%` }}
              animate={{
                scale: scrollY >= position ? 1.2 : 1,
                borderColor: scrollY >= position ? `hsl(var(--${color}))` : 'hsl(var(--muted))'
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </motion.div>
    );
  }

  return null;
};

// Reading Progress Component for articles/content
export const ReadingProgress = ({ 
  className = "" 
}: { 
  className?: string;
}) => {
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"]
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-1 bg-primary/20 z-50 ${className}`}
    >
      <motion.div
        className="bg-primary h-full origin-left"
        style={{ scaleX }}
      />
    </motion.div>
  );
};

// Page Section Navigator
export const SectionNavigator = ({ 
  sections = [],
  className = ""
}: { 
  sections?: Array<{ id: string; label: string; }>;
  className?: string;
}) => {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sections.findIndex(section => section.id === entry.target.id);
            if (index !== -1) {
              setActiveSection(index);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      className={`fixed right-8 top-1/2 transform -translate-y-1/2 z-50 space-y-2 ${className}`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
    >
      {sections.map((section, index) => (
        <motion.button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className={`block w-3 h-3 rounded-full transition-all duration-300 ${
            index === activeSection
              ? 'bg-primary scale-125'
              : 'bg-muted/50 hover:bg-muted'
          }`}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
          title={section.label}
        />
      ))}
    </motion.nav>
  );
}; 