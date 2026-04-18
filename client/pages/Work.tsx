import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";

export default function Work() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-8 left-8 right-8 z-20 flex items-center justify-between">
        <button onClick={() => navigate("/")} className="text-sm font-grotesk font-bold cursor-hover hover:text-accent">
          Y.A©
        </button>
        <button onClick={() => navigate("/")} className="text-sm cursor-hover hover:text-accent">
          Back
        </button>
      </nav>

      {/* Placeholder Content */}
      <div className="h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-5xl md:text-7xl font-grotesk font-bold mb-8 text-center">Work</h1>
        <p className="text-lg text-muted max-w-2xl text-center mb-8">
          This page is coming soon. For now, check out the projects section on the homepage.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-8 py-4 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300 font-grotesk cursor-hover"
        >
          Back to Home
        </button>
      </div>

      <Footer />
    </div>
  );
}
