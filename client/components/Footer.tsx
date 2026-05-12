export default function Footer() {
  return (
    <footer className="relative w-full bg-background border-t border-divider">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-muted gap-4">
          <p className="font-syne font-semibold">
            Youssef Abdelhakam © {new Date().getFullYear()}
          </p>
          <div className="flex items-center gap-2 md:gap-6">
            <a
              href="mailto:youssefabdelhakam99@gmail.com"
              className="tap-target px-3 py-2 hover:text-foreground transition-colors rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/youssef-abdelhakm-gamal-3b7km/"
              target="_blank"
              rel="noopener noreferrer"
              className="tap-target px-3 py-2 hover:text-foreground transition-colors rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://wa.me/201023329072"
              target="_blank"
              rel="noopener noreferrer"
              className="tap-target px-3 py-2 hover:text-foreground transition-colors rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
