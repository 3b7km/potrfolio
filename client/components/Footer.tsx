export default function Footer() {
  return (
    <footer className="relative w-full bg-background border-t border-divider py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between text-xs md:text-sm text-muted gap-8 md:gap-4">
          <p className="font-syne font-semibold order-2 md:order-1 opacity-60 hover:opacity-100 transition-opacity">
            Youssef Abdelhakam © {new Date().getFullYear()}
          </p>
          <div className="flex items-center flex-wrap justify-center gap-4 md:gap-8 order-1 md:order-2">
            <a
              href="mailto:youssefabdelhakam99@gmail.com"
              className="tap-target px-3 py-2 hover:text-foreground hover:-translate-y-0.5 transition-all rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/youssef-abdelhakm-gamal-3b7km/"
              target="_blank"
              rel="noopener noreferrer"
              className="tap-target px-3 py-2 hover:text-foreground hover:-translate-y-0.5 transition-all rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://wa.me/201023329072"
              target="_blank"
              rel="noopener noreferrer"
              className="tap-target px-3 py-2 hover:text-foreground hover:-translate-y-0.5 transition-all rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
