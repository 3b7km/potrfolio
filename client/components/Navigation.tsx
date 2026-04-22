import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function Navigation() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-[100] px-6 py-6 flex items-center justify-between mix-blend-difference text-white"
    >
      <Link to="/" className="font-syne font-bold text-xl tracking-tight">
        YA.
      </Link>

      <nav className="flex gap-2 md:gap-5 font-sans text-xs md:text-sm font-medium tracking-wide">
        <a href="/#about" className="tap-target px-2 md:px-3 py-2 hover:opacity-60 transition-opacity rounded-md">About</a>
        <Link to="/work" className="tap-target px-2 md:px-3 py-2 hover:opacity-60 transition-opacity rounded-md">Work</Link>
        <a href="/#experience" className="tap-target px-2 md:px-3 py-2 hover:opacity-60 transition-opacity rounded-md">Experience</a>
        <a href="/#testimonials" className="tap-target px-2 md:px-3 py-2 hover:opacity-60 transition-opacity rounded-md">Testimonials</a>
        <a href="/#contact" className="tap-target px-2 md:px-3 py-2 hover:opacity-60 transition-opacity rounded-md">Contact</a>
      </nav>

      {/* Theme toggle indicator circle mockup */}
      <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center cursor-pointer hover:border-white transition-colors">
        <div className="w-2.5 h-2.5 rounded-full bg-white" />
      </div>
    </motion.header>
  );
}
