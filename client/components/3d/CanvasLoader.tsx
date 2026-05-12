import { useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";

export default function CanvasLoader() {
  const { progress, active } = useProgress();

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] bg-[#050505] flex flex-col items-center justify-center gap-8"
        >
          {/* Brand Mark */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-syne text-3xl font-bold tracking-tight text-foreground"
          >
            YA.
          </motion.div>

          {/* Progress Bar */}
          <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-foreground"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "linear" }}
            />
          </div>

          {/* Percentage */}
          <div className="font-sans text-xs tracking-[0.3em] text-muted uppercase">
            {Math.round(progress)}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
