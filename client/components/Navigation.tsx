import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function Navigation() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-[100] px-6 py-6 flex items-center justify-between"
      role="banner"
    >
      <Link
        to="/"
        className="font-syne font-bold text-xl tracking-tight text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white rounded"
        aria-label="Youssef Abdelhakam — Home"
      >
        YA.
      </Link>

      <nav
        aria-label="Main navigation"
        className="flex gap-2 md:gap-5 font-sans text-xs md:text-sm font-medium tracking-wide text-white/90"
      >
        <a
          href="/#about"
          className="tap-target px-2 md:px-3 py-2 hover:opacity-60 transition-opacity rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          About
        </a>
        <a
          href="/#work"
          className="tap-target px-2 md:px-3 py-2 hover:opacity-60 transition-opacity rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Work
        </a>
        <a
          href="/#experience"
          className="tap-target px-2 md:px-3 py-2 hover:opacity-60 transition-opacity rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Experience
        </a>
        <a
          href="/#contact"
          className="tap-target px-2 md:px-3 py-2 hover:opacity-60 transition-opacity rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Contact
        </a>
      </nav>

      {/* Theme toggle indicator circle mockup */}
      <button
        type="button"
        aria-label="Toggle theme (not yet active)"
        className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center cursor-pointer hover:border-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-white" aria-hidden="true" />
      </button>
    </motion.header>
  );
}
