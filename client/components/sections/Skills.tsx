import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useInView } from "framer-motion";

const skillCategories = [
  {
    title: "PROGRAMMING",
    skills: ["Java", "Python", "SQL", "Object-Oriented Programming (OOP)", "Database Management", "Oracle E-Business Suite"],
  },
  {
    title: "WEB & E-COMMERCE",
    skills: [
      "Next.js",
      "React",
      "Shopify Development",
      "Shopify Theme Customization",
      "E-commerce Architecture",
      "Performance Optimization",
      "SEO Fundamentals",
    ],
  },
  {
    title: "SYSTEMS & OTHER",
    skills: [
      "IoT Application Development",
      "MQTT Protocols",
      "Arduino / ESP32",
      "Network Fundamentals (CCNA)",
      "Oracle E-Business Suite",
      "SQL Query Management",
    ],
  },
];

interface SkillItemProps {
  skill: string;
  index: number;
}

function SkillItem({ skill, index }: SkillItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && ref.current) {
      const underline = ref.current.querySelector(".skill-underline") as HTMLElement;
      if (underline) {
        gsap.fromTo(
          underline,
          { scaleX: 0, transformOrigin: "left" },
          {
            scaleX: 1,
            duration: 0.8,
            delay: index * 0.05,
            ease: "power2.out",
          }
        );
      }
    }
  }, [isInView, index]);

  return (
    <div ref={ref} className="relative pb-3 mb-4">
      <p className="text-sm md:text-base">{skill}</p>
      <div className="skill-underline absolute bottom-0 left-0 h-px bg-foreground origin-left"></div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative w-full py-20 md:py-32 bg-background px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h2 className="section-label mb-4">(04) SKILLS</h2>
          <div className="divider"></div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {skillCategories.map((category) => (
            <div key={category.title} className="space-y-6">
              <h3 className="text-xs font-grotesk font-bold uppercase tracking-widest">{category.title}</h3>
              <div className="space-y-2">
                {category.skills.map((skill, idx) => (
                  <SkillItem key={skill} skill={skill} index={idx} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
