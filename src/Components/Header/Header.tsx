import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/Components/ui/sheet';
import { Button } from '@/Components/ui/button';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navigationItems = [
    { href: "#home", label: "Home" },
    { href: "#projects", label: "Projects" },
    { href: "#about", label: "About" }
  ];

  const handleMobileNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
      {/* Logo */}
      <motion.div 
        className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        Portfolio
      </motion.div>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:block">
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
          {navigationItems.map((item, index) => (
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

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10"
              aria-label="Open mobile menu"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Menu className="h-6 w-6" />
              </motion.div>
            </Button>
          </SheetTrigger>
          
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle className="text-left">Navigation</SheetTitle>
            </SheetHeader>
            
            <nav className="mt-8">
              <ul className="space-y-4">
                {navigationItems.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <SheetClose asChild>
                      <motion.a
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleMobileNavClick(item.href);
                        }}
                        className="block text-lg font-medium text-foreground/80 hover:text-foreground transition-colors duration-200 py-2 px-4 rounded-md hover:bg-accent"
                        whileHover={{ x: 8 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {item.label}
                      </motion.a>
                    </SheetClose>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Additional mobile menu content */}
            <div className="mt-8 pt-8 border-t border-border">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <p className="text-sm text-muted-foreground">
                  Thanks for visiting my portfolio
                </p>
              </motion.div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
};

export default Header; 