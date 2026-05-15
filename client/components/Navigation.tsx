import { Link } from "react-router-dom";

export function Navigation() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(element, { offset: -80 });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[100] px-4 md:px-12 py-6 flex items-center justify-between animate-[slideDown_0.8s_cubic-bezier(0.16,1,0.3,1)_both]"
      role="banner"
    >
      <Link
        to="/"
        className="font-syne font-bold text-xl tracking-tight text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white rounded shrink-0"
        aria-label="Youssef Abdelhakam — Home"
      >
        YA.
      </Link>

      <nav
        aria-label="Main navigation"
        className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 sm:gap-2 md:gap-5 font-sans text-[10px] sm:text-xs md:text-sm font-medium tracking-wide text-white/90"
      >
        <a
          href="#about"
          onClick={(e) => scrollToSection(e, "about")}
          className="tap-target px-2 sm:px-3 py-2 whitespace-nowrap hover:opacity-60 hover:-translate-y-0.5 transition-all rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          About
        </a>
        <a
          href="#work"
          onClick={(e) => scrollToSection(e, "work")}
          className="tap-target px-2 sm:px-3 py-2 whitespace-nowrap hover:opacity-60 hover:-translate-y-0.5 transition-all rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Selected Work
        </a>
        <a
          href="#experience"
          onClick={(e) => scrollToSection(e, "experience")}
          className="tap-target px-2 sm:px-3 py-2 whitespace-nowrap hover:opacity-60 hover:-translate-y-0.5 transition-all rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Experience
        </a>
        <a
          href="#contact"
          onClick={(e) => scrollToSection(e, "contact")}
          className="tap-target px-2 sm:px-3 py-2 whitespace-nowrap hover:opacity-60 hover:-translate-y-0.5 transition-all rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Contact
        </a>
      </nav>


    </header>
  );
}
