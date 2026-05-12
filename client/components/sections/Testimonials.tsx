import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "Youssef completely reimagined our digital presence. His ability to blend high-end aesthetics with rock-solid, secure performance is rare. Our conversion rate almost doubled within a month.",
    name: "Ahmed Hassan",
    title: "Founder, Helwa Fashion",
  },
  {
    quote:
      "The attention to detail and technical problem-solving was outstanding. He didn't just build a Shopify store; he built an engine for growth with zero downtime. Highly recommended for complex e-commerce needs.",
    name: "Sara Mahmoud",
    title: "Marketing Director, Djabi",
  },
  {
    quote:
      "Working with Youssef was a game changer for us. He delivered a Next.js application that loaded blisteringly fast, perfectly tailored to our brand, and securely integrated with all our target platforms.",
    name: "Omar Tarek",
    title: "Operations Manager, Sneakrz King",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative w-full py-32 bg-transparent pointer-events-auto border-b border-border/10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16 md:mb-24 flex flex-col items-center text-center gap-4">
          <h2 className="text-sm font-sans tracking-widest text-muted uppercase">
            Client Words
          </h2>
          <h3 className="text-3xl md:text-5xl font-syne font-bold uppercase tracking-tighter">
            Don't Just Take <span className="text-muted">My Word For It</span>
          </h3>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="p-8 border border-white/10 rounded bg-white/[0.01] hover:bg-white/[0.03] transition-colors relative flex flex-col justify-between"
            >
              <div className="mb-8">
                <svg
                  className="w-8 h-8 text-white/20 mb-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-base font-sans text-white/90 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
              </div>

              <div>
                <p className="font-syne font-bold text-foreground">
                  {testimonial.name}
                </p>
                <p className="text-xs font-sans text-muted uppercase tracking-wider mt-1">
                  {testimonial.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
