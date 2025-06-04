import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "default" | "circular" | "rectangular" | "text";
  animation?: "pulse" | "wave" | "shimmer";
  width?: string | number;
  height?: string | number;
  style?: React.CSSProperties;
}

const Skeleton = ({ 
  className, 
  variant = "default", 
  animation = "shimmer",
  width,
  height,
  style
}: SkeletonProps) => {
  const animationVariants = {
    pulse: {
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    wave: {
      x: ["-100%", "100%"],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    shimmer: {
      backgroundPosition: ["200% 0", "-200% 0"],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const variantClasses = {
    default: "rounded-md",
    circular: "rounded-full",
    rectangular: "rounded-none",
    text: "rounded-sm"
  };

  const getSkeletonStyle = () => {
    const baseStyle = {
      width: width || "100%",
      height: height || (variant === "text" ? "1rem" : "1.5rem"),
      ...style
    };

    if (animation === "shimmer") {
      return {
        ...baseStyle,
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
        backgroundSize: "200% 100%",
      };
    }

    return baseStyle;
  };

  return (
    <motion.div
      className={cn(
        "bg-muted/50 relative overflow-hidden",
        variantClasses[variant],
        className
      )}
      style={getSkeletonStyle()}
      animate={animation === "shimmer" ? animationVariants.shimmer : animationVariants[animation]}
    >
      {animation === "wave" && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={animationVariants.wave}
        />
      )}
    </motion.div>
  );
};

// Preset skeleton components for common use cases
const SkeletonCard = ({ className, ...props }: SkeletonProps) => (
  <div className={cn("space-y-3 p-4", className)} {...props}>
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-3 w-1/2" />
    <div className="space-y-2">
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
    </div>
  </div>
);

const SkeletonAvatar = ({ className, ...props }: SkeletonProps) => (
  <Skeleton
    variant="circular"
    className={cn("h-10 w-10", className)}
    {...props}
  />
);

const SkeletonButton = ({ className, ...props }: SkeletonProps) => (
  <Skeleton
    className={cn("h-10 w-24 rounded-md", className)}
    {...props}
  />
);

const SkeletonText = ({ 
  lines = 3, 
  className, 
  ...props 
}: SkeletonProps & { lines?: number }) => (
  <div className={cn("space-y-2", className)} {...props}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        variant="text"
        className={`h-3 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
      />
    ))}
  </div>
);

const SkeletonCodeBlock = ({ className, ...props }: SkeletonProps) => (
  <div className={cn("space-y-2 p-4 bg-muted/20 rounded-lg border", className)} {...props}>
    <div className="flex items-center space-x-2 mb-3">
      <Skeleton variant="circular" className="h-3 w-3" />
      <Skeleton variant="circular" className="h-3 w-3" />
      <Skeleton variant="circular" className="h-3 w-3" />
    </div>
    {Array.from({ length: 8 }).map((_, i) => (
      <Skeleton
        key={i}
        variant="text"
        className={`h-4 ${
          i === 0 ? 'w-1/4' : 
          i === 1 ? 'w-3/4' : 
          i === 2 ? 'w-1/2' : 
          i === 7 ? 'w-2/3' : 'w-full'
        }`}
      />
    ))}
  </div>
);

const SkeletonProjectCard = ({ className, ...props }: SkeletonProps) => (
  <motion.div 
    className={cn("space-y-4 p-6 border rounded-lg", className)}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    {...props}
  >
    {/* Header */}
    <div className="space-y-2">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
    
    {/* Features list */}
    <div className="space-y-2">
      <Skeleton className="h-4 w-20" />
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-2">
          <Skeleton variant="circular" className="h-2 w-2" />
          <Skeleton className="h-3 w-4/5" />
        </div>
      ))}
    </div>
    
    {/* Tech stack */}
    <div className="space-y-2">
      <Skeleton className="h-4 w-24" />
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-16 rounded-full" />
        ))}
      </div>
    </div>
    
    {/* Button */}
    <SkeletonButton className="w-full" />
  </motion.div>
);

export { 
  Skeleton, 
  SkeletonCard, 
  SkeletonAvatar, 
  SkeletonButton, 
  SkeletonText, 
  SkeletonCodeBlock,
  SkeletonProjectCard
};
