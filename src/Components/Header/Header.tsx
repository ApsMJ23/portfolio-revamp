import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 w-full px-4 md:px-8 py-4 flex justify-between items-center z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.div 
        className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        Portfolio
      </motion.div>
      
      <nav>
        <motion.ul 
          className="flex list-none gap-8 m-0 p-0"
          variants={{
            initial: {},
            animate: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="initial"
          animate="animate"
        >
          {[
            { href: "#home", label: "Home" },
            { href: "#projects", label: "Projects" },
            { href: "#about", label: "About" }
          ].map((item, index) => (
            <motion.li
              key={item.href}
              variants={{
                initial: { opacity: 0, y: -20 },
                animate: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <motion.a
                href={item.href}
                className="text-foreground/80 hover:text-foreground transition-colors duration-200 font-medium relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            </motion.li>
          ))}
        </motion.ul>
      </nav>
    </motion.header>
  );
};

export default Header; 