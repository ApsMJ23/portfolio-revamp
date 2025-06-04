
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, ExternalLink } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Separator } from '@/Components/ui/separator';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/apsmj23/',
      icon: Linkedin,
      color: 'hover:text-blue-600'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/apurvsingh-ap',
      icon: Github,
      color: 'hover:text-gray-800 dark:hover:text-gray-300'
    },
    {
      name: 'Email',
      url: 'mailto:apurv.singh.ap@gmail.com',
      icon: Mail,
      color: 'hover:text-green-600'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const socialIconVariants = {
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  return (
    <motion.footer
      className="relative bg-background/50 border-t border-border mt-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-muted/20 to-transparent pointer-events-none" />
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="text-center md:text-left">
            <motion.h3 
              className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Apurv Singh
            </motion.h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Passionate developer crafting digital experiences with modern technologies and creative solutions.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="text-center">
            <h4 className="text-lg font-semibold mb-4 text-foreground">Quick Links</h4>
            <nav className="space-y-2">
              {[
                { label: 'Home', href: '#home' },
                { label: 'Projects', href: '#projects' },
                { label: 'About', href: '#about' },
                { label: 'Contact', href: '#contact' }
              ].map((link) => (
                <motion.div key={link.href}>
                  <motion.a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm block"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.label}
                  </motion.a>
                </motion.div>
              ))}
            </nav>
          </motion.div>

          {/* Connect Section */}
          <motion.div variants={itemVariants} className="text-center md:text-right">
            <h4 className="text-lg font-semibold mb-4 text-foreground">Let's Connect</h4>
            <div className="flex justify-center md:justify-end space-x-4 mb-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <motion.div key={social.name}>
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                      className="h-10 w-10"
                    >
                      <motion.a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        className={`text-muted-foreground transition-colors duration-200 ${social.color}`}
                        variants={socialIconVariants}
                        whileHover="hover"
                        whileTap={{ scale: 0.9 }}
                      >
                        <IconComponent className="h-5 w-5" />
                      </motion.a>
                    </Button>
                  </motion.div>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              Feel free to reach out for collaborations!
            </p>
          </motion.div>
        </div>

        <Separator className="mb-6" />

        {/* Bottom Section */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left space-y-4 sm:space-y-0"
        >
          <motion.div 
            className="flex items-center space-x-1 text-sm text-muted-foreground"
            whileHover={{ scale: 1.05 }}
          >
            <span>© {currentYear} Made with</span>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              <Heart className="h-4 w-4 text-red-500 fill-current" />
            </motion.div>
            <span>by Apurv Singh</span>
          </motion.div>

          <motion.div 
            className="flex items-center space-x-4 text-xs text-muted-foreground"
            variants={itemVariants}
          >
            <motion.a
              href="https://github.com/apurvsingh-ap/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 hover:text-foreground transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
            >
              <span>View Source</span>
              <ExternalLink className="h-3 w-3" />
            </motion.a>
            <span>•</span>
            <span>Built with React & TypeScript</span>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;