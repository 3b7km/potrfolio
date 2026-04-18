import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    id: "a",
    name: "Helwa Fashion",
    platform: "Shopify",
    tags: ["Shopify Development", "Luxury Positioning", "Brand Direction", "UX/UI"],
    year: "2025©",
    description:
      "Premium women's fashion Shopify store with dark luxury theme. Built 4 distinct collections — fur jackets, check sets, dresses, and Ramadan kaftans.",
    url: "https://helwafashion.com",
    image:
      "https://helwafashion.com/cdn/shop/files/WhatsAppImage2026-04-04at10.44.20PM_5.jpg?v=1775348224&width=1200",
  },
  {
    id: "b",
    name: "Djabi",
    platform: "Shopify",
    tags: ["Shopify Development", "Brand Identity", "Collections Architecture", "SEO Optimization"],
    year: "2025©",
    description:
      "Full Shopify store for a modest fashion brand — prayer abayas, kaftans, and abayas. Designed and developed the SUJOOD Ramadan 2026 collection.",
    url: "https://djabi-eg.com",
    image:
      "https://djabi-eg.com/cdn/shop/files/IMG_0953.jpg?v=1770860845&width=1200",
  },
  {
    id: "c",
    name: "Sneakrz King",
    platform: "Next.js",
    tags: ["E-commerce Development", "Custom Frontend", "Performance Optimization", "UX/UI"],
    year: "2025©",
    description:
      "Custom-built sneaker e-commerce store for the Egyptian market. Features 3D animated hero logo, brand filtering, size selection, dual CTA system, and full mobile optimization.",
    url: "https://sneakrz-king.vercel.app",
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=600&fit=crop",
  },
];

interface ProjectRowProps {
  project: (typeof projects)[0];
}

function ProjectRow({ project }: ProjectRowProps) {
  const [isHovered, setIsHovered] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isHovered && imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [isHovered]);

  return (
    <motion.div
      ref={rowRef}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group border-b border-divider py-8 cursor-hover hover:bg-opacity-5 transition-colors"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        {/* Index & Name */}
        <div className="col-span-1 md:col-span-2">
          <div className="text-sm text-muted font-grotesk mb-2">({project.id})</div>
          <h3 className="text-2xl md:text-4xl font-grotesk font-bold">{project.name}</h3>
          <p className="text-xs text-muted mt-2">{project.platform}</p>
        </div>

        {/* Tags */}
        <div className="hidden md:flex flex-col gap-1">
          {project.tags.slice(0, 2).map((tag, idx) => (
            <span key={idx} className="text-xs text-muted">
              {tag}
            </span>
          ))}
        </div>

        {/* Year & Link */}
        <div className="flex items-center justify-between md:justify-end gap-4">
          <span className="text-xs text-muted font-grotesk">{project.year}</span>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-accent explore-hover opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2"
          >
            Explore <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Project Thumbnail Preview */}
      {isHovered && (
        <motion.div
          ref={imageRef}
          className="absolute right-0 top-0 h-full w-64 md:w-96 rounded-lg overflow-hidden pointer-events-none"
        >
          <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative w-full py-20 md:py-32 bg-background px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h2 className="section-label mb-4">(02) WORK</h2>
          <p className="text-lg md:text-2xl font-grotesk max-w-2xl">Selected projects. Built with precision.</p>
          <div className="divider mt-8"></div>
        </div>

        {/* Projects List */}
        <div className="space-y-0">
          {projects.map((project) => (
            <ProjectRow key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
