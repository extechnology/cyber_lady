import { motion } from "motion/react";

interface LoaderProps {
  fullScreen?: boolean;
  text?: string;
  className?: string;
}

export function Loader({ fullScreen = false, text = "Loading", className = "" }: LoaderProps) {
  const containerClasses = fullScreen
    ? `fixed inset-0 z-50 flex flex-col items-center justify-center bg-cream/90 backdrop-blur-md ${className}`
    : `flex w-full flex-col items-center justify-center py-12 ${className}`;

  return (
    <div className={containerClasses}>
      <div className="relative flex flex-col items-center">
        {/* Animated Rings */}
        <div className="relative h-16 w-16 md:h-20 md:w-20">
          <motion.div
            className="absolute inset-0 rounded-full border border-accent/20 border-t-accent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-2 rounded-full border border-ink/10 border-b-ink"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-4 rounded-full border border-accent/10 border-l-accent"
            animate={{ rotate: 360 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Center Dot */}
          <motion.div
            className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink"
            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        {/* Loading Text */}
        {text && (
          <motion.div
            className="mt-8 flex items-center gap-1 text-[11px] uppercase tracking-[0.3em] text-muted-foreground"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span>{text}</span>
            <span className="flex w-4">
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
              >
                .
              </motion.span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              >
                .
              </motion.span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
              >
                .
              </motion.span>
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
