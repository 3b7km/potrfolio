import { Link } from "react-router-dom";

export function Navigation() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-[100] px-6 py-6 flex items-center justify-between animate-[slideDown_0.8s_cubic-bezier(0.16,1,0.3,1)_both]"
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
        className="absolute left-1/2 -translate-x-1/2 flex gap-2 md:gap-5 font-sans text-xs md:text-sm font-medium tracking-wide text-white/90"
      >
        <a
          href="/#about"
          className="tap-target px-2 md:px-3 py-2 hover:opacity-60 hover:-translate-y-0.5 transition-all rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          About
        </a>
        <a
          href="/#work"
          className="tap-target px-2 md:px-3 py-2 hover:opacity-60 hover:-translate-y-0.5 transition-all rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Work
        </a>
        <a
          href="/#experience"
          className="tap-target px-2 md:px-3 py-2 hover:opacity-60 hover:-translate-y-0.5 transition-all rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Experience
        </a>
        <a
          href="/#contact"
          className="tap-target px-2 md:px-3 py-2 hover:opacity-60 hover:-translate-y-0.5 transition-all rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Contact
        </a>
      </nav>


    </header>
  );
}
