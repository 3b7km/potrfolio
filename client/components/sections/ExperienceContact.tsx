import { motion } from "framer-motion";
import Canvas3D from "../3d/Canvas3D";
import ParticleField from "../3d/ParticleField";
import { Mail, Phone, Linkedin } from "lucide-react";

const experiences = [
  {
    period: "07/2025 – 09/2025",
    title: "IoT Application Developer Intern",
    company: "Spime Sense Labs",
    description:
      "Implemented real-time IoT systems, developed device monitoring applications, utilized MQTT protocols, and conducted microcontroller testing.",
  },
  {
    period: "08/2025 – 09/2025",
    title: "Enterprise Solutions Intern",
    company: "Orange Egypt",
    description:
      "Utilized Oracle E-Business Suite and executed SQL queries to generate sales reports and manage database operations.",
  },
];

interface ExperienceItemProps {
  item: (typeof experiences)[0];
  index: number;
}

function ExperienceItem({ item, index }: ExperienceItemProps) {
  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative pl-8 pb-12 border-l border-divider last:pb-0"
    >
      {/* Timeline dot */}
      <div className="absolute left-[-6px] top-0 w-3 h-3 bg-foreground rounded-full"></div>

      <p className="text-xs text-muted uppercase tracking-wider font-grotesk mb-2">{item.period}</p>
      <h4 className="text-lg md:text-xl font-grotesk font-bold mb-1">{item.title}</h4>
      <p className="text-sm text-muted mb-3">{item.company}</p>
      <p className="text-sm text-foreground leading-relaxed">{item.description}</p>
    </motion.div>
  );
}

export default function ExperienceContact() {
  return (
    <>
      {/* Experience Section */}
      <section id="experience" className="relative w-full py-20 md:py-32 bg-background px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <h2 className="section-label mb-4">(05) EXPERIENCE</h2>
            <div className="divider"></div>
          </div>

          {/* Timeline */}
          <div className="max-w-2xl">
            {experiences.map((item, idx) => (
              <ExperienceItem key={idx} item={item} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative w-full min-h-screen bg-background px-4 md:px-8 flex flex-col items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 opacity-30 hidden md:block">
          <Canvas3D cameraPosition={[0, 0, 5]}>
            <ParticleField />
          </Canvas3D>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-12">
          {/* Header */}
          <div className="mb-8">
            <h2 className="section-label mb-4">(06) CONTACT</h2>
            <div className="divider mb-12"></div>
          </div>

          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-grotesk font-bold leading-tight"
          >
            Let's build
            <br />
            something real.
          </motion.h2>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <a
              href="mailto:youssefabdelhakam99@gmail.com"
              className="cursor-hover px-8 py-4 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300 font-grotesk flex items-center gap-2"
            >
              <Mail size={18} />
              Email Me →
            </a>
            <a
              href="tel:+201023329072"
              className="cursor-hover px-8 py-4 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300 font-grotesk flex items-center gap-2"
            >
              <Phone size={18} />
              +20 102 332 9072
            </a>
          </motion.div>

          {/* Social Link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <a
              href="https://linkedin.com/in/youssef-abdelhakam"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted cursor-hover hover:text-foreground transition-colors"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
