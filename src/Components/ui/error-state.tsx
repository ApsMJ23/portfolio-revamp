import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, RefreshCw, Home, ArrowLeft, Wifi, WifiOff } from "lucide-react";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  type?: "network" | "404" | "500" | "timeout" | "generic";
  title?: string;
  message?: string;
  onRetry?: () => void;
  onGoHome?: () => void;
  onGoBack?: () => void;
  isRetrying?: boolean;
  className?: string;
  showActions?: boolean;
}

const ErrorState = ({
  type = "generic",
  title,
  message,
  onRetry,
  onGoHome,
  onGoBack,
  isRetrying = false,
  className,
  showActions = true
}: ErrorStateProps) => {
  const errorConfigs = {
    network: {
      icon: <WifiOff className="w-16 h-16" />,
      defaultTitle: "Connection Lost",
      defaultMessage: "Unable to connect to the server. Please check your internet connection and try again.",
      iconColor: "text-orange-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20"
    },
    404: {
      icon: <AlertTriangle className="w-16 h-16" />,
      defaultTitle: "Page Not Found",
      defaultMessage: "The page you're looking for doesn't exist or has been moved.",
      iconColor: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/20"
    },
    500: {
      icon: <AlertTriangle className="w-16 h-16" />,
      defaultTitle: "Server Error",
      defaultMessage: "Something went wrong on our end. We're working to fix it.",
      iconColor: "text-red-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20"
    },
    timeout: {
      icon: <RefreshCw className="w-16 h-16" />,
      defaultTitle: "Request Timeout",
      defaultMessage: "The request took too long to complete. Please try again.",
      iconColor: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20"
    },
    generic: {
      icon: <AlertTriangle className="w-16 h-16" />,
      defaultTitle: "Something went wrong",
      defaultMessage: "An unexpected error occurred. Please try again.",
      iconColor: "text-muted-foreground",
      bgColor: "bg-muted/10",
      borderColor: "border-muted/20"
    }
  };

  const config = errorConfigs[type];
  const displayTitle = title || config.defaultTitle;
  const displayMessage = message || config.defaultMessage;

  const containerVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.2
      }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const shakeVariants = {
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn("flex items-center justify-center min-h-[400px] p-4", className)}
    >
      <Card className={cn("max-w-lg w-full text-center", config.bgColor, config.borderColor)}>
        <CardHeader className="pb-4">
          {/* Error Icon */}
          <motion.div
            variants={iconVariants}
            className="flex justify-center mb-4"
          >
            <motion.div
              className={cn("p-4 rounded-full", config.bgColor, config.iconColor)}
              animate={type === "network" ? "pulse" : undefined}
              variants={pulseVariants}
            >
              {config.icon}
            </motion.div>
          </motion.div>

          {/* Error Type Badge */}
          <motion.div variants={itemVariants} className="flex justify-center mb-2">
            <Badge variant="secondary" className={cn(config.bgColor, config.iconColor, "border-0")}>
              {type.toUpperCase()} ERROR
            </Badge>
          </motion.div>

          {/* Title */}
          <motion.div variants={itemVariants}>
            <CardTitle className="text-2xl font-bold text-foreground">
              {displayTitle}
            </CardTitle>
          </motion.div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Message */}
          <motion.p
            variants={itemVariants}
            className="text-muted-foreground leading-relaxed"
          >
            {displayMessage}
          </motion.p>

          {/* Actions */}
          {showActions && (
            <motion.div variants={itemVariants} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {onRetry && (
                  <Button
                    onClick={onRetry}
                    disabled={isRetrying}
                    className="group relative overflow-hidden"
                    size="lg"
                  >
                    <motion.div
                      className="flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      animate={isRetrying ? "shake" : undefined}
                      variants={shakeVariants}
                    >
                      <motion.div
                        animate={isRetrying ? { rotate: 360 } : { rotate: 0 }}
                        transition={{ 
                          duration: isRetrying ? 1 : 0.3, 
                          repeat: isRetrying ? Infinity : 0,
                          ease: "linear"
                        }}
                      >
                        <RefreshCw className="w-4 h-4" />
                      </motion.div>
                      <span>{isRetrying ? "Retrying..." : "Try Again"}</span>
                    </motion.div>
                  </Button>
                )}

                {onGoBack && (
                  <Button
                    onClick={onGoBack}
                    variant="outline"
                    size="lg"
                    className="group"
                  >
                    <motion.div
                      className="flex items-center space-x-2"
                      whileHover={{ scale: 1.05, x: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                      <span>Go Back</span>
                    </motion.div>
                  </Button>
                )}
              </div>

              {onGoHome && (
                <div className="flex justify-center">
                  <Button
                    onClick={onGoHome}
                    variant="ghost"
                    size="sm"
                    className="group text-muted-foreground hover:text-foreground"
                  >
                    <motion.div
                      className="flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Home className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                      <span>Return Home</span>
                    </motion.div>
                  </Button>
                </div>
              )}
            </motion.div>
          )}

          {/* Network Status Indicator */}
          {type === "network" && (
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center space-x-2 text-sm text-muted-foreground"
            >
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Wifi className="w-4 h-4" />
              </motion.div>
              <span>Checking connection...</span>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Preset error components for common scenarios
const NetworkError = (props: Omit<ErrorStateProps, "type">) => (
  <ErrorState type="network" {...props} />
);

const NotFoundError = (props: Omit<ErrorStateProps, "type">) => (
  <ErrorState type="404" {...props} />
);

const ServerError = (props: Omit<ErrorStateProps, "type">) => (
  <ErrorState type="500" {...props} />
);

const TimeoutError = (props: Omit<ErrorStateProps, "type">) => (
  <ErrorState type="timeout" {...props} />
);

// Error boundary wrapper component
interface ErrorBoundaryFallbackProps {
  error: Error;
  resetError: () => void;
}

const ErrorBoundaryFallback = ({ error, resetError }: ErrorBoundaryFallbackProps) => (
  <ErrorState
    type="500"
    title="Application Error"
    message={`Something went wrong: ${error.message}`}
    onRetry={resetError}
    onGoHome={() => window.location.href = '/home'}
  />
);

export {
  ErrorState,
  NetworkError,
  NotFoundError,
  ServerError,
  TimeoutError,
  ErrorBoundaryFallback
}; 