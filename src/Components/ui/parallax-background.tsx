import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ParallaxBackgroundProps {
  children: ReactNode;
  intensity?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  speed?: "slow" | "medium" | "fast";
}

export const ParallaxBackground = ({
  children,
  intensity = 0.5,
  className = "",
  direction = "up",
  speed = "medium"
}: ParallaxBackgroundProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const speedMultiplier = {
    slow: 50,
    medium: 100,
    fast: 200
  };

  const getTransform = () => {
    const distance = speedMultiplier[speed] * intensity;
    
    switch (direction) {
      case "up":
        return useTransform(scrollYProgress, [0, 1], [0, -distance]);
      case "down":
        return useTransform(scrollYProgress, [0, 1], [0, distance]);
      case "left":
        return useTransform(scrollYProgress, [0, 1], [0, -distance]);
      case "right":
        return useTransform(scrollYProgress, [0, 1], [0, distance]);
      default:
        return useTransform(scrollYProgress, [0, 1], [0, -distance]);
    }
  };

  const transform = getTransform();

  const getStyle = () => {
    switch (direction) {
      case "left":
      case "right":
        return { x: transform };
      default:
        return { y: transform };
    }
  };

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={getStyle()}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
};

// Preset parallax components for common patterns
export const ParallaxSection = ({ 
  children, 
  className = "",
  backgroundElements 
}: {
  children: ReactNode;
  className?: string;
  backgroundElements?: ReactNode;
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* Background elements with parallax */}
      {backgroundElements && (
        <div className="absolute inset-0 pointer-events-none">
          <ParallaxBackground intensity={0.3} speed="slow">
            {backgroundElements}
          </ParallaxBackground>
        </div>
      )}
      
      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Floating elements for background decoration
export const FloatingElements = () => {
  return (
    <>
      {/* Floating circles */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-xl"
        animate={{ 
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-40 right-20 w-24 h-24 bg-accent/10 rounded-full blur-lg"
        animate={{ 
          y: [0, -20, 0],
          x: [0, 10, 0],
          scale: [1, 0.9, 1]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <motion.div
        className="absolute bottom-40 left-1/4 w-20 h-20 bg-primary/8 rounded-full blur-md"
        animate={{ 
          y: [0, 25, 0],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-60 right-10 w-16 h-16"
        animate={{ 
          rotate: [0, 360],
          y: [0, -15, 0]
        }}
        transition={{ 
          duration: 12,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 transform rotate-45 blur-sm" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-20 right-1/3 w-12 h-12"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, -180, -360],
          y: [0, 20, 0]
        }}
        transition={{ 
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        <div className="w-full h-full bg-gradient-to-tr from-accent/15 to-primary/15 rounded-lg blur-sm" />
      </motion.div>
    </>
  );
};

// Grid pattern background
export const GridPattern = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <div 
        className="w-full h-full opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
};

// Animated gradient background
export const GradientBackground = ({ 
  className = "",
  colors = ["primary", "accent", "secondary"]
}: { 
  className?: string;
  colors?: string[];
}) => {
  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      animate={{
        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        background: `linear-gradient(45deg, 
          hsl(var(--${colors[0]})/0.05), 
          hsl(var(--${colors[1]})/0.03), 
          hsl(var(--${colors[2] || colors[0]})/0.05)
        )`,
        backgroundSize: "200% 200%"
      }}
    />
  );
}; 