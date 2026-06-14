import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

export default function CaseStudies() {
  return (
    <section 
      id="case-studies"
      aria-label="In-depth case studies"
      className="relative w-full py-32 bg-transparent pointer-events-auto border-t border-border/10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={fadeIn}
          className="mb-20 flex flex-col gap-6"
        >
          <h2 className="text-fluid-section font-syne font-bold uppercase tracking-tighter">
            Case
            <br />
            <span className="text-muted">Studies</span>
          </h2>
          <p className="text-sm font-sans text-muted max-w-md leading-relaxed">
            A deeper dive into the technical challenges, architectural decisions, and performance engineering that separate standard builds from premium experiences.
          </p>
        </motion.div>

        <div className="flex flex-col gap-32">
          {/* Case Study 1: Dethar */}
          <motion.article 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-10%" }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
          >
            {/* Text Content */}
            <div className="order-2 lg:order-1 lg:col-span-6 flex flex-col gap-6">
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-bold uppercase tracking-wider w-fit border border-accent/20">
                Performance Engineering & Localization
              </motion.div>
              
              <motion.h3 variants={fadeIn} className="text-4xl lg:text-5xl font-syne font-bold uppercase leading-tight tracking-tight text-foreground">
                Dethar
              </motion.h3>
              
              <motion.p variants={fadeIn} className="text-lg font-sans text-white/80 leading-relaxed font-medium">
                Boosting performance by 30% and localizing for a global Islamic market.
              </motion.p>
              
              <motion.div variants={fadeIn} className="space-y-4 mt-4">
                <h4 className="text-sm font-bold uppercase tracking-widest text-muted">The Challenge</h4>
                <p className="text-sm font-sans text-muted leading-relaxed">
                  Dethar, a premium Islamic products store, was struggling with a fragmented user experience. The site had inconsistent language (mixing Arabic and English), poor accessibility scores (73), and sluggish performance (60), which was hurting conversion rates and trust within its target demographic.
                </p>
              </motion.div>

              <motion.div variants={fadeIn} className="space-y-4 mt-2">
                <h4 className="text-sm font-bold uppercase tracking-widest text-muted">The Solution</h4>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-sm font-sans text-muted leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                    <span><strong>Deep Localization:</strong> Translated the entire UI, including complex elements like product descriptions, navigation menus, and action buttons, into standard Arabic to ensure a seamless experience for the core audience.</span>
                  </li>
                  <li className="flex gap-3 text-sm font-sans text-muted leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                    <span><strong>Performance Overhaul:</strong> Implemented aggressive image optimization (WebP), streamlined Liquid code, and optimized JavaScript/CSS delivery to reduce load times.</span>
                  </li>
                  <li className="flex gap-3 text-sm font-sans text-muted leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                    <span><strong>Accessibility First:</strong> Audited the site for WCAG compliance, adding descriptive Alt text to all imagery and improving mobile touch targets.</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div variants={fadeIn} className="mt-6 p-6 border border-white/10 rounded-xl bg-white/[0.02]">
                <h4 className="text-sm font-bold uppercase tracking-widest text-white/90 mb-4">The Results (Data-Driven)</h4>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase text-muted tracking-wider">Metric</span>
                    <span className="text-xs font-bold text-white/50">Before</span>
                    <span className="text-xs font-bold text-white mt-1">After</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase text-muted tracking-wider">Perf.</span>
                    <span className="text-xs font-bold text-red-400">60</span>
                    <span className="text-xs font-bold text-green-400 mt-1">78+ <span className="text-[10px] ml-1">(+30%)</span></span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase text-muted tracking-wider">A11y</span>
                    <span className="text-xs font-bold text-yellow-400">73</span>
                    <span className="text-xs font-bold text-green-400 mt-1">96 <span className="text-[10px] ml-1">(+31%)</span></span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase text-muted tracking-wider">SEO</span>
                    <span className="text-xs font-bold text-yellow-400">77</span>
                    <span className="text-xs font-bold text-green-400 mt-1">92 <span className="text-[10px] ml-1">(+19%)</span></span>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeIn} className="mt-2 p-4 bg-accent/5 rounded border border-accent/20">
                <h4 className="text-xs font-bold uppercase tracking-widest text-accent mb-2">Key Learning</h4>
                <p className="text-sm font-sans text-muted leading-relaxed italic">
                  "Learned how to balance high-res visual storytelling with aggressive performance targets in the Shopify ecosystem."
                </p>
              </motion.div>
            </div>

            {/* Visuals */}
            <motion.div variants={fadeIn} className="order-1 lg:order-2 lg:col-span-6 relative w-full h-full min-h-[400px] flex items-center justify-center">
              <div className="relative w-full max-w-sm aspect-[9/16] mx-auto">
                <img 
                  src="/photos/dethar-1.webp" 
                  alt="Dethar Mobile Before" 
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl border border-white/10 shadow-2xl z-10 translate-x-[-20%] translate-y-[-10%] scale-90 opacity-60"
                />
                <img 
                  src="/photos/dethar-2.webp" 
                  alt="Dethar Mobile After" 
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.5)] z-20"
                />
                <div className="absolute -bottom-6 -right-6 bg-background border border-white/10 p-4 rounded-xl shadow-xl z-30">
                  <div className="text-xs font-bold uppercase tracking-wider text-muted mb-1">Impact</div>
                  <div className="text-2xl font-syne font-bold text-accent">+30% Speed</div>
                </div>
              </div>
            </motion.div>
          </motion.article>

          <hr className="border-t border-border/5" />

          {/* Case Study 2: Floof */}
          <motion.article 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-10%" }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
          >
            {/* Visuals (Left) */}
            <motion.div variants={fadeIn} className="lg:col-span-6 w-full flex flex-col gap-6">
              {/* Branding Board (CSS Based) */}
              <div className="p-8 border border-white/10 rounded-2xl bg-white/[0.02] flex flex-col gap-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#f8f5f2] rounded-full blur-[100px] opacity-10 mix-blend-screen pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#e8e0d5] rounded-full blur-[100px] opacity-10 mix-blend-screen pointer-events-none"></div>
                
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-muted mb-4">Brand Identity: Floof</h4>
                  <div className="text-5xl font-serif tracking-tight text-[#f8f5f2] lowercase italic">floof.</div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-muted mb-4">Color Palette</h4>
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="w-12 h-12 rounded-full bg-[#f8f5f2] shadow-inner border border-white/10"></div>
                      <span className="text-[10px] text-muted font-mono uppercase">Cloud</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="w-12 h-12 rounded-full bg-[#e8e0d5] shadow-inner border border-white/10"></div>
                      <span className="text-[10px] text-muted font-mono uppercase">Oat</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="w-12 h-12 rounded-full bg-[#2c2c2c] shadow-inner border border-white/10"></div>
                      <span className="text-[10px] text-muted font-mono uppercase">Charcoal</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-muted mb-4">Typography</h4>
                  <div className="flex flex-col gap-2">
                    <div className="text-2xl font-serif text-[#f8f5f2]">Playfair Display</div>
                    <div className="text-sm font-sans text-muted">Inter (Sans-Serif)</div>
                  </div>
                </div>
              </div>

              {/* Website Screenshot */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-xl group">
                <img 
                  src="/photos/floof-1.webp" 
                  alt="Floof Website UI" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>

            {/* Text Content (Right) */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-bold uppercase tracking-wider w-fit border border-accent/20">
                Full-Brand Identity & Custom E-commerce
              </motion.div>
              
              <motion.h3 variants={fadeIn} className="text-4xl lg:text-5xl font-syne font-bold uppercase leading-tight tracking-tight text-foreground">
                Floof
              </motion.h3>
              
              <motion.p variants={fadeIn} className="text-lg font-sans text-white/80 leading-relaxed font-medium">
                Designing the soul and the store of a premium body pillow brand.
              </motion.p>
              
              <motion.div variants={fadeIn} className="space-y-4 mt-4">
                <h4 className="text-sm font-bold uppercase tracking-widest text-muted">The Challenge</h4>
                <p className="text-sm font-sans text-muted leading-relaxed">
                  Floof was a new concept in the premium bedding space that needed a complete identity from scratch. The goal was to convey "ultimate comfort" through every touchpoint—from the logo to the final checkout screen.
                </p>
              </motion.div>

              <motion.div variants={fadeIn} className="space-y-4 mt-2">
                <h4 className="text-sm font-bold uppercase tracking-widest text-muted">The Solution</h4>
                <p className="text-sm font-sans text-white/80 mb-4 font-medium italic">
                  I acted as both the Brand Designer and the Lead Developer:
                </p>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-sm font-sans text-muted leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                    <span><strong>Visual Identity:</strong> Created the logo and a "soft-aesthetic" color palette designed to evoke feelings of relaxation and high-quality rest.</span>
                  </li>
                  <li className="flex gap-3 text-sm font-sans text-muted leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                    <span><strong>Custom Architecture:</strong> Instead of using a bloated off-the-shelf Shopify theme, I engineered a custom, lightweight theme from scratch using Liquid and JavaScript.</span>
                  </li>
                  <li className="flex gap-3 text-sm font-sans text-muted leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                    <span><strong>UX Design:</strong> Focused on a "minimal-friction" shopping experience, ensuring that high-resolution product imagery loaded instantly without sacrificing speed.</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div variants={fadeIn} className="mt-6 p-6 border border-white/10 rounded-xl bg-white/[0.02]">
                <h4 className="text-sm font-bold uppercase tracking-widest text-white/90 mb-4">Key Deliverables</h4>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                    <span className="text-sm font-sans text-white/80"><strong>Brand Guidelines:</strong> Logo design, typography selection, and color palette.</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                    <span className="text-sm font-sans text-white/80"><strong>Custom Shopify Theme:</strong> Built entirely from scratch for maximum performance.</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                    <span className="text-sm font-sans text-white/80"><strong>Conversion Optimization:</strong> A mobile-first design prioritizing easy navigation.</span>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeIn} className="mt-2 p-4 bg-accent/5 rounded border border-accent/20">
                <h4 className="text-xs font-bold uppercase tracking-widest text-accent mb-2">Key Learning</h4>
                <p className="text-sm font-sans text-muted leading-relaxed italic">
                  "Mastered the intersection of brand identity and technical architecture, proving that a strong emotional connection doesn't have to come at the cost of load times."
                </p>
              </motion.div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
