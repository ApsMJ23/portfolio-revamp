// Animation utilities for Framer Motion
// Common animation variants used throughout the portfolio

// Animation performance utilities for optimized 60fps animations
import { Variants } from "framer-motion";

// Performance-optimized animation settings
export const performanceSettings = {
  // Use transform instead of layout animations when possible
  layoutDependency: false,
  // Enable GPU acceleration
  willChange: "transform, opacity",
  // Optimize for 60fps
  transition: {
    type: "tween" as const,
    ease: "easeOut" as const,
    duration: 0.3,
  },
};

// Common easing functions optimized for performance
export const easings = {
  smooth: [0.4, 0, 0.2, 1] as [number, number, number, number],
  spring: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
  bounce: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],
};

// Basic fade animations
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
}

export const fadeInUp: Variants = {
  initial: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: easings.smooth,
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: easings.smooth,
    }
  }
};

export const fadeInDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: 0.4, ease: "easeOut" }
}

export const fadeInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
  transition: { duration: 0.4, ease: "easeOut" }
}

export const fadeInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.4, ease: "easeOut" }
}

// Scale animations
export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: { duration: 0.3, ease: "easeOut" }
}

// Stagger animations for lists/grids
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.3,
      ease: easings.smooth,
    }
  }
};

// Button interactions
export const buttonHover = {
  scale: 1.02,
  transition: { duration: 0.2, ease: "easeInOut" }
}

export const buttonTap = {
  scale: 0.98,
  transition: { duration: 0.1 }
}

// Card interactions
export const cardHover = {
  y: -8,
  scale: 1.02,
  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 20,
  }
};

export const cardHoverDark = {
  y: -2,
  boxShadow: "0 4px 12px rgba(255,255,255,0.1)",
  transition: { duration: 0.2, ease: "easeOut" }
}

// Page transitions
export const pageTransition = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.4, ease: "easeInOut" }
}

// Slide animations
export const slideUp = {
  initial: { y: "100%" },
  animate: { y: 0 },
  exit: { y: "100%" },
  transition: { duration: 0.3, ease: "easeOut" }
}

export const slideDown = {
  initial: { y: "-100%" },
  animate: { y: 0 },
  exit: { y: "-100%" },
  transition: { duration: 0.3, ease: "easeOut" }
}

export const slideLeft = {
  initial: { x: "100%" },
  animate: { x: 0 },
  exit: { x: "100%" },
  transition: { duration: 0.3, ease: "easeOut" }
}

export const slideRight = {
  initial: { x: "-100%" },
  animate: { x: 0 },
  exit: { x: "-100%" },
  transition: { duration: 0.3, ease: "easeOut" }
}

// Header scroll animation
export const headerScroll = {
  initial: { 
    backdropFilter: "blur(0px)",
    backgroundColor: "rgba(255, 255, 255, 0)"
  },
  scrolled: {
    backdropFilter: "blur(10px)",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
  },
  transition: { duration: 0.3, ease: "easeOut" }
}

export const headerScrollDark = {
  initial: { 
    backdropFilter: "blur(0px)",
    backgroundColor: "rgba(0, 0, 0, 0)"
  },
  scrolled: {
    backdropFilter: "blur(10px)",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    boxShadow: "0 2px 4px rgba(255,255,255,0.1)"
  },
  transition: { duration: 0.3, ease: "easeOut" }
}

// Loading animations
export const spinnerAnimation: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear",
    }
  }
};

export const pulse = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// Text animations
export const typewriter = {
  initial: { width: 0 },
  animate: { width: "100%" },
  transition: { duration: 2, ease: "easeInOut" }
}

// Progress bar animation
export const progressBar = (progress: number): Variants => ({
  initial: { width: 0 },
  animate: { 
    width: `${progress}%`,
    transition: {
      duration: 1.5,
      ease: easings.smooth,
      delay: 0.5,
    }
  }
});

// Theme toggle animation
export const themeToggle = {
  rotate: { rotate: 180 },
  scale: { scale: 1.1 },
  transition: { duration: 0.3, ease: "easeInOut" }
}

// Celebration animation for puzzle completion
export const celebration = {
  initial: { scale: 0 },
  animate: { 
    scale: [0, 1.2, 1],
    rotate: [0, 10, -10, 0]
  },
  transition: { 
    duration: 0.6, 
    ease: "easeOut",
    times: [0, 0.6, 1]
  }
}

// Modal/Dialog animations
export const modalBackdrop = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 }
}

export const modalContent = {
  initial: { opacity: 0, scale: 0.9, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.9, y: 20 },
  transition: { duration: 0.3, ease: "easeOut" }
}

// Navigation menu animations
export const menuItem = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.2, ease: "easeOut" }
}

export const mobileMenu = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.2, ease: "easeOut" }
}

// Scroll-triggered animations (for use with intersection observer)
export const scrollReveal: Variants = {
  initial: { 
    opacity: 0, 
    y: 50,
    scale: 0.9
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easings.smooth,
    }
  }
};

export const scrollRevealStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

// Utility function to create spring animations
export const springTransition = (stiffness = 300, damping = 30) => ({
  type: "spring",
  stiffness,
  damping
})

// Utility function to create custom easing
export const customEasing = [0.4, 0, 0.2, 1] // Material Design easing 

// Slide animations
export const slideInLeft: Variants = {
  initial: { x: -100, opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: easings.smooth,
    }
  },
  exit: { 
    x: -100, 
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: easings.smooth,
    }
  }
};

export const slideInRight: Variants = {
  initial: { x: 100, opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: easings.smooth,
    }
  },
  exit: { 
    x: 100, 
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: easings.smooth,
    }
  }
};

// Performance-optimized viewport settings
export const viewportSettings = {
  once: true,
  margin: "-50px",
  amount: 0.3,
};

// Performance monitoring utility
export const animationConfig = {
  // Enable hardware acceleration
  style: {
    willChange: "transform, opacity",
    transform: "translateZ(0)", // Force GPU layer
  },
  // Optimize for 60fps
  transition: {
    duration: 0.3,
    ease: easings.smooth,
  },
  // Reduce motion for accessibility
  whileInView: {
    viewport: viewportSettings,
  },
};

// Reduced motion variants (for accessibility)
export const reducedMotionSettings = {
  transition: { duration: 0.01 },
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

// Text reveal animation (for typewriter effect)
export const textReveal: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
      ease: easings.smooth,
    }
  })
}; 