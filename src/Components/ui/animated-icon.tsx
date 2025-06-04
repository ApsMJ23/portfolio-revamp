import { motion } from "framer-motion";
import { ReactNode, cloneElement, ReactElement } from "react";
import { cn } from "@/lib/utils";

interface AnimatedIconProps {
  children: ReactNode;
  animation?: "bounce" | "rotate" | "pulse" | "shake" | "flip" | "scale" | "slide";
  trigger?: "hover" | "click" | "always";
  className?: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg" | "xl";
}

export const AnimatedIcon = ({
  children,
  animation = "scale",
  trigger = "hover",
  className = "",
  onClick,
  size = "md"
}: AnimatedIconProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8"
  };

  const animationVariants = {
    bounce: {
      initial: { y: 0 },
      animate: { 
        y: [0, -8, 0],
        transition: { duration: 0.5, ease: "easeInOut" }
      }
    },
    rotate: {
      initial: { rotate: 0 },
      animate: { 
        rotate: 360,
        transition: { duration: 0.5, ease: "easeInOut" }
      }
    },
    pulse: {
      initial: { scale: 1 },
      animate: { 
        scale: [1, 1.2, 1],
        transition: { duration: 0.6, ease: "easeInOut" }
      }
    },
    shake: {
      initial: { x: 0 },
      animate: { 
        x: [0, -5, 5, -5, 5, 0],
        transition: { duration: 0.5 }
      }
    },
    flip: {
      initial: { rotateY: 0 },
      animate: { 
        rotateY: 180,
        transition: { duration: 0.6, ease: "easeInOut" }
      }
    },
    scale: {
      initial: { scale: 1 },
      animate: { 
        scale: 1.15,
        transition: { duration: 0.2, ease: "easeInOut" }
      }
    },
    slide: {
      initial: { x: 0 },
      animate: { 
        x: 5,
        transition: { duration: 0.2, ease: "easeInOut" }
      }
    }
  };

  const variant = animationVariants[animation];

  const getAnimationProps = () => {
    switch (trigger) {
      case "hover":
        return {
          initial: variant.initial,
          whileHover: variant.animate,
          whileTap: { scale: 0.9 }
        };
      case "click":
        return {
          initial: variant.initial,
          whileTap: variant.animate
        };
      case "always":
        return {
          initial: variant.initial,
          animate: variant.animate
        };
      default:
        return {
          initial: variant.initial,
          whileHover: variant.animate
        };
    }
  };

  // Clone the icon and add size classes
  const iconElement = cloneElement(children as ReactElement, {
    className: cn(sizeClasses[size], (children as ReactElement).props?.className)
  });

  return (
    <motion.div
      className={cn(
        "inline-flex items-center justify-center cursor-pointer",
        onClick && "hover:bg-accent hover:text-accent-foreground rounded-md p-1 transition-colors duration-200",
        className
      )}
      onClick={onClick}
      {...getAnimationProps()}
    >
      {iconElement}
    </motion.div>
  );
};

// Preset icon animations
export const BouncyIcon = ({ children, ...props }: Omit<AnimatedIconProps, "animation">) => (
  <AnimatedIcon animation="bounce" {...props}>
    {children}
  </AnimatedIcon>
);

export const SpinningIcon = ({ children, ...props }: Omit<AnimatedIconProps, "animation">) => (
  <AnimatedIcon animation="rotate" {...props}>
    {children}
  </AnimatedIcon>
);

export const PulsingIcon = ({ children, ...props }: Omit<AnimatedIconProps, "animation">) => (
  <AnimatedIcon animation="pulse" {...props}>
    {children}
  </AnimatedIcon>
);

export const ShakingIcon = ({ children, ...props }: Omit<AnimatedIconProps, "animation">) => (
  <AnimatedIcon animation="shake" {...props}>
    {children}
  </AnimatedIcon>
);

// Icon button with multiple animations
export const IconButton = ({
  children,
  variant = "ghost",
  size = "md",
  className = "",
  onClick,
  ...props
}: {
  children: ReactNode;
  variant?: "ghost" | "outline" | "solid";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
} & Omit<AnimatedIconProps, "children" | "size" | "onClick">) => {
  const variantClasses = {
    ghost: "hover:bg-accent hover:text-accent-foreground",
    outline: "border border-border hover:bg-accent hover:text-accent-foreground",
    solid: "bg-primary text-primary-foreground hover:bg-primary/90"
  };

  const sizeClasses = {
    sm: "p-1.5",
    md: "p-2",
    lg: "p-3"
  };

  return (
    <motion.button
      className={cn(
        "rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <AnimatedIcon size={size} {...props}>
        {children}
      </AnimatedIcon>
    </motion.button>
  );
};

// Floating action button with icon
export const FloatingIconButton = ({
  children,
  className = "",
  ...props
}: {
  children: ReactNode;
  className?: string;
} & Omit<AnimatedIconProps, "children">) => (
  <motion.div
    className={cn(
      "fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center cursor-pointer z-50",
      className
    )}
    whileHover={{ scale: 1.1, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
    {...props}
  >
    <AnimatedIcon size="lg" animation="scale">
      {children}
    </AnimatedIcon>
  </motion.div>
);

// Icon with tooltip
export const TooltipIcon = ({
  children,
  tooltip,
  position = "top",
  ...props
}: {
  children: ReactNode;
  tooltip: string;
  position?: "top" | "bottom" | "left" | "right";
} & AnimatedIconProps) => {
  return (
    <motion.div className="relative group">
      <AnimatedIcon {...props}>
        {children}
      </AnimatedIcon>
      
      {/* Tooltip */}
      <motion.div
        className={cn(
          "absolute z-50 px-2 py-1 text-xs bg-background border border-border rounded shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200",
          position === "top" && "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
          position === "bottom" && "top-full left-1/2 transform -translate-x-1/2 mt-2",
          position === "left" && "right-full top-1/2 transform -translate-y-1/2 mr-2",
          position === "right" && "left-full top-1/2 transform -translate-y-1/2 ml-2"
        )}
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        {tooltip}
        
        {/* Arrow */}
        <div
          className={cn(
            "absolute w-2 h-2 bg-background border rotate-45",
            position === "top" && "top-full left-1/2 transform -translate-x-1/2 -mt-1 border-b-0 border-r-0",
            position === "bottom" && "bottom-full left-1/2 transform -translate-x-1/2 -mb-1 border-t-0 border-l-0",
            position === "left" && "left-full top-1/2 transform -translate-y-1/2 -ml-1 border-t-0 border-r-0",
            position === "right" && "right-full top-1/2 transform -translate-y-1/2 -mr-1 border-b-0 border-l-0"
          )}
        />
      </motion.div>
    </motion.div>
  );
}; 