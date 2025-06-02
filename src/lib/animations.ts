// Animation utilities for Framer Motion
// Common animation variants used throughout the portfolio

// Basic fade animations
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
}

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: "easeOut" }
}

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
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" }
}

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
  y: -2,
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  transition: { duration: 0.2, ease: "easeOut" }
}

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
export const spinner = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
}

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
export const progressBar = (progress: number) => ({
  initial: { width: 0 },
  animate: { width: `${progress}%` },
  transition: { duration: 1, ease: "easeOut", delay: 0.2 }
})

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
export const scrollReveal = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

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