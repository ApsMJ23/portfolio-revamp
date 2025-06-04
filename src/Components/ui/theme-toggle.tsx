import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Sun, Moon, Monitor, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark" | "system";

interface ThemeToggleProps {
  variant?: "button" | "switch" | "slider" | "floating";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
  onThemeChange?: (theme: Theme) => void;
}

export const AnimatedThemeToggle = ({
  variant = "button",
  size = "md",
  showLabel = false,
  className = "",
  onThemeChange
}: ThemeToggleProps) => {
  const [theme, setTheme] = useState<Theme>("system");
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Check system preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    onThemeChange?.(newTheme);
    
    // Apply theme to document
    const root = document.documentElement;
    if (newTheme === "system") {
      root.setAttribute("data-theme", systemTheme);
    } else {
      root.setAttribute("data-theme", newTheme);
    }
  };

  const getCurrentTheme = () => {
    return theme === "system" ? systemTheme : theme;
  };

  const themes = [
    { name: "light" as const, icon: Sun, label: "Light" },
    { name: "dark" as const, icon: Moon, label: "Dark" },
    { name: "system" as const, icon: Monitor, label: "System" }
  ];

  // Button variant
  if (variant === "button") {
    const sizeClasses = {
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-12 w-12"
    };

    return (
      <motion.button
        className={cn(
          "relative rounded-full border border-border bg-background shadow-sm transition-colors hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring",
          sizeClasses[size],
          className
        )}
        onClick={() => {
          const currentIndex = themes.findIndex(t => t.name === theme);
          const nextTheme = themes[(currentIndex + 1) % themes.length];
          handleThemeChange(nextTheme.name);
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ opacity: 0, rotate: -180, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 180, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex items-center justify-center w-full h-full"
          >
            {theme === "light" && <Sun className="w-4 h-4" />}
            {theme === "dark" && <Moon className="w-4 h-4" />}
            {theme === "system" && <Monitor className="w-4 h-4" />}
          </motion.div>
        </AnimatePresence>
        
        {showLabel && (
          <motion.span 
            className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 text-xs bg-background border border-border rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {themes.find(t => t.name === theme)?.label}
          </motion.span>
        )}
      </motion.button>
    );
  }

  // Switch variant
  if (variant === "switch") {
    const isDark = getCurrentTheme() === "dark";
    
    return (
      <motion.button
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          isDark ? "bg-primary" : "bg-muted",
          className
        )}
        onClick={() => handleThemeChange(isDark ? "light" : "dark")}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="inline-block h-4 w-4 transform rounded-full bg-background shadow-lg transition-transform flex items-center justify-center"
          animate={{
            x: isDark ? 20 : 0,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isDark ? "dark" : "light"}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.15 }}
            >
              {isDark ? (
                <Moon className="w-2 h-2" />
              ) : (
                <Sun className="w-2 h-2" />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.button>
    );
  }

  // Slider variant
  if (variant === "slider") {
    return (
      <div className={cn("flex items-center space-x-1 bg-muted rounded-full p-1", className)}>
        {themes.map((t) => {
          const Icon = t.icon;
          const isActive = t.name === theme;
          
          return (
            <motion.button
              key={t.name}
              className={cn(
                "relative flex items-center justify-center w-8 h-8 rounded-full transition-colors",
                isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => handleThemeChange(t.name)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-primary rounded-full"
                  layoutId="activeTheme"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <motion.div 
                className="relative z-10"
                animate={{ 
                  rotate: isActive ? [0, 10, -10, 0] : 0 
                }}
                transition={{ duration: 0.3 }}
              >
                <Icon className="w-4 h-4" />
              </motion.div>
            </motion.button>
          );
        })}
      </div>
    );
  }

  // Floating variant
  if (variant === "floating") {
    return (
      <motion.div
        className={cn(
          "fixed bottom-20 right-6 z-50 bg-background border border-border rounded-full p-2 shadow-lg",
          className
        )}
        initial={{ opacity: 0, scale: 0, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 1 }}
        whileHover={{ scale: 1.05 }}
      >
        <div className="flex items-center space-x-1">
          {themes.map((t) => {
            const Icon = t.icon;
            const isActive = t.name === theme;
            
            return (
              <motion.button
                key={t.name}
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full transition-colors",
                  isActive ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                )}
                onClick={() => handleThemeChange(t.name)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.div
                  animate={{ 
                    rotate: isActive ? 360 : 0,
                    scale: isActive ? [1, 1.2, 1] : 1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    );
  }

  return null;
};

// Theme transition overlay
export const ThemeTransition = ({ 
  isTransitioning,
  fromTheme,
  toTheme 
}: {
  isTransitioning: boolean;
  fromTheme?: Theme;
  toTheme?: Theme;
}) => {
  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          className="fixed inset-0 z-[9999] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Radial transition effect */}
          <motion.div
            className={cn(
              "absolute inset-0",
              toTheme === "dark" ? "bg-background" : "bg-white"
            )}
            initial={{ 
              clipPath: "circle(0% at 50% 50%)" 
            }}
            animate={{ 
              clipPath: "circle(150% at 50% 50%)" 
            }}
            transition={{ 
              duration: 0.8,
              ease: "easeInOut"
            }}
          />
          
          {/* Theme icon overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <motion.div
              className="text-6xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, ease: "linear" }}
            >
              {toTheme === "dark" ? "🌙" : toTheme === "light" ? "☀️" : "💻"}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Preset theme toggles
export const SimpleThemeToggle = () => (
  <AnimatedThemeToggle variant="button" size="md" />
);

export const SwitchThemeToggle = () => (
  <AnimatedThemeToggle variant="switch" />
);

export const SliderThemeToggle = () => (
  <AnimatedThemeToggle variant="slider" />
);

export const FloatingThemeToggle = () => (
  <AnimatedThemeToggle variant="floating" />
); 