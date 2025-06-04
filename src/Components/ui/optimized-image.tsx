import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  placeholder?: string;
  sizes?: string;
}

export const OptimizedImage = ({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  placeholder,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Generate WebP and fallback sources
  const webpSrc = src.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  const isWebPSupported = typeof window !== 'undefined' && 
    document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;

  const optimizedSrc = isWebPSupported ? webpSrc : src;

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div 
      ref={imgRef}
      className={cn("relative overflow-hidden", className)}
      style={{ 
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto',
        aspectRatio: width && height ? `${width}/${height}` : undefined
      }}
    >
      {/* Placeholder */}
      {!isLoaded && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-muted/20 to-muted/40 flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {placeholder ? (
            <img 
              src={placeholder} 
              alt={alt}
              className="w-full h-full object-cover blur-sm scale-110"
            />
          ) : (
            <motion.div
              className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          )}
        </motion.div>
      )}

      {/* Optimized Image */}
      {(isInView || priority) && (
        <motion.picture
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full"
        >
          {/* WebP source for modern browsers */}
          <source
            srcSet={`${webpSrc} 1x`}
            type="image/webp"
            sizes={sizes}
          />
          
          {/* Fallback for older browsers */}
          <motion.img
            src={hasError ? src : optimizedSrc}
            alt={alt}
            onLoad={handleLoad}
            onError={handleError}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className={cn(
              "w-full h-full object-cover transition-all duration-300",
              isLoaded ? "blur-0 scale-100" : "blur-sm scale-105"
            )}
            style={{
              willChange: "transform, opacity",
              transform: "translateZ(0)" // Force GPU layer
            }}
          />
        </motion.picture>
      )}

      {/* Error fallback */}
      {hasError && (
        <motion.div
          className="absolute inset-0 bg-muted/20 flex items-center justify-center text-muted-foreground text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Failed to load image
        </motion.div>
      )}
    </div>
  );
};

// Utility function to generate responsive image sizes
export const generateImageSizes = (breakpoints: Record<string, number>) => {
  return Object.entries(breakpoints)
    .map(([breakpoint, width]) => `(max-width: ${breakpoint}px) ${width}px`)
    .join(', ');
}; 