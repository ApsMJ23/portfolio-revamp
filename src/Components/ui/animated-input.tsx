import { motion, AnimatePresence } from "framer-motion";
import { useState, forwardRef, ReactNode } from "react";
import { Eye, EyeOff, Check, X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  helperText?: string;
  icon?: ReactNode;
  variant?: "default" | "floating" | "underline" | "filled";
  validationState?: "idle" | "validating" | "success" | "error";
  showPasswordToggle?: boolean;
}

export const AnimatedInput = forwardRef<HTMLInputElement, AnimatedInputProps>(
  ({
    label,
    error,
    success,
    helperText,
    icon,
    variant = "default",
    validationState = "idle",
    showPasswordToggle = false,
    className,
    type,
    ...props
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [hasValue, setHasValue] = useState(!!props.value || !!props.defaultValue);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value.length > 0);
      props.onChange?.(e);
    };

    const inputType = showPasswordToggle ? (showPassword ? "text" : "password") : type;

    const getValidationIcon = () => {
      switch (validationState) {
        case "validating":
          return (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full" />
            </motion.div>
          );
        case "success":
          return <Check className="w-4 h-4 text-green-500" />;
        case "error":
          return <X className="w-4 h-4 text-red-500" />;
        default:
          return null;
      }
    };

    const getInputClasses = () => {
      const baseClasses = "w-full transition-all duration-200 focus:outline-none";
      
      const variantClasses = {
        default: `
          border rounded-md px-3 py-2 bg-background
          ${isFocused ? 'border-primary shadow-sm' : 'border-border'}
          ${error ? 'border-red-500' : ''}
          ${success ? 'border-green-500' : ''}
        `,
        floating: `
          border-b-2 border-t-0 border-l-0 border-r-0 bg-transparent px-0 pb-1 pt-6 rounded-none
          ${isFocused ? 'border-primary' : 'border-border'}
          ${error ? 'border-red-500' : ''}
          ${success ? 'border-green-500' : ''}
        `,
        underline: `
          border-b-2 border-t-0 border-l-0 border-r-0 bg-transparent px-0 py-2 rounded-none
          ${isFocused ? 'border-primary' : 'border-border'}
          ${error ? 'border-red-500' : ''}
          ${success ? 'border-green-500' : ''}
        `,
        filled: `
          border border-transparent rounded-md px-3 py-2 bg-muted
          ${isFocused ? 'bg-background border-primary shadow-sm' : ''}
          ${error ? 'border-red-500 bg-red-50 dark:bg-red-950' : ''}
          ${success ? 'border-green-500 bg-green-50 dark:bg-green-950' : ''}
        `
      };

      return cn(baseClasses, variantClasses[variant]);
    };

    const getLabelClasses = () => {
      if (variant === "floating") {
        return cn(
          "absolute left-0 transition-all duration-200 pointer-events-none text-muted-foreground",
          isFocused || hasValue
            ? "text-xs top-1 text-primary"
            : "text-sm top-4"
        );
      }
      
      return "block text-sm font-medium mb-2 text-foreground";
    };

    return (
      <div className="space-y-2">
        {/* Label for non-floating variants */}
        {label && variant !== "floating" && (
          <motion.label
            className={getLabelClasses()}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {label}
          </motion.label>
        )}

        {/* Input container */}
        <motion.div 
          className={cn(
            "relative",
            variant === "floating" ? "mt-6" : ""
          )}
          whileFocus={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Icon */}
          {icon && (
            <motion.div
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              animate={{ 
                color: isFocused ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
                scale: isFocused ? 1.1 : 1
              }}
              transition={{ duration: 0.2 }}
            >
              {icon}
            </motion.div>
          )}

          {/* Floating label */}
          {label && variant === "floating" && (
            <motion.label
              className={getLabelClasses()}
              animate={{
                y: isFocused || hasValue ? -20 : 0,
                scale: isFocused || hasValue ? 0.85 : 1,
                color: isFocused ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              {label}
            </motion.label>
          )}

          {/* Input field */}
          <input
            ref={ref}
            type={inputType}
            className={cn(
              getInputClasses(),
              icon && variant !== "floating" && variant !== "underline" ? "pl-10" : "",
              (showPasswordToggle || validationState !== "idle") ? "pr-10" : "",
              className
            )}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            {...props}
          />

          {/* Validation icon and password toggle */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            <AnimatePresence>
              {validationState !== "idle" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {getValidationIcon()}
                </motion.div>
              )}
            </AnimatePresence>

            {showPasswordToggle && (
              <motion.button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-foreground hover:text-foreground"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </motion.button>
            )}
          </div>

          {/* Focus ring animation */}
          <AnimatePresence>
            {isFocused && (
              <motion.div
                className="absolute inset-0 rounded-md border-2 border-primary pointer-events-none"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 0.5, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Helper text, error, or success message */}
        <AnimatePresence mode="wait">
          {(error || success || helperText) && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "text-xs flex items-center space-x-1",
                error ? "text-red-500" : success ? "text-green-500" : "text-muted-foreground"
              )}
            >
              {error && <AlertCircle className="w-3 h-3" />}
              {success && <Check className="w-3 h-3" />}
              <span>{error || success || helperText}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

AnimatedInput.displayName = "AnimatedInput";

// Form container with validation animations
export const AnimatedForm = ({ 
  children, 
  onSubmit,
  className = "" 
}: {
  children: ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  className?: string;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (onSubmit) {
      await onSubmit(e);
    }
    
    setTimeout(() => setIsSubmitting(false), 1000);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={cn("space-y-6", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
    >
      <motion.div
        className="space-y-4"
        variants={{
          visible: {
            transition: { staggerChildren: 0.1 }
          }
        }}
        initial="hidden"
        animate="visible"
      >
        {children}
      </motion.div>
      
      {isSubmitting && (
        <motion.div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-card p-6 rounded-lg shadow-lg"
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
              </motion.div>
              <span>Submitting form...</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.form>
  );
};

// Preset input variants
export const FloatingInput = (props: AnimatedInputProps) => (
  <AnimatedInput variant="floating" {...props} />
);

export const UnderlineInput = (props: AnimatedInputProps) => (
  <AnimatedInput variant="underline" {...props} />
);

export const FilledInput = (props: AnimatedInputProps) => (
  <AnimatedInput variant="filled" {...props} />
); 