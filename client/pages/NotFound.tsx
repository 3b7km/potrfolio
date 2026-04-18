import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.warn(
        `404 Error: User attempted to access non-existent route: ${location.pathname}`
      );
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground overflow-hidden">
      <div className="relative w-full max-w-2xl px-4 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-accent/5 rounded-full blur-3xl -z-10"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <motion.h1
            className="text-7xl md:text-9xl font-syne font-bold bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            404
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-2"
          >
            <p className="text-2xl md:text-4xl font-syne font-bold">Page Not Found</p>
            <p className="text-muted text-base md:text-lg">
              The page you are looking for doesn't exist or has been moved.
            </p>
            <p className="text-xs text-muted/60 font-mono">
              Attempted route: <span className="text-accent">{location.pathname}</span>
            </p>
          </motion.div>

          <motion.button
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="cursor-hover inline-flex items-center gap-2 px-8 py-4 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300 font-syne mt-4"
          >
            <Home size={18} />
            Return Home
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
