import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import Canvas3D from "../3d/Canvas3D";
import WireframeCube from "../3d/WireframeCube";

interface StatProps {
  number: number | string;
  label: string;
}

function Stat({ number, label }: StatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && typeof number === "number" && ref.current) {
      const target = { value: 0 };
      gsap.to(target, {
        value: number,
        duration: 2,
        ease: "power2.out",
        onUpdate: () => {
          const element = ref.current?.querySelector(".stat-number");
          if (element) {
            element.textContent = Math.floor(target.value).toString();
          }
        },
      });
    }
  }, [isInView, number]);

  return (
    <div ref={ref} className="text-center">
      <div className="stat-number text-3xl md:text-5xl font-grotesk font-bold">{number}</div>
      <p className="text-xs text-muted mt-2 uppercase tracking-wider">{label}</p>
    </div>
  );
}

export default function About() {
  const textRef = useRef<HTMLDivElement>(null);


  return (
    <section id="about" className="relative w-full py-20 md:py-32 bg-background px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h2 className="section-label mb-4">(03) ABOUT</h2>
          <div className="divider"></div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left: 3D Cube */}
          <div className="h-64 md:h-96 hidden md:block">
            <Canvas3D cameraPosition={[0, 0, 3]}>
              <WireframeCube />
            </Canvas3D>
          </div>

          {/* Right: Text & Stats */}
          <div className="space-y-8">
            {/* Age */}
            <div className="flex items-baseline gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-grotesk font-bold"
              >
                21
              </motion.div>
              <p className="text-muted text-sm uppercase tracking-wider">years old</p>
            </div>

            {/* Bio Text */}
            <motion.div
              ref={textRef}
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <p className="text-base md:text-lg leading-relaxed">
                {`I'm Youssef — a web developer and programmer based in Benha, Egypt. I build e-commerce stores, custom web applications, and digital products that actually work for real businesses. Currently studying Network & Cyber Security at ElSewedy University of Technology while taking on real client projects.`.split(" ").map((word, idx) => (
                  <span key={idx} className="word inline-block mr-1">
                    {word}
                  </span>
                ))}
              </p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-divider">
              <Stat number={3} label="Projects Launched" />
              <Stat number={2} label="Shopify Stores" />
              <Stat number={1} label="Custom Next.js Build" />
              <Stat number={2025} label="First client year" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
