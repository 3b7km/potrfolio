export default function Footer() {
  return (
    <footer className="relative w-full bg-background border-t border-divider">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-muted gap-4">
          <p className="font-syne font-semibold">Youssef Abdelhakam © {new Date().getFullYear()}</p>
          <div className="flex items-center gap-6">
            <a href="mailto:youssefabdelhakam99@gmail.com" className="hover:text-foreground transition-colors">Email</a>
            <a
              href="https://www.linkedin.com/in/youssef-abdelhakm-gamal-3b7km/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              LinkedIn ↗
            </a>
            <a href="tel:+2001023329072" className="hover:text-foreground transition-colors">Phone</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
