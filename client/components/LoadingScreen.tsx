import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= 100) {
      const timer = setTimeout(() => {
        onComplete();
      }, 400);
      return () => clearTimeout(timer);
    }

    const timer = setInterval(() => {
      setCount((prev) => {
        const next = prev + Math.random() * 30;
        return next > 100 ? 100 : next;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [count, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={
        count >= 100
          ? {
              opacity: 1,
            }
          : {}
      }
      exit={{
        opacity: 0,
        transition: { duration: 0.6 },
      }}
      className="fixed inset-0 bg-background z-50 flex items-center justify-center overflow-hidden"
    >
      {/* Left split */}
      <motion.div
        initial={{ x: 0 }}
        animate={count >= 100 ? { x: "-100vw" } : { x: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        className="absolute left-0 top-0 w-1/2 h-full bg-background"
      />

      {/* Right split */}
      <motion.div
        initial={{ x: 0 }}
        animate={count >= 100 ? { x: "100vw" } : { x: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        className="absolute right-0 top-0 w-1/2 h-full bg-background"
      />

      {/* Counter */}
      <motion.div
        animate={count >= 100 ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center"
      >
        <div className="font-mono text-5xl font-bold text-foreground tracking-wider mb-8">
          {String(Math.floor(count)).padStart(2, "0")}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-4xl font-grotesk font-bold text-foreground"
        >
          Y.A
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
