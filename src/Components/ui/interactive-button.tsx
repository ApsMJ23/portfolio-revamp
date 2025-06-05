import { motion, AnimatePresence } from "framer-motion";
import { useState, ReactNode } from "react";
import { Loader2, Check, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  loadingText?: string;
  successText?: string;
  errorText?: string;
  ripple?: boolean;
  magnetic?: boolean;
  glow?: boolean;
  className?: string;
  onClick?: () => void | Promise<void>;
  disabled?: boolean;
}

export const InteractiveButton = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  isSuccess = false,
  isError = false,
  loadingText = "Loading...",
  successText = "Success!",
  errorText = "Error",
  ripple = true,
  magnetic = false,
  glow = false,
  className = "",
  onClick,
  disabled = false
}: InteractiveButtonProps) => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || isLoading) return;
    
    // Create ripple effect
    if (ripple) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newRipple = { id: Date.now(), x, y };
      
      setRipples(prev => [...prev, newRipple]);
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 600);
    }

    if (onClick) {
      await onClick();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePosition({ x: x * 0.1, y: y * 0.1 });
  };

  const handleMouseLeave = () => {
    if (magnetic) {
      setMousePosition({ x: 0, y: 0 });
    }
  };

  const getVariantClasses = () => {
    const variants = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90"
    };
    return variants[variant];
  };

  const getSizeClasses = () => {
    const sizes = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4",
      lg: "h-12 px-6 text-lg",
      xl: "h-14 px-8 text-xl"
    };
    return sizes[size];
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { type: "spring", stiffness: 400, damping: 17 }
    },
    tap: { scale: 0.95 },
    loading: {
      scale: 1,
      transition: { type: "spring", stiffness: 400, damping: 17 }
    }
  };

  const contentVariants = {
    idle: { opacity: 1, y: 0 },
    loading: { opacity: 0, y: -10 },
    success: { opacity: 0, y: 10 },
    error: { opacity: 0, y: 10 }
  };

  const statusVariants = {
    loading: { opacity: 1, y: 0 },
    success: { opacity: 1, y: 0 },
    error: { opacity: 1, y: 0 },
    idle: { opacity: 0, y: 10 }
  };

  const getCurrentStatus = () => {
    if (isLoading) return "loading";
    if (isSuccess) return "success";
    if (isError) return "error";
    return "idle";
  };

  const getStatusIcon = () => {
    if (isLoading) return <Loader2 className="w-4 h-4 animate-spin" />;
    if (isSuccess) return <Check className="w-4 h-4" />;
    if (isError) return <X className="w-4 h-4" />;
    return null;
  };

  const getStatusText = () => {
    if (isLoading) return loadingText;
    if (isSuccess) return successText;
    if (isError) return errorText;
    return children;
  };

  return (
    <motion.button
      className={cn(
        "relative inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 overflow-hidden",
        getVariantClasses(),
        getSizeClasses(),
        glow && "shadow-lg shadow-primary/25",
        className
      )}
      variants={buttonVariants}
      initial="idle"
      whileHover={!disabled && !isLoading ? "hover" : "idle"}
      whileTap={!disabled && !isLoading ? "tap" : "idle"}
      animate={getCurrentStatus()}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      disabled={disabled || isLoading}
      style={{
        x: mousePosition.x,
        y: mousePosition.y
      }}
    >
      {/* Glow effect */}
      {glow && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-md"
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [0.98, 1.02, 0.98]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Ripple effects */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute bg-white/20 rounded-full pointer-events-none"
            initial={{
              width: 0,
              height: 0,
              x: ripple.x,
              y: ripple.y,
              opacity: 1
            }}
            animate={{
              width: 100,
              height: 100,
              x: ripple.x - 50,
              y: ripple.y - 50,
              opacity: 0
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* Button content */}
      <div className="relative flex items-center space-x-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={getCurrentStatus()}
            variants={getCurrentStatus() === "idle" ? contentVariants : statusVariants}
            initial="idle"
            animate={getCurrentStatus()}
            exit="idle"
            className="flex items-center space-x-2"
          >
            {getStatusIcon()}
            <span>{getStatusText()}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Background shimmer effect for loading */}
      {isLoading && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      )}
    </motion.button>
  );
};

// Preset button variants
export const CoolButton = ({ children, ...props }: Omit<InteractiveButtonProps, "magnetic" | "glow" | "ripple">) => (
  <InteractiveButton magnetic glow ripple {...props}>
    {children}
  </InteractiveButton>
);

export const LoadingButton = ({ children, ...props }: InteractiveButtonProps) => (
  <InteractiveButton ripple {...props}>
    {children}
  </InteractiveButton>
);

export const FloatingActionButton = ({ 
  children, 
  className = "",
  ...props 
}: InteractiveButtonProps) => (
  <InteractiveButton
    variant="primary"
    size="lg"
    magnetic
    glow
    ripple
    className={cn("rounded-full w-16 h-16 fixed bottom-8 right-8 z-50 shadow-2xl", className)}
    {...props}
  >
    {children}
  </InteractiveButton>
);

// Animated icon button
export const IconButton = ({ 
  icon, 
  children, 
  direction = "right",
  ...props 
}: InteractiveButtonProps & { 
  icon?: ReactNode; 
  direction?: "left" | "right" | "up" | "down" 
}) => {
  const getIconAnimation = () => {
    switch (direction) {
      case "left": return { x: -5 };
      case "right": return { x: 5 };
      case "up": return { y: -5 };
      case "down": return { y: 5 };
      default: return { x: 5 };
    }
  };

  return (
    <InteractiveButton ripple {...props}>
      <motion.div 
        className="flex items-center space-x-2"
        whileHover={{ 
          gap: direction === "left" ? "0.25rem" : "0.75rem"
        }}
      >
        {direction === "left" && icon && (
          <motion.div whileHover={getIconAnimation()}>
            {icon}
          </motion.div>
        )}
        <span>{children}</span>
        {direction !== "left" && (icon || <ArrowRight className="w-4 h-4" />)}
        {direction !== "left" && (
          <motion.div whileHover={getIconAnimation()}>
            {icon || <ArrowRight className="w-4 h-4" />}
          </motion.div>
        )}
      </motion.div>
    </InteractiveButton>
  );
}; 